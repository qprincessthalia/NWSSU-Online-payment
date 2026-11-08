document.addEventListener("DOMContentLoaded", function() {

    const cartList = document.getElementById("cartList");
    const total = document.getElementById("cartTotal");
    const checkoutButton = document.getElementById("checkoutButton");

    function renderCart() {

        const items = PaymentStore.getItems();

        cartList.replaceChildren();

        if (items.length === 0) {

            const emptyMessage = document.createElement("p");

            emptyMessage.className = "empty-cart";
            emptyMessage.textContent =
                "Your cart is empty. Browse the catalog to add items.";

            cartList.appendChild(emptyMessage);

            total.textContent = PaymentStore.formatPrice(0);

            checkoutButton.setAttribute("aria-disabled", "true");
            checkoutButton.classList.add("disabled");

            return;
        }

        let totalAmount = 0;

        items.forEach(function(item) {

            const subtotal = item.price * item.quantity;

            totalAmount += subtotal;

            const row = document.createElement("div");

            row.className = "cart-item";

            row.innerHTML =
                '<div class="item-details">' +
                    "<h3></h3><p></p><span></span>" +
                '</div>' +
                '<div class="quantity-control">' +
                    '<button class="quantity-button" type="button" data-action="decrease" aria-label="Decrease quantity">−</button>' +
                    '<span class="quantity"></span>' +
                    '<button class="quantity-button" type="button" data-action="increase" aria-label="Increase quantity">+</button>' +
                '</div>' +
                '<span class="item-price"></span>' +
                '<button class="remove-button" type="button" data-action="remove">Remove</button>';

            row.dataset.productId = item.id;

            row.querySelector("h3").textContent = item.name;
            row.querySelector("p").textContent = item.description;

            row.querySelector(".item-details span").textContent =
                PaymentStore.formatPrice(item.price) + " each";

            row.querySelector(".quantity").textContent = item.quantity;

            row.querySelector(".item-price").textContent =
                PaymentStore.formatPrice(subtotal);

            cartList.appendChild(row);

        });

        total.textContent = PaymentStore.formatPrice(totalAmount);

        checkoutButton.setAttribute("aria-disabled", "false");
        checkoutButton.classList.remove("disabled");

    }


    // CART BUTTON ACTIONS
    cartList.addEventListener("click", function(event) {

        const button = event.target.closest("button[data-action]");

        if (!button) {
            return;
        }

        const row = button.closest(".cart-item");

        const cart = PaymentStore.getCart();

        const item = cart.find(function(entry) {
            return entry.id === row.dataset.productId;
        });

        if (!item) {
            return;
        }

        if (button.dataset.action === "increase") {

            item.quantity += 1;

        } else if (button.dataset.action === "decrease" && item.quantity > 1) {

            item.quantity -= 1;

        } else if (button.dataset.action === "remove") {

            PaymentStore.saveCart(
                cart.filter(function(entry) {
                    return entry.id !== item.id;
                })
            );

            renderCart();
            return;

        }

        PaymentStore.saveCart(cart);

        renderCart();

    });


    // CHECKOUT BUTTON
    checkoutButton.addEventListener("click", function(event) {

        if (checkoutButton.getAttribute("aria-disabled") === "true") {
            event.preventDefault();
        }

    });

    renderCart();

});