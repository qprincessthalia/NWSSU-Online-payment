// Get the pages
const homePage = document.getElementById("homePage");
const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");

// Get the buttons
const homeLoginButton = document.getElementById("homeLoginButton");
const navLoginButton = document.getElementById("navLoginButton");
const backButton = document.getElementById("backButton");
const logoutButton = document.getElementById("logoutButton");
const homeButton = document.getElementById("homeButton");

// Get the login form
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

// Dashboard elements
const dashboardTitle = document.getElementById("dashboardTitle");
const dashboardWelcome = document.getElementById("dashboardWelcome");
const paymentStatus = document.getElementById("paymentStatus");

// Show Home Page
function showHome() {
    homePage.hidden = false;
    loginPage.hidden = true;
    dashboardPage.hidden = true;
}

// Show Login Page
function showLogin() {
    homePage.hidden = true;
    loginPage.hidden = false;
    dashboardPage.hidden = true;

    loginForm.reset();
    loginMessage.textContent = "";
}

// Show Dashboard Page
function showDashboard() {
    homePage.hidden = true;
    loginPage.hidden = true;
    dashboardPage.hidden = false;
}

// Homepage Login Button
homeLoginButton.addEventListener("click", showLogin);

// Navbar Log in Link
navLoginButton.addEventListener("click", function(event) {
    event.preventDefault();
    showLogin();
});

// Back to Home Button
backButton.addEventListener("click", showHome);

// Home Navigation Link
homeButton.addEventListener("click", function(event) {
    event.preventDefault();
    showHome();
});

// Login Form
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (username === "" || password === "") {
        loginMessage.textContent =
            "Please enter your username and password.";
        return;
    }

    // Demo role detection
    if (username.toLowerCase().startsWith("admin")) {
        dashboardTitle.textContent = "Administrator Dashboard";
        dashboardWelcome.textContent = "Welcome, " + username + "!";
        paymentStatus.textContent =
            "You are logged in as an administrator.";
    }
    else if (username.toLowerCase().startsWith("student")) {
        dashboardTitle.textContent = "Student Dashboard";
        dashboardWelcome.textContent = "Welcome, " + username + "!";
        paymentStatus.textContent =
            "You are logged in as a student.";
    }
    else {
        loginMessage.textContent =
            "Username must start with 'student' or 'admin'.";
        return;
    }

    showDashboard();
});

// Logout Button
logoutButton.addEventListener("click", function() {
    showHome();
});