document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;

    // ===== OPTIONAL ELEMENTS (SAFE SELECTION) =====
    const studentNameElement = document.getElementById('student-name');
    const logoutBtnMobile = document.getElementById('logout-btn-mobile');
    const logoutBtnSidebar = document.getElementById('logout-sidebar-btn');

    const themeParent = document.getElementById('theme-parent');
    const themeSubmenu = document.getElementById('theme-submenu');
    const themeLightBtn = document.getElementById('theme-light');
    const themeDarkBtn = document.getElementById('theme-dark');

    // ===== USER NAME (ONLY IF PRESENT) =====
    if (studentNameElement) {
        studentNameElement.textContent = 'Welcome, Alex Johnson';
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
        localStorage.removeItem('theme');
        window.location.href = '../../index.html';
    }

    if (logoutBtnMobile) {
        logoutBtnMobile.addEventListener('click', handleLogout);
    }

    if (logoutBtnSidebar) {
        logoutBtnSidebar.addEventListener('click', handleLogout);
    }

});
