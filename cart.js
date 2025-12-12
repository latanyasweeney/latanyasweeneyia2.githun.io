/*================================== 
    Q3 Cart Page JavaScript
    This script manages:
    - Loading the cart from localStorage
    - Displaying cart items
    - Updating quantity
    - Removing items
    - Calculating totals (discount, tax, grand total)
===================================*/

// Load cart data from localStorage OR an empty array if nothing is saved
let cart = JSON.parse(localStorage.getItem("AllProducts")) || [];

/*==============================
    Load and Display Cart Items
==============================*/
function loadCart()
{
    let box = document.getElementById("summaryBox");

    // If cart is empty, show message and stop function
    if (cart.length === 0)
    {
        box.innerHTML = "<p>Your cart is empty. <a href='Products.html'>Go shopping!</a></p>";
        return;
    }

    // Start building the cart display HTML
    let html = `<h3>Your Cart Items</h3><div class="summary-list">`;
    let subtotal = 0;

    // Loop through all items in the cart
    cart.forEach((item, index) =>
    {
        // Calculate line total for each item
        let lineTotal = item.price * item.quantity;
        subtotal += lineTotal;

        // Add each item to the HTML block
        html +=
        `
            <div class="summary-item">
                <img src="Assets/${convertImageName(item.name)}" alt="${item.name}">

                <div class="item-details">
                    <p><strong>${item.name}</strong></p>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    
                    <!-- Quantity control buttons -->
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity(${index})">-</button>
                        <span>Qty: ${item.quantity}</span>
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>
                    
                    <p><strong>Subtotal: $${lineTotal.toFixed(2)}</strong></p>
                </div>

                <!-- Remove item button -->
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    html += `</div>`;
    box.innerHTML = html;

    /*==========================================
        Calculate Discount, Tax, and Grand Total
    ============================================*/

    // Default discount = 0%
    let discount = subtotal * 0.00;

    // Apply 10% discount if subtotal is above $20
    if(subtotal > 20)
    {
        discount = subtotal * 0.10;
    }

    // Tax = 15% of (subtotal - discount)
    let taxed = (subtotal - discount) * 0.15;

    // Final amount the user pays
    let total = subtotal - discount + taxed;

    // Update total fields on the page
    document.getElementById("discount").textContent = discount.toFixed(2);
    document.getElementById("tax").textContent = taxed.toFixed(2);
    document.getElementById("grandTotal").textContent = total.toFixed(2);
}

/*==========================================
    Convert Product Name to Correct Image File
===========================================*/
function convertImageName(name)
{
    name = name.toLowerCase();

    if (name.includes("kitkat")) return "KitKat.png";
    if (name.includes("chips")) return "Mexican-Chips.png";
    if (name.includes("korean")) return "Korean-cookies.png";
    if (name.includes("american")) return "usa-cookies.png";

    // Default fallback image
    return "snacks.jpg";
}

/*==============================
    Increase Item Quantity
==============================*/
function increaseQuantity(index)
{
    cart[index].quantity++; // Add 1
    localStorage.setItem("AllProducts", JSON.stringify(cart)); // Save updates
    loadCart(); // Refresh display
}

/*==============================
    Decrease Item Quantity
==============================*/
function decreaseQuantity(index)
{
    // Only decrease if quantity is above 1
    if (cart[index].quantity > 1)
    {
        cart[index].quantity--;
        localStorage.setItem("AllProducts", JSON.stringify(cart));
        loadCart();
    }
    else
    {
        // If quantity hits 0, treat it as remove item
        removeItem(index);
    }
}

/*==============================
    Remove Item Completely
==============================*/
function removeItem(index)
{
    // Ask for confirmation before deleting
    if (confirm(`Remove ${cart[index].name} from cart?`))
    {
        cart.splice(index, 1); // Remove item from array
        localStorage.setItem("AllProducts", JSON.stringify(cart)); // Save update
        loadCart(); // Reload cart
    }
}

/*==============================
    Clear Entire Cart
==============================*/
function clearCart()
{
    if (confirm("Are you sure you want to clear all items from your cart?"))
    {
        localStorage.removeItem("AllProducts"); // Delete cart from storage
        cart = []; // Reset cart array
        loadCart(); // Refresh page
    }
}

/*==============================
    Load Cart Once Page Opens
==============================*/
window.onload = loadCart;
