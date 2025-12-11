/*==================================
    Q3 Cart Page JavaScript
  ==================================*/
  
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadCart()
{
    let box = document.getElementById("summaryBox");

    if (cart.length === 0)
    {
        box.innerHTML = "<p>Your cart is empty. <a href='Products.html'>Go shopping!</a></p>";
        return;
    }

    let html = `<h3>Your Cart Items</h3><div class="summary-list">`;
    let subtotal = 0;

    cart.forEach((item, index) =>
    {
        let lineTotal = item.price * item.quantity;
        subtotal += lineTotal;

        html +=
        `
            <div class="summary-item">
                <img src="Assets/${convertImageName(item.name)}" alt="${item.name}">
                <div class="item-details">
                    <p><strong>${item.name}</strong></p>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity(${index})">−</button>
                        <span>Qty: ${item.quantity}</span>
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>
                    
                    <p><strong>Subtotal: $${lineTotal.toFixed(2)}</strong></p>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    html += `</div>`;
    box.innerHTML = html;

    // Calculate discount, tax, and grand total
    let discount = subtotal * 0.00;
    let taxed = (subtotal - discount) * 0.15;
    let total = subtotal - discount + taxed;

    // Update the totals in the HTML
    document.getElementById("discount").textContent = discount.toFixed(2);
    document.getElementById("tax").textContent = taxed.toFixed(2);
    document.getElementById("grandTotal").textContent = total.toFixed(2);
}
// Convert item name to image filename
function convertImageName(name)
{
    name = name.toLowerCase();
    if (name.includes("kitkat")) return "KitKat.png";
    if (name.includes("chips")) return "Mexican-Chips.png";
    if (name.includes("korean") && name.includes("cookies")) return "Korean-cookies.png";
    if (name.includes("usa") && name.includes("cookies")) return "usa-cookies.png";
    if (name.includes("cookies")) return "Korean-cookies.png";
    return "snacks.jpg";
}
// Increase item quantity
function increaseQuantity(index)
{
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}
// Decrease item quantity
function decreaseQuantity(index)
{
    if (cart[index].quantity > 1)
    {
        cart[index].quantity--;
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }
    else
    {
        // If quantity would go to 0, ask to remove item
        removeItem(index);
    }
}
// Remove item from cart
function removeItem(index)
{
    if (confirm(`Remove ${cart[index].name} from cart?`))
    {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }
}
// Clear entire cart
function clearCart()
{
    if (confirm("Are you sure you want to clear all items from your cart?"))
    {
        localStorage.removeItem("cart");
        cart = [];
        loadCart();
    }
}


window.onload = loadCart;
