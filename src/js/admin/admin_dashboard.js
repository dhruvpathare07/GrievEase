function animateCount(element, target) {

    let current = 0;
    const increment = Math.ceil(target / 150);

    const interval = setInterval(() => {
        current += increment;

        if (current >= target) {
            element.textContent = target;
            clearInterval(interval);
        } else {
            element.textContent = current;
        }

    }, 30);
}

let lineChart;
let barChart;
let allComplaints = [];

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

        allComplaints = complaints;

        let review = 0;
        let progress = 0;
        let resolved = 0;
        let rejected = 0;

        let academic = 0;
        let infrastructure = 0;
        let hostel = 0;
        let other = 0;

        complaints.forEach(c => {

            if (c.status === "under_review") review++;
            if (c.status === "in_progress") progress++;
            if (c.status === "resolved") resolved++;
            if (c.status === "rejected") rejected++;

            if (c.category === "academic") academic++;
            if (c.category === "infrastructure") infrastructure++;
            if (c.category === "hostel") hostel++;
            if (c.category === "other") other++;

        });

        // ===== ANIMATION =====
        animateCount(document.getElementById("totalComplaints"), complaints.length);
        animateCount(document.getElementById("reviewComplaints"), review);
        animateCount(document.getElementById("progressComplaints"), progress);
        animateCount(document.getElementById("resolvedComplaints"), resolved);
        animateCount(document.getElementById("rejectedComplaints"), rejected);

        // ===== CATEGORY COUNTS =====
        document.getElementById("academicCount").textContent = academic;
        document.getElementById("infrastructureCount").textContent = infrastructure;
        document.getElementById("hostelCount").textContent = hostel;
        document.getElementById("otherCount").textContent = other;

        // ===== CHARTS =====
        renderBarChart(review, progress, resolved, rejected);
        renderLineChart(7);

    } catch (err) {
        console.error("Dashboard error:", err);
    }

});


// ================= BAR CHART =================
function renderBarChart(review, progress, resolved, rejected) {

    const ctx = document.getElementById("complaintChart").getContext("2d");

    if (barChart) barChart.destroy();

    barChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Under Review", "In Progress", "Resolved", "Rejected"],
            datasets: [{
                data: [review, progress, resolved, rejected],
                backgroundColor: [
                    "#3B82F6",
                    "#F59E0B",
                    "#10B981",
                    "#EF4444"
                ],
                borderRadius: 10
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}


// ================= LINE CHART =================
function renderLineChart(days = 7) {

    const filtered = filterDataByDays(days);
    const labels = generateTimeLabels(days);

    const map = {};

    labels.forEach(label => {
        map[label] = {
            academic: 0,
            infrastructure: 0,
            hostel: 0,
            other: 0
        };
    });

    filtered.forEach(c => {

        const date = new Date(c.createdAt);

        let key;

        if (days === 1) {
            key = date.getHours() + ":00";
        } else {
            key =
                String(date.getDate()).padStart(2, "0") + "/" +
                String(date.getMonth() + 1).padStart(2, "0") + "/" +
                date.getFullYear();
        }

        if (map[key]) {
            map[key][c.category]++;
        }

    });

    const academic = [];
    const infrastructure = [];
    const hostel = [];
    const other = [];

    labels.forEach(label => {
        academic.push(map[label].academic);
        infrastructure.push(map[label].infrastructure);
        hostel.push(map[label].hostel);
        other.push(map[label].other);
    });

    const ctx = document.getElementById("categoryLineChart").getContext("2d");

    if (lineChart) lineChart.destroy();

    const gradientBlue = ctx.createLinearGradient(0, 0, 0, 300);
    gradientBlue.addColorStop(0, "rgba(37,99,235,0.4)");
    gradientBlue.addColorStop(1, "rgba(37,99,235,0)");

    const gradientRed = ctx.createLinearGradient(0, 0, 0, 300);
    gradientRed.addColorStop(0, "rgba(239,68,68,0.4)");
    gradientRed.addColorStop(1, "rgba(239,68,68,0)");

    const gradientAmber = ctx.createLinearGradient(0, 0, 0, 300);
    gradientAmber.addColorStop(0, "rgba(245,158,11,0.4)");
    gradientAmber.addColorStop(1, "rgba(245,158,11,0)");

    const gradientGreen = ctx.createLinearGradient(0, 0, 0, 300);
    gradientGreen.addColorStop(0, "rgba(34,197,94,0.4)");
    gradientGreen.addColorStop(1, "rgba(34,197,94,0)");

    lineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Academic",
                    data: academic,
                    borderColor: "#2563EB",
                    backgroundColor: gradientBlue,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    borderWidth: 2
                    
                },
                {
                    label: "Infrastructure",
                    data: infrastructure,
                    borderColor: "#EF4444",
                    backgroundColor: gradientRed,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 4,
                    borderWidth: 4
                },
                {
                    label: "Hostel",
                    data: hostel,
                    borderColor: "#F59E0B",
                    backgroundColor: gradientAmber,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 2,
                    borderWidth: 3
                },
                {
                    label: "Other",
                    data: other,
                    borderColor: "#16A34A",
                    backgroundColor: gradientGreen,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 3,
                    borderWidth: 5
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: "index",
                intersect: false
            }
        }
    });
}


// ================= HELPERS =================
function filterDataByDays(days) {

    const now = new Date();
    const past = new Date(now);

    past.setHours(now.getHours() - (days * 24));

    return allComplaints.filter(c => {
        const date = new Date(c.createdAt);
        return date >= past && date <= now;
    });
}

function generateTimeLabels(days) {

    const labels = [];
    const now = new Date();

    if (days === 1) {
        for (let i = 23; i >= 0; i--) {
            const d = new Date(now);
            d.setHours(now.getHours() - i);
            labels.push(d.getHours() + ":00");
        }
    } else {
        for (let i = days - 1; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(now.getDate() - i);

            labels.push(
                String(d.getDate()).padStart(2, "0") + "/" +
                String(d.getMonth() + 1).padStart(2, "0") + "/" +
                d.getFullYear()
            );
        }
    }

    return labels;
}


// ================= RANGE BUTTON =================
document.querySelectorAll(".range-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelectorAll(".range-btn")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        const days = parseInt(btn.dataset.range);
        renderLineChart(days);

    });

});