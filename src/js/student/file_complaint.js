document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("complaint-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "../../index.html";
      return;
    }

    const formData = new FormData(form);

    const file = document.getElementById("attachment").files[0];

    // ✅ File size validation (5MB)
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        alert("Complaint submitted successfully!");
        window.location.href = "./my_complaints.html";
      } else {
        alert(data.message || "Submission failed");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }

  });

});