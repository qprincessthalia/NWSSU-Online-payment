document.addEventListener("DOMContentLoaded", function() {

    const itemsContainer = document.getElementById("orderItems");
    const totalElement = document.getElementById("orderTotal");
    const qrAmount = document.getElementById("qrAmount");
    const confirmPaymentBtn = document.getElementById("confirmPayment");

    const items = PaymentStore.getItems();

    if (items.length === 0) {
        window.location.replace("staff-cart.html");
        return;
    }

    // Calculate and display the order total
    let total = 0;

    items.forEach(function(item) {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement("div");
        row.className = "order-item";

        const name = document.createElement("span");
        name.textContent = item.name + " \u00d7 " + item.quantity;

        const price = document.createElement("span");
        price.textContent = PaymentStore.formatPrice(subtotal);

        row.append(name, price);
        itemsContainer.appendChild(row);
    });

    totalElement.textContent = PaymentStore.formatPrice(total);
    qrAmount.textContent = PaymentStore.formatPrice(total);

    // Generate a non-payment demonstration QR code
    const qrContainer = document.getElementById("gcashQR");

    if (typeof QRCode !== "undefined") {
        qrContainer.innerHTML = "";

        new QRCode(qrContainer, {
            text: "NWSSU DEMO ONLY - NOT A REAL PAYMENT QR CODE",
            width: 200,
            height: 200,
            correctLevel: QRCode.CorrectLevel.H
        });
    } else {
        qrContainer.textContent = "Demo QR unavailable. Check your internet connection.";
    }

    // Handle Confirm Payment button click
    confirmPaymentBtn.addEventListener("click", function(event) {
        event.preventDefault();

        const now = new Date();

        const receipt = {
            transactionId: "NW-" + now.getTime(),
            username: sessionStorage.getItem("staffUsername") || "Staff",
            date: now.toISOString(),
            paymentMethod: "GCash",
            status: "Pending Verification",
            items: items.map(function(item) {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    claimOffice: item.claimOffice || "Confirm with the appropriate university office"
                };
            }),
            total: total
        };

        const transactions = JSON.parse(
            sessionStorage.getItem("staffTransactions") || "[]"
        );

        transactions.push(receipt);

        sessionStorage.setItem("staffTransactions", JSON.stringify(transactions));
        sessionStorage.setItem("staffPaymentReceipt", JSON.stringify(receipt));
        sessionStorage.setItem("staffSelectedReceiptId", receipt.transactionId);

        // Clear the staff cart after successful submission
        PaymentStore.saveCart([]);

        window.location.href = "staff-receipt.html";
    });

});