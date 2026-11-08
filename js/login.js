
document.addEventListener("DOMContentLoaded", function() {

    const loginForm = document.getElementById("loginForm");
    const message = document.getElementById("loginMessage");

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {

            event.preventDefault();

            let username = document.getElementById("username").value.trim().toLowerCase();
            let password = document.getElementById("password").value;

            // STUDENT LOGIN
            if (username === "student") {

                sessionStorage.setItem("studentUsername", username);
                window.location.href = "student-homepage.html";

            }

            // STAFF LOGIN
            else if (username === "staff") {

                sessionStorage.setItem("staffUsername", username);
                window.location.href = "staff-homepage.html";

            }

            // ADMIN LOGIN
            else if (username === "admin") {

                sessionStorage.setItem("adminUsername", username);
                window.location.href = "admin-homepage.html";

            }

            // ADMIN 2 LOGIN
            else if (username === "admin2") {

                sessionStorage.setItem("admin2Username", username);
                window.location.href = "admin2.html";

            }

            // INVALID USERNAME
            else {

                message.style.color = "red";
                message.textContent = "Invalid username. Please try again.";

            }

        });
    }

});
