
document.addEventListener("DOMContentLoaded", function() {

    // SIDEBAR CONTENT SWITCHING
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    const contentSections = document.querySelectorAll(".content-section");

    sidebarLinks.forEach(function(link) {

        link.addEventListener("click", function() {

            const sectionId = link.dataset.section;

            sidebarLinks.forEach(function(item) {
                item.classList.remove("active");
            });

            contentSections.forEach(function(section) {
                section.classList.remove("active");
            });

            link.classList.add("active");

            const selectedSection = document.getElementById(sectionId);

            if (selectedSection) {
                selectedSection.classList.add("active");
            }

        });

    });

    // TRANSACTION SEARCH AND FILTER
    const searchInput = document.getElementById("transactionSearch");
    const statusFilter = document.getElementById("statusFilter");
    const transactionRows = document.querySelectorAll("#transactionTableBody tr");
    const noTransactions = document.getElementById("noTransactions");

    function filterTransactions() {

        const searchValue = searchInput.value.toLowerCase().trim();
        const selectedStatus = statusFilter.value;

        let visibleCount = 0;

        transactionRows.forEach(function(row) {

            const rowText = row.textContent.toLowerCase();
            const status = row.dataset.status;

            const matchesSearch = rowText.includes(searchValue);

            const matchesStatus =
                selectedStatus === "all" || status === selectedStatus;

            if (matchesSearch && matchesStatus) {
                row.style.display = "";
                visibleCount++;
            } else {
                row.style.display = "none";
            }

        });

        noTransactions.hidden = visibleCount !== 0;

    }

    if (searchInput && statusFilter) {
        searchInput.addEventListener("input", filterTransactions);
        statusFilter.addEventListener("change", filterTransactions);
    }

    // CLAIMING STATUS MODAL
    const claimModal = document.getElementById("claimModal");
    const closeModal = document.getElementById("closeModal");
    const cancelModal = document.getElementById("cancelModal");
    const saveStatus = document.getElementById("saveStatus");

    const modalStudentName = document.getElementById("modalStudentName");
    const modalTransactionId = document.getElementById("modalTransactionId");
    const modalStudentNumber = document.getElementById("modalStudentNumber");
    const modalPurchasedItems = document.getElementById("modalPurchasedItems");
    const modalTotalAmount = document.getElementById("modalTotalAmount");
    const claimingStatus = document.getElementById("claimingStatus");

    let selectedRow = null;

    // OPEN MODAL WHEN STUDENT NAME IS CLICKED
    document.querySelectorAll(".student-name").forEach(function(button) {

        button.addEventListener("click", function() {

            selectedRow = button.closest("tr");

            modalStudentName.textContent = button.textContent.trim();
            modalTransactionId.textContent = selectedRow.cells[1].textContent;
            modalStudentNumber.textContent = selectedRow.cells[3].textContent;
            modalPurchasedItems.textContent = selectedRow.cells[4].textContent;
            modalTotalAmount.textContent = selectedRow.cells[5].textContent;

            claimingStatus.value = selectedRow.dataset.status;

            claimModal.classList.add("show");

        });

    });

    // CLOSE MODAL
    function hideModal() {
        claimModal.classList.remove("show");
        selectedRow = null;
    }

    closeModal.addEventListener("click", hideModal);
    cancelModal.addEventListener("click", hideModal);

    claimModal.addEventListener("click", function(event) {
        if (event.target === claimModal) {
            hideModal();
        }
    });

    // SAVE UPDATED CLAIMING STATUS
    saveStatus.addEventListener("click", function() {

        if (!selectedRow) {
            return;
        }

        const newStatus = claimingStatus.value;

        selectedRow.dataset.status = newStatus;

        const statusCell = selectedRow.cells[6];
        const statusLabel = statusCell.querySelector(".status");

        statusLabel.textContent =
            newStatus.charAt(0).toUpperCase() + newStatus.slice(1);

        statusLabel.className = "status " + newStatus;

        // Refresh the transaction filter
        filterTransactions();

        hideModal();

        alert("Claiming status updated successfully!");

    });

});
