document.addEventListener("DOMContentLoaded", function() {
    const transactions = JSON.parse(
        sessionStorage.getItem("paymentTransactions") || "[]"
    );
    const selectedReceiptId = sessionStorage.getItem("selectedReceiptId");
    const receipt = transactions.find(function(transaction) {
        return transaction.transactionId === selectedReceiptId;
    }) || JSON.parse(sessionStorage.getItem("paymentReceipt") || "null");
    if (!receipt || !Array.isArray(receipt.items)) {
        window.location.replace("student-homepage.html");
        return;
    }

    document.getElementById("transactionId").textContent = receipt.transactionId;
    const profile = JSON.parse(sessionStorage.getItem("studentProfile") || "{}");
    document.getElementById("studentName").textContent =
        profile.displayName || receipt.username || "Student";
    document.getElementById("purchaseDate").textContent =
        new Date(receipt.date).toLocaleString();
    document.getElementById("proofName").textContent = receipt.proofName;
    document.getElementById("paymentMethod").textContent = receipt.paymentMethod;
    document.getElementById("receiptTotal").textContent =
        PaymentStore.formatPrice(receipt.total);

    const products = document.getElementById("purchasedProducts");
    receipt.items.forEach(function(item) {
        const row = document.createElement("div");
        row.className = "product-row";
        const name = document.createElement("span");
        name.textContent = item.name + " × " + item.quantity;
        const price = document.createElement("strong");
        price.textContent = PaymentStore.formatPrice(item.price * item.quantity);
        row.append(name, price);
        products.appendChild(row);
    });

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
});
