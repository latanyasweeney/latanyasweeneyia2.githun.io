/*==================================
  Cart's Checkout Functionality Handling JavaScript
  ==================================*/
  
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadSummary()
{
    let box = document.getElementById("summaryBox");

    if (cart.length === 0)
    {
        box.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let html = `<h3>Order Summary</h3><div class="summary-list">`;
    let total = 0;

    cart.forEach(item =>
    {
        let lineTotal = item.price * item.quantity;
        total += lineTotal;

        html +=
        `
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

    html += `</div><h3>Total: $${total.toFixed(2)}</h3>`;
    box.innerHTML = html;
}

function convertImageName(name)
{
    name = name.toLowerCase();
    if (name.includes("kitkat")) return "KitKat.png";
    if (name.includes("chips")) return "Mexican-Chips.png";
    if (name.includes("honey")) return "Korean-cookies.png";
    if (name.includes("cookies")) return "usa-cookies.png";
    return "snacks.jpg";
}

function confirmOrder()
{
    let order =
    {
        orderID: "SV" + Math.floor(Math.random() * 90000 + 10000),
        name: document.getElementById("custName").value,
        address: document.getElementById("custAddress").value,
        cardName: document.getElementById("cardName").value,
        cardNumber: document.getElementById("cardNumber").value,
        items: cart
    };

    localStorage.setItem("Invoice", JSON.stringify(order));
    localStorage.removeItem("cart");

    window.location.href = "receipt.html";
}

function cancelOrder()
{
    alert("Order cancelled.");
    window.location.href = "Products.html";
}

function clearCart()
{
    localStorage.removeItem("cart");
    location.reload();
}

window.onload = loadSummary;
