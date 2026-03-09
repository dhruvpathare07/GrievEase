document.addEventListener("DOMContentLoaded", async () => {

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token || role !== "admin") {
    window.location.href = "../../index.html";
    return;
}

try {

    const res = await fetch("http://localhost:5000/api/complaints", {
        headers: {
            Authorization: "Bearer " + token
        }
    });

    const data = await res.json();
    const complaints = data.complaints || [];

    let pending = 0;
    let progress = 0;
    let resolved = 0;

    complaints.forEach(c => {

        if (c.status === "submitted" || c.status === "under_review") {
            pending++;
        }

        if (c.status === "in_progress") {
            progress++;
        }

        if (c.status === "resolved") {
            resolved++;
        }

    });

    document.getElementById("totalComplaints").textContent = complaints.length;
    document.getElementById("pendingComplaints").textContent = pending;
    document.getElementById("progressComplaints").textContent = progress;
    document.getElementById("resolvedComplaints").textContent = resolved;

} catch (err) {

    console.error("Dashboard error:", err);

}

});