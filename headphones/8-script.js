// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle body overflow to prevent scrolling when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Close mobile menu when clicking a link
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key press
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate the scroll position (accounting for fixed navbar)
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact Form Functionality (simplified for this task)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const messageInput = contactForm.querySelector('#message');
        const charCount = document.getElementById('charCount');
        
        // Character counter for message textarea
        if (messageInput && charCount) {
            messageInput.addEventListener('input', function() {
                const length = this.value.length;
                charCount.textContent = length;
                
                // Change color based on length
                if (length > 450) {
                    charCount.style.color = '#ff6565';
                } else if (length > 400) {
                    charCount.style.color = '#ffa500';
                } else {
                    charCount.style.color = '#071629';
                }
            });
        }
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const submitButton = contactForm.querySelector('.submit-button');
            
            // Simple validation
            let isValid = true;
            
            // Reset errors
            document.querySelectorAll('.form-error').forEach(error => {
                error.textContent = '';
            });
            
            // Validate name
            if (!nameInput.value.trim()) {
                document.getElementById('nameError').textContent = 'Name is required';
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                document.getElementById('emailError').textContent = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                document.getElementById('messageError').textContent = 'Message is required';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                submitButton.classList.add('loading');
                
                // Simulate form submission
                setTimeout(() => {
                    // Hide loading state
                    submitButton.classList.remove('loading');
                    
                    // Show success message (you could add a success message div)
                    alert('Thank you! Your message has been sent successfully.');
                    
                    // Reset form
                    contactForm.reset();
                    if (charCount) charCount.textContent = '0';
                }, 1500);
            } else {
                // Scroll to first error
                const firstError = contactForm.querySelector('.form-error:not(:empty)');
                if (firstError) {
                    const inputId = firstError.id.replace('Error', '');
                    const inputElement = document.getElementById(inputId);
                    if (inputElement) {
                        inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        inputElement.focus();
                    }
                }
            }
        });
    }
    
    // Add scroll effect to navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class based on scroll position
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add scrolled styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .navbar.scrolled {
            background-color: rgba(7, 22, 41, 0.98) !important;
            box-shadow: 0 0.125rem 1rem rgba(0, 0, 0, 0.1);
        }
        
        .navbar {
            transition: transform 0.3s ease, background-color 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});
