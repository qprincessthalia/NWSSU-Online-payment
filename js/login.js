document.addEventListener("DOMContentLoaded", function() {

    const loginForm = document.getElementById("loginForm");
    const message = document.getElementById("loginMessage");

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let username = document.getElementById("username").value.trim().toLowerCase();

        // STUDENT LOGIN
        if (username === "princess") {

            window.location.href = "student-homepage.html";

        }

        // ADMIN LOGIN
        else if (username === "thalia") {

            message.style.color = "red";
            message.textContent = "Admin homepage is not yet available.";

        }

        // INVALID USERNAME
        else {

            message.style.color = "red";
            message.textContent = "Invalid username. Please try again.";

        }

    });

});