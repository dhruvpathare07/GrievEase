document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("complaint-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "../../index.html";
      return;
    }

    const category = document.getElementById("category").value;
    const title = document.getElementById("subject").value;
    const description = document.getElementById("description").value;

    if (!category || !title || !description) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          title: title,
          description: description,
          category: category
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Complaint submitted successfully!");
        window.location.href = "./my_complaints.html";
      } else {
        alert(data.message || "Submission failed");
      }

    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Server error. Try again later.");
    }

  });

});