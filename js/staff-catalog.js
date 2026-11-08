document.addEventListener("DOMContentLoaded", function() {

    // CATEGORY BUTTONS & PRODUCT LISTS
    const categoryButtons = document.querySelectorAll(".category-button");
    const productLists = document.querySelectorAll(".product-list");

    categoryButtons.forEach(function(button) {
        button.addEventListener("click", function() {

            categoryButtons.forEach(function(item) {
                item.classList.remove("active");
            });

            productLists.forEach(function(list) {
                list.classList.remove("active");
            });

            button.classList.add("active");

            const targetSection = document.getElementById(
                button.getAttribute("data-category")
            );

            if (targetSection) {
                targetSection.classList.add("active");
            }
        });
    });

    // ADD TO CART (stay on the catalog so more items can be added)
    const message = document.getElementById("selection-message");
    const buyButton = document.getElementById("buyButton");

    function updateBuyButton() {
        const hasItems = PaymentStore.getItems().length > 0;
        buyButton.disabled = !hasItems;
    }

    document.addEventListener("click", function(event) {

        const button = event.target.closest(".add-button");

        if (!button) {
            return;
        }

        let productId = button.dataset.productId;

        // Gate pass uses the dropdown value
        if (button.dataset.source === "gatePassType") {
            productId = document.getElementById("gatePassType").value;
        }

        if (PaymentStore.addItem(productId)) {

            const product = PaymentStore.products.find(function(item) {
                return item.id === productId;
            });

            message.textContent = product.name + " added to your cart.";
            updateBuyButton();
        }
    });

    // GO TO CART
    buyButton.addEventListener("click", function() {
        window.location.href = "staff-cart.html";
    });

    updateBuyButton();

});