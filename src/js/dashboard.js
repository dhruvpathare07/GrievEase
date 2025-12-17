document.addEventListener('DOMContentLoaded', () => {
    // 1. Element Selectors
    const body = document.body;
    const studentNameElement = document.getElementById('student-name');
    const logoutBtnMobile = document.getElementById('logout-btn-mobile');
    const logoutBtnSidebar = document.getElementById('logout-sidebar-btn');
    
    // Sidebar Theme Elements
    const themeParent = document.getElementById('theme-parent');
    const themeSubmenu = document.getElementById('theme-submenu');
    const themeLightBtn = document.getElementById('theme-light');
    const themeDarkBtn = document.getElementById('theme-dark');

    // 2. Initial Setup (User Name and Theme)
    
    // In a real app, this would be fetched from the session
    const DEFAULT_USER_NAME = 'Welcome, Alex Johnson';
    studentNameElement.textContent = DEFAULT_USER_NAME;
    
    // Load saved theme preference from Local Storage
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    // 3. Theme Sub-Menu Toggle Logic

    themeParent.addEventListener('click', () => {
        themeSubmenu.classList.toggle('visible');
        themeParent.classList.toggle('expanded');
    });

    // 4. Theme Switching Logic

    /**
     * Sets the application theme and saves the preference to local storage.
     * @param {string} mode - 'light' or 'dark'
     */
    function setTheme(mode) {
        if (mode === 'dark') {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }

    themeLightBtn.addEventListener('click', () => setTheme('light'));
    themeDarkBtn.addEventListener('click', () => setTheme('dark'));

    // 5. Logout Functionality

    /**
     * Handles user logout: clears session data and redirects to login page.
     */
    function handleLogout() {
        console.log('User logging out. Redirecting to login page...');
        // In a real application, you would clear localStorage, sessionStorage, and call an API endpoint.
        localStorage.removeItem('theme'); // Clear theme preference on logout for fresh start
        
        // RELATIVE PATH: We are in 'src/js/', and the destination is 'src/templates/index.html'
        window.location.href = '../templates/index.html'; 
    }

    // Attach handler to both logout buttons
    logoutBtnMobile.addEventListener('click', handleLogout);
    logoutBtnSidebar.addEventListener('click', handleLogout);
});