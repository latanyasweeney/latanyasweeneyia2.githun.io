/*==================================
  Products Functionality Handling JavaScript
  ==================================*/

// Load existing cart from localStorage, or create an empty array.
let cart = JSON.parse(localStorage.getItem("AllProducts")) || [];

// Function to add items to the cart
function addToCart(name, price)
{
    // Ensures price is a floating-point number
    price = parseFloat(price);

    // Trying to find the product in the existing cart storage by name
    let item = cart.find(product => product.name === name);

    if (item)
    {
        // If the item already exists, increment the quantity by 1
        item.quantity++;
    }
    else
    {
        // If the item is not in the cart, a new cart object is created for it
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    // Save the updated cart back to localStorage so it persists across page reloads.
    // Stringify the array to store it as a JSON string.
    localStorage.setItem("AllProducts", JSON.stringify(cart));

    // Give the user immediate feedback that the item was added
    alert(name + " added to cart!");
}

// Attach click handlers to all "Add to Cart" buttons on the page
document.querySelectorAll(".add-cart").forEach(button =>
{
    button.addEventListener("click", function ()
    {
        // Read product metadata from the button that was clicked
        let name = this.getAttribute("data-name");
        let price = this.getAttribute("data-price");

        // Call addToCart with the collected values
        addToCart(name, price);
    });
});
