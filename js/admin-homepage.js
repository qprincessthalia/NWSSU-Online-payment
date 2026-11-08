
document.addEventListener("DOMContentLoaded", function () {

    // GET ELEMENTS
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    const contentSections = document.querySelectorAll(".content-section");
    const notificationButton = document.getElementById("notificationButton");

    // SHOW SELECTED SECTION
    function showSection(sectionId) {

        contentSections.forEach(section => {
            section.classList.remove("active");
        });

        sidebarLinks.forEach(link => {
            link.classList.remove("active");
        });

        const selectedSection = document.getElementById(sectionId);

        if (selectedSection) {
            selectedSection.classList.add("active");
        }

        const selectedLink = document.querySelector(
            `.sidebar-link[data-section="${sectionId}"]`
        );

        if (selectedLink) {
            selectedLink.classList.add("active");
        }
    }

    // SIDEBAR NAVIGATION
    sidebarLinks.forEach(link => {

        link.addEventListener("click", function () {

            const sectionId = this.dataset.section;

            showSection(sectionId);

        });

    });

    // NOTIFICATION BELL NAVIGATION
    if (notificationButton) {

        notificationButton.addEventListener("click", function () {

            showSection("notifications");

        });

    }

    // TABLE SEARCH AND FILTER
    function setupTableFilter(searchId, filterId, tableId, messageId) {

        const searchInput = document.getElementById(searchId);
        const filterSelect = document.getElementById(filterId);
        const table = document.getElementById(tableId);
        const noResults = document.getElementById(messageId);

        if (!searchInput || !filterSelect || !table) {
            return;
        }

        const rows = table.querySelectorAll("tbody tr");

        function filterRows() {

            const searchValue = searchInput.value.toLowerCase().trim();
            const selectedStatus = filterSelect.value;

            let visibleCount = 0;

            rows.forEach(row => {

                const rowText = row.textContent.toLowerCase();
                const rowStatus = row.dataset.status;

                const matchesSearch = rowText.includes(searchValue);

                const matchesStatus =
                    selectedStatus === "all" ||
                    rowStatus === selectedStatus;

                if (matchesSearch && matchesStatus) {

                    row.style.display = "";
                    visibleCount++;

                } else {

                    row.style.display = "none";

                }

            });

            if (noResults) {
                noResults.hidden = visibleCount !== 0;
            }

        }

        searchInput.addEventListener("input", filterRows);
        filterSelect.addEventListener("change", filterRows);

    }

    // STUDENT TRANSACTION FILTER
    setupTableFilter(
        "transactionSearch",
        "statusFilter",
        "transactionTable",
        "noTransactions"
    );

    // CASH ADVANCE RETURN FILTER
    setupTableFilter(
        "cashAdvanceSearch",
        "cashAdvanceFilter",
        "cashAdvanceTable",
        "noCashAdvance"
    );

    // BUDGET REQUEST FILTER
    setupTableFilter(
        "budgetSearch",
        "budgetFilter",
        "budgetTable",
        "noBudgetRequests"
    );

    // NOTIFICATION ELEMENTS
    const notificationCards = document.querySelectorAll(".notification-card");
    const notificationFilters = document.querySelectorAll(".notification-filter");
    const markAllReadButton = document.getElementById("markAllReadButton");
    const noNotifications = document.getElementById("noNotifications");

    let currentNotificationFilter = "all";

    // UPDATE NOTIFICATION DISPLAY
    function updateNotifications() {

        let visibleCount = 0;

        notificationCards.forEach(card => {

            const isUnread = card.classList.contains("unread");

            const shouldShow =
                currentNotificationFilter === "all" ||
                (currentNotificationFilter === "unread" && isUnread);

            card.style.display = shouldShow ? "flex" : "none";

            if (shouldShow) {
                visibleCount++;
            }

        });

        if (noNotifications) {
            noNotifications.hidden = visibleCount !== 0;
        }

    }

    // NOTIFICATION FILTER BUTTONS
    notificationFilters.forEach(button => {

        button.addEventListener("click", function () {

            currentNotificationFilter = this.dataset.filter;

            notificationFilters.forEach(filter => {
                filter.classList.remove("active");
            });

            this.classList.add("active");

            updateNotifications();

        });

    });

    // MARK ONE NOTIFICATION AS READ
    notificationCards.forEach(card => {

        card.addEventListener("click", function () {

            const notificationType = this.dataset.notification;

            // Remove unread status
            this.classList.remove("unread");

            // Remove NEW label
            const newLabel = this.querySelector(".new-label");

            if (newLabel) {
                newLabel.remove();
            }

            // Open related record section
            if (notificationType === "cashAdvance") {

                showSection("cashAdvanceReturn");

            } else if (notificationType === "budgetRequests") {

                showSection("budgetRequests");

            }

            updateNotifications();

        });

    });

    // MARK ALL NOTIFICATIONS AS READ
    if (markAllReadButton) {

        markAllReadButton.addEventListener("click", function () {

            notificationCards.forEach(card => {

                card.classList.remove("unread");

                const newLabel = card.querySelector(".new-label");

                if (newLabel) {
                    newLabel.remove();
                }

            });

            updateNotifications();

        });

    }

    // INITIAL NOTIFICATION DISPLAY
    updateNotifications();

});
