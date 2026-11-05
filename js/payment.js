document.addEventListener("DOMContentLoaded", function() {

    const itemsContainer = document.getElementById("orderItems");
    const totalElement = document.getElementById("orderTotal");
    const qrAmount = document.getElementById("qrAmount");
    const confirmPaymentBtn = document.getElementById("confirmPayment");

    const items = PaymentStore.getItems();

    if (items.length === 0) {
        window.location.replace("cart.html");
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
        name.textContent = item.name + " × " + item.quantity;

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
        event.preventDefault(); // Pause navigation to save data

        const now = new Date();

        const receipt = {
            transactionId: "NW-" + now.getTime(),
            username: sessionStorage.getItem("studentUsername") || "Student",
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

        // Save transaction to sessionStorage
        const transactions = JSON.parse(
            sessionStorage.getItem("paymentTransactions") || "[]"
        );

        transactions.push(receipt);

        sessionStorage.setItem(
            "paymentTransactions",
            JSON.stringify(transactions)
        );

        sessionStorage.setItem(
            "paymentReceipt",
            JSON.stringify(receipt)
        );

        sessionStorage.setItem(
            "selectedReceiptId",
            receipt.transactionId
        );

        // Clear cart after successful submission
        PaymentStore.saveCart([]);

        // Proceed to transaction receipt page
        window.location.href = confirmPaymentBtn.getAttribute("href");
    });

});
