(function() {

    // Staff products (ids are used by the catalog buttons)
    const products = [
        { id: "id-replacement", name: "ID", description: "ID replacement", price: 60 },
        { id: "id-lace", name: "Student ID Lace", description: "Official university ID lace", price: 80, claimOffice: "ASBAO" },
        { id: "medical-certificate", name: "Medical Certificate", description: "", price: 20 },
        { id: "turn-it-in", name: "Turn it in", description: "", price: 1000 },
        { id: "university-oval", name: "University Oval", description: "per day", price: 3000 },
        { id: "bdc", name: "BDC", description: "per day", price: 1500 },
        { id: "socio", name: "Socio", description: "per day", price: 2000 },
        { id: "tables", name: "Tables", description: "per day", price: 10 },
        { id: "chairs", name: "Chairs", description: "per day", price: 5 },
        { id: "gym", name: "Gym", description: "For students", price: 40 },
        { id: "motorcycle-gate-pass", name: "Gate Pass - Motorcycle", description: "Motorcycle", price: 50 },
        { id: "car-gate-pass", name: "Gate Pass - Car", description: "Car", price: 75 }
    ];

    // Separate key so the staff cart never mixes with the student cart
    const CART_KEY = "staffPaymentCart";

    function getCart() {
        try {
            const cart = JSON.parse(sessionStorage.getItem(CART_KEY) || "[]");
            return Array.isArray(cart) ? cart : [];
        } catch (error) {
            return [];
        }
    }

    function saveCart(cart) {
        sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    // Add a product by id (increase quantity if it is already in the cart)
    function addItem(productId, quantity) {

        const product = products.find(function(item) {
            return item.id === productId;
        });

        if (!product) {
            return false;
        }

        const cart = getCart();
        const existing = cart.find(function(entry) {
            return entry.id === productId;
        });

        if (existing) {
            existing.quantity += quantity || 1;
        } else {
            cart.push({ id: productId, quantity: quantity || 1 });
        }

        saveCart(cart);
        return true;
    }

    // Cart entries joined with product details
    function getItems() {
        return getCart().reduce(function(list, entry) {

            const product = products.find(function(item) {
                return item.id === entry.id;
            });

            if (product && Number.isInteger(entry.quantity) && entry.quantity > 0) {
                list.push({ ...product, quantity: entry.quantity });
            }

            return list;
        }, []);
    }

    function formatPrice(amount) {
        return "₱" + amount.toFixed(2);
    }

    window.PaymentStore = {
        products: products,
        getCart: getCart,
        saveCart: saveCart,
        addItem: addItem,
        getItems: getItems,
        formatPrice: formatPrice
    };

})();