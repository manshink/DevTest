// JavaScript for interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Hamburger Menu Functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileHamburgerMenu = document.querySelector('.mobile-hamburger');
    const navigation = document.querySelector('.navigation');
    const body = document.body;
    
    if (hamburgerMenu && navigation) {
        hamburgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navigation.classList.toggle('active');
            if (navigation.classList.contains('active')) {
                body.style.overflow = 'hidden'; // Lock body scroll
            } else {
                body.style.overflow = ''; // Restore body scroll
            }
        });
        
        // Mobile hamburger menu inside navigation (close functionality)
        if (mobileHamburgerMenu) {
            mobileHamburgerMenu.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                navigation.classList.remove('active');
                body.style.overflow = '';
            });
        }
        
        // Close menu when clicking on a menu link
        const menuLinks = document.querySelectorAll('.menu-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                navigation.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburgerMenu.contains(e.target) && !navigation.contains(e.target)) {
                hamburgerMenu.classList.remove('active');
                navigation.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Close menu on window resize (if screen becomes larger)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 767) { // Mobile breakpoint
                hamburgerMenu.classList.remove('active');
                navigation.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.menu-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effects for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(0px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add active state for navigation menu items
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all menu items
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            // Add active class to clicked menu item
            this.classList.add('active');
        });
    });

    // View Projects button animation
    const viewProjectsBtn = document.querySelector('.view-projects-btn');
    const arrowIcon = document.querySelector('.arrow-icon');
    
    if (viewProjectsBtn && arrowIcon) {
        viewProjectsBtn.addEventListener('mouseenter', function() {
            // Add a subtle bounce effect to the arrow
            arrowIcon.style.animation = 'arrowBounce 0.6s ease-in-out';
        });
        
        viewProjectsBtn.addEventListener('mouseleave', function() {
            arrowIcon.style.animation = '';
        });
        
        // Add click functionality
        viewProjectsBtn.addEventListener('click', function() {
            // Add a click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Scroll to projects section (if it exists)
            const projectsSection = document.querySelector('.better-living-section');
            if (projectsSection) {
                projectsSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(button => {
                button.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you would typically filter the projects based on the selected category
            // For now, we'll just show a console message
            console.log('Filter selected:', this.textContent);
        });
    });

    // Pagination functionality
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            console.log('Previous page');
            // Add pagination logic here
        });
        
        nextBtn.addEventListener('click', function() {
            console.log('Next page');
            // Add pagination logic here
        });
    }

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('click', function() {
            // Add project detail navigation here
            console.log('Project clicked:', this.querySelector('h3').textContent);
        });
    });

    // Charity logo hover effects
    const charityLogos = document.querySelectorAll('.charity-logo');
    
    charityLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            // Pause the carousel animation on hover
            const carousel = document.querySelector('.charities-carousel');
            if (carousel) {
                carousel.style.animationPlayState = 'paused';
            }
            this.style.transform = 'scale(1.1)';
        });
        
        logo.addEventListener('mouseleave', function() {
            // Resume the carousel animation
            const carousel = document.querySelector('.charities-carousel');
            if (carousel) {
                carousel.style.animationPlayState = 'running';
            }
            this.style.transform = 'scale(1)';
        });
        
        logo.addEventListener('click', function() {
            // Add charity detail navigation here
            console.log('Charity logo clicked:', this.querySelector('img').alt);
        });
    });

    // Team carousel drag functionality
    const teamCarousel = document.getElementById('teamCarousel');
    const teamContainer = document.querySelector('.team-carousel-container');
    
    if (teamCarousel && teamContainer) {
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID = 0;
        let currentIndex = 0;

        // Touch events
        teamContainer.addEventListener('touchstart', dragStart);
        teamContainer.addEventListener('touchend', dragEnd);
        teamContainer.addEventListener('touchmove', drag);

        // Mouse events
        teamContainer.addEventListener('mousedown', dragStart);
        teamContainer.addEventListener('mouseup', dragEnd);
        teamContainer.addEventListener('mouseleave', dragEnd);
        teamContainer.addEventListener('mousemove', drag);

        // Disable context menu
        teamContainer.addEventListener('contextmenu', e => e.preventDefault());

        function dragStart(event) {
            const clientX = getClientX(event);
            startPos = clientX;
            isDragging = true;
            animationID = requestAnimationFrame(animation);
        }

        function dragEnd() {
            isDragging = false;
            cancelAnimationFrame(animationID);
            prevTranslate = currentTranslate;
        }

        function drag(event) {
            if (isDragging) {
                const clientX = getClientX(event);
                currentTranslate = prevTranslate + clientX - startPos;
            }
        }

        function animation() {
            setTransform(currentTranslate);
            if (isDragging) requestAnimationFrame(animation);
        }

        function setTransform(translate) {
            teamCarousel.style.transform = `translateX(${translate}px)`;
        }

        function getClientX(event) {
            return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
        }
    }

    // Parallax effect for hero background (optional)
    
});
