document.addEventListener("DOMContentLoaded", function() {
    const username = sessionStorage.getItem("studentUsername");

    if (!username) {
        window.location.replace("login.html");
        return;
    }

    const nav = document.querySelector(".navbar nav");
    if (!nav) {
        return;
    }

    const logoutButton = document.createElement("button");
    logoutButton.type = "button";
    logoutButton.className = "logout-button";
    logoutButton.textContent = "Log out";
    logoutButton.addEventListener("click", function() {
        sessionStorage.removeItem("studentUsername");
        sessionStorage.removeItem("paymentCart");
        sessionStorage.removeItem("paymentReceipt");
        sessionStorage.removeItem("paymentTransactions");
        sessionStorage.removeItem("studentProfile");
        sessionStorage.removeItem("selectedReceiptId");
        window.location.replace("login.html");
    });

    nav.appendChild(logoutButton);

    // On small screens the links scroll sideways: bring the current page's link into view
    const activeLink = nav.querySelector("a.active");
    if (activeLink) {
        requestAnimationFrame(function() {
            const offset = activeLink.getBoundingClientRect().left -
                nav.getBoundingClientRect().left + nav.scrollLeft;
            nav.scrollLeft = Math.max(0, offset - 8);
        });
    }
});
