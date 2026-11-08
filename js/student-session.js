
document.addEventListener("DOMContentLoaded", function() {

    // CHECK IF THE STUDENT IS LOGGED IN
    const username = sessionStorage.getItem("studentUsername");

    if (!username) {
        window.location.replace("login.html");
        return;
    }

    // GET THE NAVIGATION BAR
    const nav = document.querySelector(".navbar nav");

    if (!nav) {
        return;
    }

    // PREVENT ADDING MULTIPLE LOGOUT BUTTONS
    if (nav.querySelector(".logout-button")) {
        return;
    }

    // CREATE LOGOUT BUTTON
    const logoutButton = document.createElement("button");

    logoutButton.type = "button";
    logoutButton.className = "logout-button";
    logoutButton.textContent = "Log out";

    // LOG OUT FUNCTION
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

    // KEEP THE ACTIVE NAVIGATION LINK VISIBLE ON SMALL SCREENS
    const activeLink = nav.querySelector("a.active");

    if (activeLink) {
        requestAnimationFrame(function() {

            const offset = activeLink.getBoundingClientRect().left -
                nav.getBoundingClientRect().left + nav.scrollLeft;

            nav.scrollLeft = Math.max(0, offset - 8);
        });
    }

});
