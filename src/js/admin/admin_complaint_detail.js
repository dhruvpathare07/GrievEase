document.addEventListener("DOMContentLoaded", async () => {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    window.location.href = "../../index.html";
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const complaintId = params.get("id");

  if (!complaintId) {
    alert("No complaint ID provided");
    return;
  }

  let complaintData = null;

  try {
    const response = await fetch(
      `http://localhost:5000/api/complaints/${complaintId}`,
      {
        headers: { Authorization: "Bearer " + token }
      }
    );

    complaintData = await response.json();

    // ===== SUMMARY SECTION =====
    document.querySelector(".summary-header h2").textContent =
      complaintData.title;

    const badge = document.querySelector(".summary-header .badge");
    badge.textContent = formatStatusText(complaintData.status);
    badge.className = `status-badge ${getStatusClass(complaintData.status)}`;

    const values = document.querySelectorAll(".summary-grid .value");

    values[0].textContent =
      complaintData._id.slice(-6).toUpperCase();

    values[1].textContent = complaintData.category;

    values[2].textContent =
      complaintData.student?.name || "N/A";

    values[3].textContent =
      new Date(complaintData.createdAt)
        .toLocaleDateString("en-GB");

    document.querySelector(".description-text").textContent =
      complaintData.description;

    // ===== ATTACHMENT =====
    if (!complaintData.attachment) {
      const attachmentDiv = document.querySelector(".attachment");
      if (attachmentDiv) attachmentDiv.style.display = "none";
    }

    // ===== PREFILL DROPDOWNS =====
    const statusSelect = document.getElementById("status-select");
    statusSelect.value = complaintData.status;

    const prioritySelect = document.getElementById("priority-select");
    prioritySelect.value = complaintData.priority;

    // ===== PREFILL REMARKS =====
    const textareas = document.querySelectorAll("textarea");
    textareas[0].value = complaintData.internalRemarks || "";
    textareas[1].value = complaintData.publicResponse || "";

    // ===== BUILD TIMELINE =====
    buildTimeline(complaintData.statusHistory);

    // ===== SAVE BUTTON =====
    const saveBtn =
      document.querySelector(".action-card .primary-btn");

    saveBtn.addEventListener("click", async () => {

      const updatedStatus = statusSelect.value;
      const updatedPriority = prioritySelect.value;
      const internalRemarks = textareas[0].value;
      const publicResponse = textareas[1].value;

      const updateResponse = await fetch(
        `http://localhost:5000/api/complaints/${complaintId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify({
            status: updatedStatus,
            priority: updatedPriority,
            internalRemarks,
            publicResponse
          })
        }
      );

      if (updateResponse.ok) {
        alert("Complaint updated successfully");
        location.reload();
      } else {
        alert("Update failed");
      }

    });

  } catch (error) {
    console.error("Error loading complaint:", error);
  }

});

function gbuildTimeline(history) {

  const timeline = document.querySelector(".timeline");
  timeline.innerHTML = "";

  if (!history || history.length === 0) return;

  const stageOrder = [
    "submitted",
    "under_review",
    "in_progress",
    "resolved",
    "rejected"
  ];

  // Current final status
  const finalStatus = history[history.length - 1].status;

  // Get index of final status
  const finalIndex = stageOrder.indexOf(finalStatus);

  stageOrder.forEach((stage, index) => {

    const li = document.createElement("li");

    const entry = history.find(h => h.status === stage);

    // ===== COMPLETION LOGIC =====
    if (finalStatus === "rejected") {
      // Stop progression at rejected
      if (index <= finalIndex) {
        li.classList.add("completed");
      }
    } else {
      // Normal progression (submitted → resolved)
      if (index <= finalIndex) {
        li.classList.add("completed");
      }
    }

    // ===== ACTIVE STAGE LOGIC =====
    if (stage === finalStatus &&
        (stage === "under_review" || stage === "in_progress")) {
      li.classList.add("active");
    }

    // ===== ICON LOGIC =====
    let iconClass = "fa-circle";

    if (stage === finalStatus &&
        (stage === "under_review" || stage === "in_progress")) {
      iconClass = "fa-spinner fa-spin";
    }
    else if (index <= finalIndex) {
      iconClass = "fa-check-circle";
    }

    // ===== DATE DISPLAY =====
    let dateHTML = "";

    if (entry) {
      dateHTML = `<span>${new Date(entry.changedAt)
        .toLocaleDateString("en-GB")}</span>`;
    }

    li.innerHTML = `
      <i class="fas ${iconClass}"></i>
      <div>
        <strong>${formatStatusText(stage)}</strong>
        ${dateHTML}
      </div>
    `;

    timeline.appendChild(li);
  });
}
function formatStatusText(status) {
  return status
    .replace("_", " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

function getStatusClass(status) {
  switch (status) {
    case "submitted":
      return "badge-submitted";
    case "under_review":
      return "badge-review";
    case "in_progress":
      return "badge-progress";
    case "resolved":
      return "badge-resolved";
    case "rejected":
      return "badge-rejected";
    default:
      return "";
  }
}