document.addEventListener("DOMContentLoaded", async () => {

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "../../index.html";
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const complaintId = params.get("id");

  if (!complaintId) {
    alert("Complaint ID missing");
    return;
  }

  try {

    const response = await fetch(
      `http://localhost:5000/api/complaints/${complaintId}`,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    const complaint = await response.json();

    /* ===== SUMMARY ===== */

    const values = document.querySelectorAll(".summary-grid .value");

    values[0].textContent = complaint._id.slice(-6).toUpperCase();
    values[1].textContent = complaint.category;
    values[2].textContent = complaint.title;
    values[3].textContent =
      new Date(complaint.createdAt).toLocaleDateString("en-GB");

    /* ===== STATUS BADGE ===== */

    const badge = document.querySelector(".status-badge");
    badge.textContent = formatStatus(complaint.status);
    badge.className = `status-badge ${complaint.status}`;

    /* ===== PUBLIC RESPONSE ===== */

    const remarks = document.querySelector(".remarks-card p");

    if (complaint.publicResponse && complaint.publicResponse.trim() !== "") {
      remarks.textContent = complaint.publicResponse;
    } else {
      remarks.textContent = "No update from authority yet.";
    }

    /* ===== TIMELINE ===== */

    buildTimeline(complaint.statusHistory);

  } catch (error) {

    console.error("Error loading complaint:", error);
    alert("Failed to load complaint");

  }

});


/* ===== BUILD TIMELINE ===== */

function buildTimeline(history) {

  const timeline = document.getElementById("timeline");
  timeline.innerHTML = "";

  const stages = [
    "submitted",
    "under_review",
    "in_progress",
    "resolved",
    "rejected"
  ];

  if (!history || history.length === 0) return;

  const finalStatus = history[history.length - 1].status;
  const finalIndex = stages.indexOf(finalStatus);

  stages.forEach((stage, index) => {

    const li = document.createElement("li");
    const entry = history.find(h => h.status === stage);

    let icon = "fa-circle";
    let className = "pending";

    if (index < finalIndex) {
      icon = "fa-check-circle";
      className = "completed";
    }

    if (index === finalIndex) {

      if (stage === "under_review" || stage === "in_progress") {
        icon = "fa-spinner";
        className = "active";
      } else {
        icon = "fa-check-circle";
        className = "completed";
      }
    }

    li.classList.add(className);

    li.innerHTML = `
      <i class="fas ${icon}"></i>
      <div>
        <strong>${formatStatus(stage)}</strong>
        ${entry ? `<span>${new Date(entry.changedAt).toLocaleDateString("en-GB")}</span>` : ""}
      </div>
    `;

    timeline.appendChild(li);

  });

}


/* ===== FORMAT STATUS ===== */

function formatStatus(status) {
  return status
    .replace("_", " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}