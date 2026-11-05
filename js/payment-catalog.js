
// SELECT PRODUCT
function selectProduct(productName, price) {

    const message = document.getElementById("selection-message");
    const product = PaymentStore.products.find(function(item) {
        return item.name === productName && item.price === price;
    });

    if (!product) {
        message.textContent = "That item is not available.";
        return;
    }

    const cart = PaymentStore.getCart();
    const existingItem = cart.find(function(item) {
        return item.id === product.id;
    });
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: product.id, quantity: 1 });
    }
    PaymentStore.saveCart(cart);

    message.textContent = productName + " added to cart - " +
        PaymentStore.formatPrice(price);
    document.getElementById("buyButton").disabled = false;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("buyButton").addEventListener("click", function() {
        window.location.href = "cart.html";
    });
    document.getElementById("buyButton").disabled =
        PaymentStore.getCart().length === 0;
});
