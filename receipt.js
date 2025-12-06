// Generate a unique invoice number
function generateInvoiceNumber() {
    return 'INV-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

// Generate a last used TRN for the current customer
function generateTRN() {
    const lastTrn = JSON.parse(localStorage.getItem('RegistrationData')) || [];
    
    if (lastTrn.length > 0) {
        
        return lastTrn[lastTrn.length - 1].trn;
        
    }
        
}

// Save invoice to localStorage
function saveInvoiceToStorage(invoice) {
    // Get existing invoices or create empty array
    let allInvoices = JSON.parse(localStorage.getItem('AllInvoices')) || [];
    
    // Add new invoice
    allInvoices.push(invoice);
    
    // Save back to localStorage
    localStorage.setItem('AllInvoices', JSON.stringify(allInvoices));
    
    // Also save to user's personal invoice array if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        currentUser.invoices = currentUser.invoices || [];
        currentUser.invoices.push(invoice);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

// Load and display receipt/invoice
function loadReceipt() {
    let order = JSON.parse(localStorage.getItem("Invoice"));
    
    if (!order) {
        document.body.innerHTML = "<h2>No receipt available.</h2>";
        return;
    }

    // Get cart and checkout data
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutData = JSON.parse(localStorage.getItem('checkoutData')) || {};

    // Populate invoice details
    document.getElementById('invoiceDate').textContent = new Date().toLocaleDateString();
    document.getElementById('invoiceNumber').textContent = generateInvoiceNumber();
    document.getElementById('trn').textContent = generateTRN();
    
    // Customer info
    document.getElementById('custName').textContent = checkoutData.name || order.name || 'N/A';
    document.getElementById('custAddress').textContent = checkoutData.address || order.address || 'N/A';
    document.getElementById('custEmail').textContent = checkoutData.email || 'N/A';
    
    // Payment info
    document.getElementById('cardName').textContent = checkoutData.cardName || order.cardName || 'N/A';
    const cardNum = checkoutData.cardNumber || order.cardNumber || '';
    document.getElementById('cardLast4').textContent = cardNum.slice(-4);

    // Calculate totals
    let subtotal = 0;
    let discountTotal = 0;
    let itemsHtml = '';
    
    // Use cart items if available, otherwise use order items
    const itemsToDisplay = cart.length > 0 ? cart : order.items;
    
    itemsToDisplay.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const discount = item.discount || 0;
        const discountAmount = (itemTotal * discount) / 100;
        const finalPrice = itemTotal - discountAmount;
        
        subtotal += finalPrice;
        discountTotal += discountAmount;

        itemsHtml += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${discount}%</td>
                <td>$${finalPrice.toFixed(2)}</td>
            </tr>
        `;
    });

    document.getElementById('receiptItems').innerHTML = itemsHtml;
    
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('discountTotal').textContent = discountTotal.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);

    // Create invoice object
    const invoice = {
        invoiceNumber: document.getElementById('invoiceNumber').textContent,
        date: document.getElementById('invoiceDate').textContent,
        trn: document.getElementById('trn').textContent,
        customer: {
            name: checkoutData.name || order.name,
            address: checkoutData.address || order.address,
            email: checkoutData.email || ''
        },
        items: itemsToDisplay.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount || 0
        })),
        subtotal: subtotal,
        discountTotal: discountTotal,
        tax: tax,
        total: total
    };

    // Save the invoice
    saveInvoiceToStorage(invoice);

    // Show email notification
    document.getElementById('emailAlert').style.display = 'block';
    
    // Clear cart and checkout data after processing
    localStorage.removeItem('cart');
    localStorage.removeItem('checkoutData');
}

// PDF download function
function downloadPDF() {
    const element = document.getElementById('receiptBox');
    html2pdf()
        .from(element)
        .save('SnackVerse-Invoice-' + document.getElementById('invoiceNumber').textContent + '.pdf');
}

// Initialize when page loads
window.onload = function() {
    loadReceipt();
};

