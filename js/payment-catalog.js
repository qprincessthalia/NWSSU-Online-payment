
// SELECT PRODUCT
function selectProduct(productName, price) {

    const message = document.getElementById("selection-message");

    message.textContent =
        productName + " added to cart - ₱" + price.toFixed(2);

}
