let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Configuration of tax and discount rates
const TAX_RATE = 0.15; // 15% tax
const DISCOUNT_RATE = 0.00; // No discount

function loadSummary() {
    let box = document.getElementById("summaryBox");

    if (cart.length === 0) {
        box.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let html = `<h3>Order Summary</h3><div class="summary-list">`;
    let subtotal = 0;

    cart.forEach(item => {
        let lineTotal = item.price * item.quantity;
        subtotal += lineTotal;

        html += `
            <div class="summary-item">
                <img src="Assets/${convertImageName(item.name)}">
                <div>
                    <p><strong>${item.name}</strong></p>
                    <p>Qty: ${item.quantity}</p>
                    <p>Price: $${item.price}</p>
                    <p>Subtotal: $${lineTotal.toFixed(2)}</p>
                </div>
            </div>
        `;
    });

        // Calculate discount, tax, and final total
    let discountAmount = subtotal * DISCOUNT_RATE;
    let afterDiscount = subtotal - discountAmount;
    let taxAmount = afterDiscount * TAX_RATE;
    let finalTotal = afterDiscount + taxAmount;

    html += `</div>
        <div class="price-breakdown">
            <div class="breakdown-line">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>`;


    if (DISCOUNT_RATE > 0) {
        html += `
            <div class="breakdown-line discount">
                <span>Discount (${(DISCOUNT_RATE * 100).toFixed(0)}%):</span>
                <span>-$${discountAmount.toFixed(2)}</span>
            </div>`;
    }

    html += `
            <div class="breakdown-line">
                <span>Tax (${(TAX_RATE * 100).toFixed(2)}%):</span> 
                <span>$${taxAmount.toFixed(2)}</span>
            </div>
            <div class="breakdown-line total">
                <span><strong>Total:</strong></span>
                <span><strong>$${finalTotal.toFixed(2)}</strong></span>
            </div>
        </div>`;

        box.innerHTML = html;
        window.calculateTotal = finalTotal;
}

function convertImageName(name) {
    name = name.toLowerCase();
    if (name.includes("KitKat")) return "KitKat.png";
    if (name.includes("Chips")) return "Mexican-Chips.png";
    if (name.includes("cookies")) return "Korean-cookies.png";
    if (name.includes("cookies")) return "usa-cookies.png";
    return "snacks.jpg";
}

function confirmOrder() {
    // Validate form
    let name = document.getElementById("custName").value;
    let address = document.getElementById("custAddress").value;
    let cardName = document.getElementById("cardName").value;
    let cardNumber = document.getElementById("cardNumber").value;
    let cardExpiry = document.getElementById("cardExpiry").value;
    let cardCVV = document.getElementById("cardCVV").value;

    if (!name || !address || !cardName || !cardNumber || !cardExpiry || !cardCVV) {
        alert("Please fill in all fields.");
        return;
    }

    // Calculate order totals
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    let discountAmount = subtotal * DISCOUNT_RATE;
    let afterDiscount = subtotal - discountAmount;
    let taxAmount = afterDiscount * TAX_RATE;
    let finalTotal = afterDiscount + taxAmount;


    let order = {
        orderID: "SV" + Math.floor(Math.random() * 90000 + 10000),
        name: document.getElementById("custName").value,
        address: document.getElementById("custAddress").value,
        cardName: document.getElementById("cardName").value,
        cardNumber: document.getElementById("cardNumber").value,
        items: cart,
        subtotal: subtotal.toFixed(2),
        discount: discountAmount.toFixed(2),
        discountRate: (DISCOUNT_RATE * 100).toFixed(0),
        tax: taxAmount.toFixed(2),
        taxRate: (TAX_RATE * 100).toFixed(1),
        total: finalTotal.toFixed(2)
    };

    localStorage.setItem("Invoice", JSON.stringify(order));
    localStorage.removeItem("cart");

    window.location.href = "receipt.html";
}

function cancelOrder() {
    alert("Order cancelled.");
    window.location.href = "Products.html";
}

function clearCart() {
    localStorage.removeItem("cart");
    location.reload();
}

window.onload = loadSummary;
