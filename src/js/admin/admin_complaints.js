  document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      window.location.href = "../../index.html";
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/complaints", {
        headers: {
          "Authorization": "Bearer " + token
        }
      });

      const data = await response.json();
      const tbody = document.getElementById("admin-complaints-body");

      tbody.innerHTML = "";

      if (!data.complaints || data.complaints.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="8" style="text-align:center;">
              No complaints found.
            </td>
          </tr>
        `;
        return;
      }

      data.complaints.forEach((complaint) => {

        const formattedDate = new Date(complaint.createdAt)
          .toLocaleDateString("en-GB");

        const row = document.createElement("tr");

        row.style.cursor = "pointer";
        row.addEventListener("click", () => {
          window.location.href =
            `./admin_complaint_detail.html?id=${complaint._id}`;
        });

        row.innerHTML = `
    <td>${complaint._id.slice(-6).toUpperCase()}</td>
    <td>${complaint.category}</td>
    <td>${complaint.title}</td>
    <td>${complaint.student?.name || "N/A"}</td>
    <td>${formattedDate}</td>
    <td>
      <span class="status-badge ${getStatusClass(complaint.status)}">
        ${formatStatusText(complaint.status)}
      </span>
    </td>
    <td>
      <span class="priority-badge priority-${complaint.priority}">
        ${complaint.priority}
      </span>
    </td>
  `;

        tbody.appendChild(row);
      });
    } catch (error) {
      console.error("Error loading complaints:", error);
    }

  });
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