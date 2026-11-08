document.addEventListener("DOMContentLoaded", function() {

    // Check if the staff session item exists
    const loggedInStaff = sessionStorage.getItem("staffUsername");

    // If not logged in as staff, redirect back to login page
    if (!loggedInStaff) {
        window.location.href = "index.html"; 
    }

    // Handle logout button click
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function(e) {
            e.preventDefault();
            sessionStorage.removeItem("staffUsername");
            window.location.href = "index.html";
        });
    }

});