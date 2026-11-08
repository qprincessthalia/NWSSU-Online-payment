
document.addEventListener("DOMContentLoaded", function () {

    // SIDEBAR NAVIGATION
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    const contentSections = document.querySelectorAll(".content-section");

    function showSection(sectionId) {

        sidebarLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.dataset.section === sectionId
            );
        });

        contentSections.forEach(section => {
            section.classList.toggle(
                "active",
                section.id === sectionId
            );
        });
    }

    sidebarLinks.forEach(link => {
        link.addEventListener("click", function () {
            showSection(this.dataset.section);
        });
    });

    // DASHBOARD VIEW BUTTONS
    document.querySelectorAll(".view-button").forEach(button => {
        button.addEventListener("click", function () {
            showSection(this.dataset.target);
        });
    });

    // SAMPLE PURCHASE RECORDS
    const samplePurchases = [
        {
            transactionId: "2775280",
            studentId: "2024-001",
            studentName: "Juan Dela Cruz",
            item: "Student ID Lace",
            quantity: 1,
            purchaseDate: "2026-11-05",
            claimDate: "",
            status: "Unclaimed"
        },
        {
            transactionId: "2775279",
            studentId: "2024-002",
            studentName: "Maria Santos",
            item: "School Uniform",
            quantity: 2,
            purchaseDate: "2026-11-04",
            claimDate: "",
            status: "Unclaimed"
        },
        {
            transactionId: "2775278",
            studentId: "2024-003",
            studentName: "Ana Reyes",
            item: "Student Handbook",
            quantity: 1,
            purchaseDate: "2026-11-06",
            claimDate: "",
            status: "Unclaimed"
        },
        {
            transactionId: "2775277",
            studentId: "2024-004",
            studentName: "Mark Garcia",
            item: "COR Copy",
            quantity: 1,
            purchaseDate: "2026-11-02",
            claimDate: "",
            status: "Unclaimed"
        },
        {
            transactionId: "2775276",
            studentId: "2024-005",
            studentName: "Sofia Cruz",
            item: "Medical Certificate",
            quantity: 1,
            purchaseDate: "2026-11-08",
            claimDate: "",
            status: "Unclaimed"
        }
    ];

    // RESET RECORDS EVERY TIME THE PAGE LOADS
    let purchases = samplePurchases.map(purchase => ({
        ...purchase
    }));

    // HTML TEXT PROTECTION
    function escapeHTML(value) {

        return String(value).replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[character]);

    }

    // FORMAT DATE
    function formatDate(date) {

        if (!date) return "-";

        const parts = date.split("-");

        if (parts.length !== 3) return "-";

        return new Date(
            Number(parts[0]),
            Number(parts[1]) - 1,
            Number(parts[2])
        ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });

    }

    // UPDATE DASHBOARD SUMMARY
    function updateSummary() {

        const claimed = purchases.filter(
            p => p.status === "Claimed"
        ).length;

        const unclaimed = purchases.filter(
            p => p.status === "Unclaimed"
        ).length;

        document.getElementById("totalPurchases").textContent =
            purchases.length;

        document.getElementById("claimedPurchases").textContent =
            claimed;

        document.getElementById("unclaimedPurchases").textContent =
            unclaimed;

        document.getElementById("allTotal").textContent =
            purchases.length;

        document.getElementById("claimedTotal").textContent =
            claimed;

        document.getElementById("unclaimedTotal").textContent =
            unclaimed;

    }

    // CREATE PURCHASE TABLE ROW
    function createRow(purchase, includeAction = false) {

        const row = document.createElement("tr");

        const statusClass =
            purchase.status === "Claimed" ? "claimed" : "unclaimed";

        const action = includeAction
            ? `
                <td>
                    <button
                        class="claim-button"
                        data-id="${escapeHTML(purchase.transactionId)}"
                    >
                        Mark as Claimed
                    </button>
                </td>
            `
            : "";

        row.innerHTML = `
            <td>${escapeHTML(purchase.transactionId)}</td>
            <td>${escapeHTML(purchase.studentId)}</td>
            <td>${escapeHTML(purchase.studentName)}</td>
            <td>${escapeHTML(purchase.item)}</td>
            <td>${escapeHTML(purchase.quantity)}</td>
            <td>${formatDate(purchase.purchaseDate)}</td>
            ${includeAction ? "" : `<td>${formatDate(purchase.claimDate)}</td>`}
            <td>
                <span class="status ${statusClass}">
                    ${escapeHTML(purchase.status)}
                </span>
            </td>
            ${action}
        `;

        return row;

    }

    // DISPLAY TABLE RECORDS
    function displayTable(tableId, emptyId, records, includeAction = false) {

        const tableBody = document.getElementById(tableId);
        const emptyMessage = document.getElementById(emptyId);

        tableBody.innerHTML = "";

        if (records.length === 0) {
            emptyMessage.style.display = "block";
            return;
        }

        emptyMessage.style.display = "none";

        records.forEach(purchase => {
            tableBody.appendChild(
                createRow(purchase, includeAction)
            );
        });

    }

    // SEARCH FILTER
    function searchRecords(records, searchValue) {

        const value = searchValue.toLowerCase().trim();

        return records.filter(purchase => {

            const searchable = [
                purchase.transactionId,
                purchase.studentId,
                purchase.studentName,
                purchase.item
            ].join(" ").toLowerCase();

            return searchable.includes(value);

        });

    }

    // DISPLAY ALL PURCHASES
    function displayAllPurchases() {

        const records = searchRecords(
            purchases,
            document.getElementById("allSearch").value
        );

        displayTable(
            "allTableBody",
            "allEmpty",
            records
        );

    }

    // DISPLAY UNCLAIMED PURCHASES
    function displayUnclaimed() {

        const unclaimed = purchases.filter(
            p => p.status === "Unclaimed"
        );

        const records = searchRecords(
            unclaimed,
            document.getElementById("unclaimedSearch").value
        );

        displayTable(
            "unclaimedTableBody",
            "unclaimedEmpty",
            records,
            true
        );

    }

    // DISPLAY CLAIMED PURCHASES
    function displayClaimed() {

        const claimed = purchases.filter(
            p => p.status === "Claimed"
        );

        const records = searchRecords(
            claimed,
            document.getElementById("claimedSearch").value
        );

        displayTable(
            "claimedTableBody",
            "claimedEmpty",
            records
        );

    }

    // REFRESH ALL CONTENT
    function refreshDashboard() {

        updateSummary();
        displayAllPurchases();
        displayUnclaimed();
        displayClaimed();

    }

    // SEARCH EVENTS
    document.getElementById("allSearch").addEventListener(
        "input",
        displayAllPurchases
    );

    document.getElementById("unclaimedSearch").addEventListener(
        "input",
        displayUnclaimed
    );

    document.getElementById("claimedSearch").addEventListener(
        "input",
        displayClaimed
    );

    // CLAIM MODAL
    const claimModal = document.getElementById("claimModal");

    let selectedTransaction = null;

    // OPEN CLAIM MODAL
    document.getElementById("unclaimedTableBody").addEventListener(
        "click",
        function (event) {

            const button = event.target.closest(".claim-button");

            if (!button) return;

            selectedTransaction = purchases.find(
                p => p.transactionId === button.dataset.id
            );

            if (!selectedTransaction) return;

            document.getElementById("modalTransaction").textContent =
                selectedTransaction.transactionId;

            document.getElementById("modalStudent").textContent =
                selectedTransaction.studentName;

            document.getElementById("modalItem").textContent =
                selectedTransaction.item;

            claimModal.classList.add("show");

        }
    );

    // CLOSE CLAIM MODAL
    function closeClaimModal() {

        claimModal.classList.remove("show");
        selectedTransaction = null;

    }

    document.getElementById("cancelClaim").addEventListener(
        "click",
        closeClaimModal
    );

    claimModal.addEventListener("click", function (event) {

        if (event.target === claimModal) {
            closeClaimModal();
        }

    });

    // CONFIRM CLAIM
    document.getElementById("confirmClaim").addEventListener(
        "click",
        function () {

            if (!selectedTransaction) return;

            selectedTransaction.status = "Claimed";

            const today = new Date();

            selectedTransaction.claimDate = [
                today.getFullYear(),
                String(today.getMonth() + 1).padStart(2, "0"),
                String(today.getDate()).padStart(2, "0")
            ].join("-");

            closeClaimModal();

            refreshDashboard();

        }
    );

    // INITIAL DISPLAY
    refreshDashboard();

});
