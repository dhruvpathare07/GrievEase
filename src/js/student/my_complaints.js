document.addEventListener("DOMContentLoaded", async () => {

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "../../index.html";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/complaints/my", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    const data = await response.json();

    const tbody = document.getElementById("complaints-body");
    tbody.innerHTML = "";

    if (!data.complaints || data.complaints.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center;">
            No complaints submitted yet.
          </td>
        </tr>
      `;
      return;
    }

data.complaints.forEach((complaint) => {

  const row = document.createElement("tr");
  row.classList.add("clickable-row");

  row.addEventListener("click", () => {
    window.location.href =
      `./track_status.html?id=${complaint._id}`;
  }); 

      const formattedDate = new Date(complaint.createdAt)
        .toLocaleDateString();

      const displayId = complaint.complaintId || complaint._id.slice(-6).toUpperCase();

      row.innerHTML = `
        <td>${displayId}</td>
        <td>${complaint.category}</td>
        <td>${complaint.title}</td>
        <td>${formattedDate}</td>
        <td>
          <span class="status-badge ${complaint.status}">
            ${complaint.status.replace("_", " ")}
          </span>
        </td>
      `;

      tbody.appendChild(row);
    });

  } catch (error) {
    console.error("Error loading complaints:", error);
  }

});