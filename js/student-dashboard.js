// GET ALL SIDEBAR BUTTONS
const sidebarLinks = document.querySelectorAll(".sidebar-link");

// GET ALL CONTENT SECTIONS
const contentSections = document.querySelectorAll(".content-section");

// FUNCTION TO DISPLAY SELECTED CONTENT
function showSection(sectionId) {

    // HIDE ALL CONTENT
    contentSections.forEach(section => {
        section.classList.remove("active");
    });

    // REMOVE ACTIVE STYLE FROM ALL SIDEBAR BUTTONS
    sidebarLinks.forEach(link => {
        link.classList.remove("active");
    });

    // SHOW SELECTED CONTENT
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add("active");
    }

    // HIGHLIGHT SELECTED SIDEBAR BUTTON
    const selectedLink = document.querySelector(
        `.sidebar-link[data-section="${sectionId}"]`
    );

    if (selectedLink) {
        selectedLink.classList.add("active");
    }
}

// SIDEBAR BUTTON EVENTS
sidebarLinks.forEach(link => {
    link.addEventListener("click", () => {
        const sectionId = link.getAttribute("data-section");
        showSection(sectionId);
    });
});

// VIEW BUTTON EVENTS (FOR DASHBOARD SUMMARY CARDS)
const viewButtons = document.querySelectorAll(".view-button[data-section]");

viewButtons.forEach(button => {
    button.addEventListener("click", () => {
        const sectionId = button.getAttribute("data-section");
        showSection(sectionId);
    });
});


// BUDGET REQUEST FORM (static demo: nothing is sent or saved)
const budgetForm = document.getElementById("budgetForm");

if (budgetForm) {

    const requestSuccess = document.getElementById("requestSuccess");
    const requestError = document.getElementById("requestError");
    const dateNeeded = document.getElementById("dateNeeded");

    // Needed date cannot be in the past (YYYY-MM-DD, local time)
    const now = new Date();
    dateNeeded.min = now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0");

    // CLEAR FORM: empty every field and hide the messages
    budgetForm.addEventListener("reset", () => {

        setTimeout(() => {
            budgetForm
                .querySelectorAll('input[type="text"], input[type="number"], input[type="date"]')
                .forEach(input => {
                    input.value = "";
                });
        }, 0);

        requestSuccess.hidden = true;
        requestError.hidden = true;
    });

    budgetForm.addEventListener("submit", event => {

        event.preventDefault();

        requestSuccess.hidden = true;

        if (!budgetForm.checkValidity()) {
            requestError.textContent = "Please fill out all required fields correctly.";
            requestError.hidden = false;
            budgetForm.reportValidity();
            return;
        }

        requestError.hidden = true;

        // Reset first (it hides the messages), then show the demo message
        budgetForm.reset();

        requestSuccess.textContent =
            "Demo only: your budget request was not sent. " +
            "This form will be connected to the admin side later.";
        requestSuccess.hidden = false;

        document.querySelector(".request-scroll").scrollTop = 0;
    });
}