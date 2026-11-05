(function() {
    const products = [
        { id: "cor", name: "COR", description: "Certificate of Registration", price: 30, claimOffice: "Registrar" },
        { id: "cog", name: "COG", description: "Certificate of Grades (per semester)", price: 20, claimOffice: "Registrar" },
        { id: "id-replacement", name: "ID", description: "ID replacement", price: 60 },
        { id: "id-lace", name: "Student ID Lace", description: "Official university ID lace", price: 80, claimOffice: "ASBAO" },
        { id: "id-sling", name: "ID Sling", description: "Student", price: 60 },
        { id: "gym", name: "Gym", description: "For students", price: 40 },
        { id: "motorcycle-gate-pass", name: "Gate Pass - Motorcycle", description: "Motorcycle", price: 50 },
        { id: "car-gate-pass", name: "Gate Pass - Car", description: "Car", price: 75 },
        { id: "school-uniform", name: "School Uniform", description: "Student", price: 450 },
        { id: "pathfit-uniform", name: "Pathfit Uniform", description: "Student", price: 650 },
        { id: "test-booklet", name: "Test Booklet (Blue Book)", description: "Per piece", price: 4 }
    ];

    function getCart() {
        const cart = JSON.parse(sessionStorage.getItem("paymentCart") || "[]");
        if (!Array.isArray(cart)) {
            throw new Error("Saved cart data is invalid.");
        }
        return cart;
    }

    function saveCart(cart) {
        sessionStorage.setItem("paymentCart", JSON.stringify(cart));
    }

    function getItems() {
        const cart = getCart();
        return cart.map(function(entry) {
            const product = products.find(function(item) {
                return item.id === entry.id;
            });
            if (!product || !Number.isInteger(entry.quantity) || entry.quantity < 1) {
                throw new Error("Saved cart contains an invalid item.");
            }
            return { ...product, quantity: entry.quantity };
        });
    }

    function formatPrice(amount) {
        return "₱" + amount.toFixed(2);
    }

    window.PaymentStore = {
        products: products,
        getCart: getCart,
        saveCart: saveCart,
        getItems: getItems,
        formatPrice: formatPrice
    };
})();
