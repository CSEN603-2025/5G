document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const backButton = document.getElementById('backButton');
  const loginForm = document.getElementById('loginForm');
  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');
  const passwordIcon = togglePassword.querySelector('i');
  
  // Back button functionality
  backButton.addEventListener('click', function() {
    window.location.href = 'welcome.html';
  });

  // Password toggle functionality
  togglePassword.addEventListener('click', function() {
    const isPasswordVisible = passwordInput.type === 'text';
    
    // Toggle input type
    passwordInput.type = isPasswordVisible ? 'password' : 'text';
    
    // Toggle eye icon
    passwordIcon.classList.toggle('fa-eye-slash');
    passwordIcon.classList.toggle('fa-eye');
    
    // Update aria-label for accessibility
    const action = isPasswordVisible ? 'Show' : 'Hide';
    togglePassword.setAttribute('aria-label', `${action} password`);
  });
  
  // Form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.btn-login');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating';
    submitBtn.disabled = true;
    
    // Dummy credentials with roles
    const users = {
      "scadadmin": { password: "scad123", role: "scad" },
      "companyuser": { password: "comp456", role: "company" },
      "student1": { password: "stud123", role: "student1" },
      "student2": { password: "stud456", role: "student2" },
      "facultym": { password: "facultym123", role: "facultym" }
    };

    const user = users[username];

    // Simulate API call delay
    setTimeout(() => {
      if (user && user.password === password) {
        switch (user.role) {
          case "scad":
            window.location.href = "SCAD.html";
            break;
          case "company":
            window.location.href = "company.html";
            break;
          case "student1":
            window.location.href = "pro-student2.html";
            break;
          case "student2":
            window.location.href = "PROSTUDENT.html";
            break;
          case "facultym":
            window.location.href = "FacultyMember.html";
            break;
          default:
            alert('Invalid credentials');
        }
      } else {
        alert('Invalid username or password');
      }
      
      // Reset button state
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }, 1000);
  });
});