
// WAIT FOR THE PAGE TO LOAD
document.addEventListener("DOMContentLoaded", function() {

    const buyButton = document.getElementById("buyButton");

    // BUY PRODUCT BUTTON
    buyButton.addEventListener("click", function() {
        window.location.href = "cart.html";
    });

    // CHECK IF CART HAS PRODUCTS
    buyButton.disabled = PaymentStore.getCart().length === 0;

    // CATEGORY BUTTONS
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

            const category = document.getElementById(
                button.dataset.category
            );

            if (category) {
                category.classList.add("active");
            }
        });
    });

    // BOOKLET PRICE CALCULATION
    const bookletSubjects = document.getElementById("bookletSubjects");
    const bookletCalculation = document.getElementById("bookletCalculation");

    bookletSubjects.addEventListener("input", function() {
        const subjects = Number(bookletSubjects.value);

        if (!Number.isInteger(subjects) || subjects < 1) {
            bookletCalculation.textContent =
                "Enter your number of subjects to calculate the total.";
            return;
        }

        const booklets = subjects * 2;
        const total = booklets * 4;

        bookletCalculation.textContent =
            booklets + " booklets × ₱4.00 = ₱" + total.toFixed(2);
    });

});

// SELECT REGULAR PRODUCT
window.selectProduct = function(productName, price) {

    const message = document.getElementById("selection-message");

    const product = PaymentStore.products.find(function(item) {
        return item.name === productName && item.price === price;
    });

    if (!product) {
        message.textContent = "Product not found. Please check payment-store.js.";
        return;
    }

    const cart = PaymentStore.getCart();

    const existingItem = cart.find(function(item) {
        return item.id === product.id;
    });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            quantity: 1
        });
    }

    PaymentStore.saveCart(cart);

    message.textContent = productName + " added to cart - " +
        PaymentStore.formatPrice(price);

    document.getElementById("buyButton").disabled = false;
};


// ADD BOOKLET
window.addBooklet = function() {

    const subjects = Number(
        document.getElementById("bookletSubjects").value
    );

    const message = document.getElementById("selection-message");

    if (!Number.isInteger(subjects) || subjects < 1) {
        message.textContent = "Please enter a valid number of subjects.";
        return;
    }

    const product = PaymentStore.products.find(function(item) {
        return item.id === "test-booklet";
    });

    if (!product) {
        message.textContent = "Booklet product not found in payment-store.js.";
        return;
    }

    const booklets = subjects * 2;
    const total = booklets * product.price;

    const cart = PaymentStore.getCart();

    const existingItem = cart.find(function(item) {
        return item.id === "test-booklet";
    });

    if (existingItem) {
        existingItem.subjects = subjects;
        existingItem.quantity = booklets;
    } else {
        cart.push({
            id: "test-booklet",
            subjects: subjects,
            quantity: booklets
        });
    }

    PaymentStore.saveCart(cart);

    message.textContent =
        booklets + " booklets added to cart. Total: " +
        PaymentStore.formatPrice(total);

    document.getElementById("buyButton").disabled = false;
};


// ADD GATE PASS
window.addGatePass = function() {

    const selectedType = document.getElementById("gatePassType").value;

    const product = PaymentStore.products.find(function(item) {
        return item.id === selectedType;
    });

    const message = document.getElementById("selection-message");

    if (!product) {
        message.textContent = "Selected gate pass is not available.";
        return;
    }

    const cart = PaymentStore.getCart();

    const existingItem = cart.find(function(item) {
        return item.id === product.id;
    });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            quantity: 1
        });
    }

    PaymentStore.saveCart(cart);

    message.textContent = product.name + " added to cart - " +
        PaymentStore.formatPrice(product.price);

    document.getElementById("buyButton").disabled = false;
};
