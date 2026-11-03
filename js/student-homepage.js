document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let username = document.getElementById("username").value.trim().toLowerCase();
    let password = document.getElementById("password").value;

    let message = document.getElementById("loginMessage");

    if (username === "princess") {

        window.location.href = "student-homepage.html";

    }

    else if (username === "thalia") {

        window.location.href = "pages/admin-homepage.html";

    }

    else {

        message.style.color = "red";
        message.textContent = "Invalid username. Please try again.";

    }

});