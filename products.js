/*==================================
  Products Functionality Handling JavaScript
  ==================================*/

// Load existing cart or create a new one
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add items to cart
function addToCart(name, price)
{
    price = parseFloat(price);

    let item = cart.find(product => product.name === name);

    if (item)
        {
        item.quantity++;
    }
    else
    {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}

document.querySelectorAll(".add-cart").forEach(button =>
    {
    button.addEventListener("click", function ()
    {
        let name = this.getAttribute("data-name");
        let price = this.getAttribute("data-price");
        addToCart(name, price);
    });
});
