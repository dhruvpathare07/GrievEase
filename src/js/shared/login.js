document.addEventListener('DOMContentLoaded', () => {
    // 1. Get DOM Elements
    const loginForm = document.getElementById('login-form');
    const studentBtn = document.getElementById('student-btn');
    const adminBtn = document.getElementById('admin-btn');
    const usernameInput = document.getElementById('username');

    // 2. Toggle Functionality
    
    /**
     * Toggles the active state of the login buttons and updates the username
     * input placeholder text for clarity.
     * @param {string} type - 'student' or 'admin'
     */
    function setActiveLogin(type) {
        if (type === 'student') {
            // Activate Student Button
            studentBtn.classList.add('active');
            adminBtn.classList.remove('active');
            // Update Placeholder
            usernameInput.placeholder = 'Student ID or Email';
        } else {
            // Activate Admin Button
            adminBtn.classList.add('active');
            studentBtn.classList.remove('active');
            // Update Placeholder
            usernameInput.placeholder = 'Admin Username or Email';
        }
    }

    // Set up listeners for the toggle buttons
    studentBtn.addEventListener('click', () => setActiveLogin('student'));
    adminBtn.addEventListener('click', () => setActiveLogin('admin'));

    // Initialize the page state to Student Login on load
    setActiveLogin('student');

    // 3. Form Submission and Navigation Bypass
    
    loginForm.addEventListener('submit', (event) => {
        // Prevent default form submission (page refresh)
        event.preventDefault(); 

        const loginType = studentBtn.classList.contains('active') ? 'Student' : 'Admin';
        const username = usernameInput.value;
        const password = document.getElementById('password').value;

        // Basic client-side validation to ensure fields aren't empty
        if (!username || !password) {
            console.error('Login failed: Please enter both username/ID and password.');
            alert('Please enter both your ID/Email and Password.');
            return; 
        }

        // Log the login attempt (simulated server interaction)
        console.log(`--- Simulated Login Attempt ---`);
        console.log(`Login Type: ${loginType}`);
        console.log(`Username: ${username}`);
        fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: username,   // your input allows email
              password: password
            })
          })
            .then(res => res.json())
            .then(data => {
              if (data.token) {
                // ✅ Store token
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
          
                // ✅ Redirect based on role
                if (data.role === "admin") {
                  window.location.href = "./templates/admin/admin_complaints.html";
                } else {
                  window.location.href = "./templates/student/student_dashboard.html";
                }
              } else {
                alert(data.message || "Login failed");
              }
            })
            .catch(err => {
              console.error(err);
              alert("Server error. Please try again.");
            });          
        // Note: For a real Admin login, you would redirect to a separate admin page.
        // For simplicity, both are redirecting to the main dashboard for now.
    });
    // ===== LOGIN ↔ REGISTER TOGGLE =====
const loginFormEl = document.getElementById('login-form');
const registerFormEl = document.getElementById('register-form');
const registerLink = document.getElementById('create-account-link');
const backToLoginLink = document.getElementById('back-to-login');

// Show Register Form
if (registerLink) {
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // 🔥 IMPORTANT

        loginFormEl.classList.add('hidden');
        registerFormEl.classList.remove('hidden');

        // Force student mode
        studentBtn.classList.add('active');
        adminBtn.classList.remove('active');
        usernameInput.placeholder = 'Student ID or Email';
    });
}


// Back to Login
if (backToLoginLink) {
    backToLoginLink.addEventListener('click', (e) => {
        e.preventDefault();

        registerFormEl.classList.add('hidden');
        loginFormEl.classList.remove('hidden');
    });
}

});
// ===== REGISTER FORM SUBMIT =====
const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm-password").value;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Send data to backend
    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        role: "student"
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.userId) {
          alert("Registration successful! Please login.");

          // Switch back to login form
          registerForm.classList.add("hidden");
          loginFormEl.classList.remove("hidden");

          registerForm.reset();
        } else {
          alert(data.message || "Registration failed.");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Server error. Please try again.");
      });
  });
}