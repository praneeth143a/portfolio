document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Prevent body scrolling when menu is open
            body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Dark Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Change icon based on theme
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            const icon = themeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    // Skills Tabs
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillContents = document.querySelectorAll('.skills-tab-content');
    
    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Skip if it's a certificate tab (those are handled separately)
            if (tab.classList.contains('cert-tab')) return;
            
            // Remove active class from all tabs and contents
            document.querySelectorAll('.skill-tab:not(.cert-tab)').forEach(t => t.classList.remove('active'));
            skillContents.forEach(c => {
                if (!c.classList.contains('cert-content')) {
                    c.classList.remove('active');
                }
            });
            
            // Add active class to current tab
            tab.classList.add('active');
            
            // Show corresponding content
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}-skills`).classList.add('active');
        });
    });
    
    // Certificate Tabs on main page
    const certTabs = document.querySelectorAll('.cert-tab');
    
    certTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all certificate tabs
            certTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Get certificate type
            const certType = tab.getAttribute('data-cert');
            
            // Update view all link to pre-filter the certificates page
            const viewAllBox = document.querySelector('.top-option-box');
            if (viewAllBox) {
                const baseUrl = 'certificates.html';
                viewAllBox.setAttribute('onclick', `window.open('${baseUrl}?filter=${certType}', '_blank')`);
            }
            
            // Update displayed certificates based on selected category
            const certContent = document.querySelector('.cert-content');
            if (certContent) {
                const skillBarContainer = certContent.querySelector('.skill-bar-container');
                
                // Clear current certificate skill bars
                skillBarContainer.innerHTML = '';
                
                // Add new certificate skill bars based on selected category
                if (certType === 'programming') {
                    skillBarContainer.innerHTML = `
                        <div class="skill-bar cert-skill-bar">
                            <div class="skill-name">Python</div>
                        </div>
                        <div class="skill-bar cert-skill-bar">
                            <div class="skill-name">Java</div>
                        </div>
                        <div class="skill-bar cert-skill-bar">
                            <div class="skill-name">Data Structures</div>
                        </div>
                    `;
                } else if (certType === 'webdev') {
                    skillBarContainer.innerHTML = `
                        <div class="skill-bar cert-skill-bar">
                            <div class="skill-name">HTML5</div>
                        </div>
                        <div class="skill-bar cert-skill-bar">
                            <div class="skill-name">CSS3</div>
                        </div>
                        <div class="skill-bar cert-skill-bar">
                            <div class="skill-name">JavaScript</div>
                        </div>
                        <div class="skill-bar cert-skill-bar">
                            <div class="skill-name">Responsive Design</div>
                        </div>
                    `;
                }
                
                // Make all certificate bars clickable
                document.querySelectorAll('.cert-skill-bar').forEach(bar => {
                    bar.addEventListener('click', function() {
                        window.open('certificates.html?filter=' + certType, '_blank');
                    });
                    bar.style.cursor = 'pointer';
                });
            }
        });
    });
    
    // Make certificate skill bars clickable on page load
    document.querySelectorAll('.cert-skill-bar').forEach(bar => {
        bar.addEventListener('click', function() {
            window.open('certificates.html?filter=programming', '_blank');
        });
        bar.style.cursor = 'pointer';
    });
    
    // Check URL parameters on certificates page for filtering
    if (window.location.pathname.includes('certificates.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');
        
        if (filterParam) {
            // Find the matching certificate option and click it
            const matchingOption = document.querySelector(`.cert-option[data-cert="${filterParam}"]`);
            if (matchingOption) {
                matchingOption.click();
            }
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            // Skip if the section doesn't exist (like certifications or achievements)
            if (!document.querySelector(targetId)) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server using fetch or Ajax
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message (in a real app, do this after successful submission)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Typewriter effect for hero section
    initTypewriter();

    // Certificate filtering - technical certificates only
    const certOptions = document.querySelectorAll('.cert-option');
    const certItems = document.querySelectorAll('.cert-item');
    
    certOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            certOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Get the selected certificate type
            const certType = this.getAttribute('data-cert');
            
            // Show all or filter by type
            certItems.forEach(item => {
                if (certType === 'all') {
                    item.style.display = 'flex';
                } else {
                    item.style.display = item.getAttribute('data-cert-type') === certType ? 'flex' : 'none';
                }
            });
        });
    });

    // Handle certificate page direct navigation
    document.querySelectorAll('.top-option-box').forEach(box => {
        box.addEventListener('click', function() {
            const targetPage = this.getAttribute('onclick');
            if (targetPage) {
                const pageUrl = targetPage.split("'")[1]; // Extract URL from onclick attribute
                window.open(pageUrl, '_blank');
            }
        });
    });

    // Certificate view links
    document.querySelectorAll('.view-certificate').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // This would normally open a modal or link to the actual certificate
            alert('Certificate viewing functionality will be implemented soon.');
        });
    });

    // Handle simple skill tabs in certificates section
    const skillTabsSimple = document.querySelectorAll('.skill-tab-simple');
    
    skillTabsSimple.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            skillTabsSimple.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
        });
    });

    // Handle simple certificate options
    const certSimpleOptions = document.querySelectorAll('.cert-simple-option');
    
    certSimpleOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            certSimpleOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
        });
    });
});

// Typewriter effect for hero section
function initTypewriter() {
    const typedTextSpan = document.querySelector('.typed-text');
    if (!typedTextSpan) return;
    
    const textArray = ['B.Tech Student', 'EEE Enthusiast', 'Java Developer', 'Problem Solver'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            // Delay before starting erasing
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            // Next text
            textArrayIndex++;
            // If at the end of the text array, start over
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            // Start typing again
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    // Start the typing effect
    if (textArray.length) setTimeout(type, newTextDelay + 250);
}

// Add an event listener for the scroll to implement sticky navigation
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
}); 