document.addEventListener('DOMContentLoaded', function() {
    const roleCards = document.querySelectorAll('.role-card');
    
    roleCards.forEach(card => {
        card.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            
            // Add cute loading effect
            this.style.transform = 'scale(0.95)';
            this.style.backgroundColor = '#D4F1F4';
            
            // Store role for login page
            sessionStorage.setItem('selectedRole', role);
            
            // Redirect with slight delay for better UX
            setTimeout(() => {
                window.location.href = `login.html?role=${role}`;
            }, 300);
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.style.backgroundColor) {
                this.style.transform = '';
            }
        });
    });
});