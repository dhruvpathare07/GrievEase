// 🔐 AUTH GUARD — Protect Dashboard Pages
(function () {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    window.location.href = "../../index.html";
    return;
  }

  const path = window.location.pathname;

  // 🚫 Block students from admin pages
  if (path.includes("/admin/") && role !== "admin") {
    alert("Access denied. Admins only.");
    window.location.href = "../student/student_dashboard.html";
  }

  // 🚫 Block admins from student pages
  if (path.includes("/student/") && role !== "student") {
    window.location.href = "../admin/admin_dashboard.html";
  }

})();
document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;

    // ===== OPTIONAL ELEMENTS (SAFE SELECTION) =====
    const studentNameElement = document.getElementById('student-name');
    const avatarElement = document.getElementById('user-avatar');
    const logoutBtnMobile = document.getElementById('logout-btn-mobile');
    const logoutBtnSidebar = document.getElementById('logout-sidebar-btn');

    const themeParent = document.getElementById('theme-parent');
    const themeSubmenu = document.getElementById('theme-submenu');
    const themeLightBtn = document.getElementById('theme-light');
    const themeDarkBtn = document.getElementById('theme-dark');

    // ===== USER NAME (ONLY IF PRESENT) =====
  if (studentNameElement) {

    let name = localStorage.getItem("studentName");

    if (name) {

        const firstName = name.split(" ")[0];
        const formattedName =
            firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

        studentNameElement.textContent = `Welcome,  ${formattedName}`;

        // Avatar first letter
        if (avatarElement) {
            avatarElement.textContent = formattedName.charAt(0);
        }

    } else {

        studentNameElement.textContent = "Welcome";

    }
}

    // ===== LOAD SAVED THEME =====
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    // ===== THEME MENU TOGGLE =====
    if (themeParent && themeSubmenu) {
        themeParent.addEventListener('click', () => {
            themeSubmenu.classList.toggle('visible');
            themeParent.classList.toggle('expanded');
        });
    }

    // ===== THEME SWITCHING =====
    function setTheme(mode) {
        if (mode === 'dark') {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }

    if (themeLightBtn) {
        themeLightBtn.addEventListener('click', () => setTheme('light'));
    }

    if (themeDarkBtn) {
        themeDarkBtn.addEventListener('click', () => setTheme('dark'));
    }

    // ===== LOGOUT HANDLER =====
function handleLogout() {

  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("studentName");
  localStorage.removeItem("theme");

  window.location.href = "../../index.html";
}

    if (logoutBtnMobile) {
        logoutBtnMobile.addEventListener('click', handleLogout);
    }

    if (logoutBtnSidebar) {
        logoutBtnSidebar.addEventListener('click', handleLogout);
    }

});
