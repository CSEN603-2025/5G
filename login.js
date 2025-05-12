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
    
    const username = document.getElementById('username').value.trim();
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
    
    // Simulate API call (replace with actual authentication)
    setTimeout(() => {
      // For demo purposes - always succeeds
      window.location.href = 'dashboard.html';
      
      // In real implementation:
      // submitBtn.innerHTML = originalBtnText;
      // submitBtn.disabled = false;
      // if (error) show error message
    }, 1500);
  });
});