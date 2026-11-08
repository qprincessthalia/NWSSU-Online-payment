document.addEventListener("DOMContentLoaded", function() {

    // Check if the staff session item exists
    const loggedInStaff = sessionStorage.getItem("staffUsername");

    // If not logged in as staff, redirect back to index/login page
    if (!loggedInStaff) {
        window.location.href = "index.html"; 
    }

});