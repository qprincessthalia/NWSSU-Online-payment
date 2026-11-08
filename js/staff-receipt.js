document.addEventListener("DOMContentLoaded", function() {

    function readJSON(key, fallback) {
        try {
            const value = JSON.parse(sessionStorage.getItem(key));
            return value === null ? fallback : value;
        } catch (error) {
            return fallback;
        }
    }

    // Look in the staff keys first, then the older shared keys
    const transactions = readJSON("staffTransactions", readJSON("paymentTransactions", []));

    const selectedReceiptId =
        sessionStorage.getItem("staffSelectedReceiptId") ||
        sessionStorage.getItem("selectedReceiptId");

    const receipt = (Array.isArray(transactions) ? transactions : []).find(function(transaction) {
        return transaction.transactionId === selectedReceiptId;
    }) || readJSON("staffPaymentReceipt", readJSON("paymentReceipt", null));

    // No receipt saved: show a message instead of leaving the page
    if (!receipt || !Array.isArray(receipt.items)) {

        const card = document.querySelector(".receipt-card");

        card.replaceChildren();

        const message = document.createElement("p");
        message.className = "receipt-note";
        message.textContent =
            "No receipt found. Complete a payment first, then you will be sent here.";

        card.appendChild(message);

        document.getElementById("printButton").style.display = "none";

        return;
    }

    document.getElementById("transactionId").textContent = receipt.transactionId;
    document.getElementById("staffName").textContent = receipt.username || "Staff";
    document.getElementById("purchaseDate").textContent =
        new Date(receipt.date).toLocaleString();
    document.getElementById("paymentMethod").textContent = receipt.paymentMethod;
    document.getElementById("receiptTotal").textContent =
        PaymentStore.formatPrice(receipt.total);

    // PRODUCTS
    const products = document.getElementById("purchasedProducts");

    receipt.items.forEach(function(item) {

        const row = document.createElement("div");
        row.className = "product-row";

        const name = document.createElement("span");
        name.textContent = item.name + " \u00d7 " + item.quantity;

        const price = document.createElement("strong");
        price.textContent = PaymentStore.formatPrice(item.price * item.quantity);

        row.append(name, price);
        products.appendChild(row);
    });

    // CLAIMING OFFICES
    const officeContainer = document.getElementById("claimingOffices");

    const offices = [...new Set(receipt.items.map(function(item) {
        return item.claimOffice || "Confirm with the appropriate university office";
    }))];

    offices.forEach(function(office) {

        const row = document.createElement("p");
        row.className = "claim-office-row";
        row.textContent = office;

        officeContainer.appendChild(row);
    });

    // PRINT / SAVE
    document.getElementById("printButton").addEventListener("click", function() {
        window.print();
    });

});