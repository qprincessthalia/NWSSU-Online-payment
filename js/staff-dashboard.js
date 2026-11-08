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
const viewButtons = document.querySelectorAll(".view-button");

viewButtons.forEach(button => {
    button.addEventListener("click", () => {
        const sectionId = button.getAttribute("data-section");
        showSection(sectionId);
    });
});