// GET ALL SIDEBAR BUTTONS
const sidebarLinks = document.querySelectorAll(".sidebar-link");

// GET ALL CONTENT SECTIONS
const contentSections = document.querySelectorAll(".content-section");

// FUNCTION TO DISPLAY SELECTED CONTENT
function showSection(sectionId) {

    // HIDE ALL CONTENT SECTIONS
    contentSections.forEach(section => {
        section.classList.remove("active");
    });

    // REMOVE ACTIVE STYLE FROM SIDEBAR
    sidebarLinks.forEach(link => {
        link.classList.remove("active");
    });

    // DISPLAY SELECTED SECTION
    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.classList.add("active");
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