document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate');
    animatedElements.forEach(el => observer.observe(el));

    // --- Form Handling ---
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            // In a real application, you would send form data to a server here.
            // For now, we'll just simulate a successful submission.
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'none';
                formSuccess.classList.remove('hidden');
                
                // Reset form visibility after a few seconds (optional for good UX demo)
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                    contactForm.style.display = 'block';
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 5000);
            }, 1500);
        });
    }

    // --- Dark Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const iconSun = document.querySelector('.icon-sun');
    const iconMoon = document.querySelector('.icon-moon');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        iconSun.classList.add('hidden');
        iconMoon.classList.remove('hidden');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                iconSun.classList.remove('hidden');
                iconMoon.classList.add('hidden');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                iconSun.classList.add('hidden');
                iconMoon.classList.remove('hidden');
            }
        });
    }

    // --- Pricing Calculator ---
    const pageCountSlider = document.getElementById('page-count');
    const pageDisplay = document.getElementById('page-display');
    const calcSeo = document.getElementById('calc-seo');
    const calcCms = document.getElementById('calc-cms');
    const calcEcommerce = document.getElementById('calc-ecommerce');
    const totalCostDisplay = document.getElementById('total-cost');
    const messageInput = document.getElementById('message');
    const bookCalculatorBtn = document.getElementById('book-calculator-btn');

    function calculateTotal() {
        const pages = parseInt(pageCountSlider.value);
        let baseCost = 1000;
        let extraPagesCost = (pages > 1) ? (pages - 1) * 500 : 0;
        
        let addonsCost = 0;
        if (calcSeo.checked) addonsCost += parseInt(calcSeo.value);
        if (calcCms.checked) addonsCost += parseInt(calcCms.value);
        if (calcEcommerce.checked) addonsCost += parseInt(calcEcommerce.value);

        const total = baseCost + extraPagesCost + addonsCost;
        totalCostDisplay.textContent = total;
        pageDisplay.textContent = pages;
    }

    if (pageCountSlider) {
        pageCountSlider.addEventListener('input', calculateTotal);
        calcSeo.addEventListener('change', calculateTotal);
        calcCms.addEventListener('change', calculateTotal);
        calcEcommerce.addEventListener('change', calculateTotal);
        
        // Auto-fill form when booking via calculator
        if (bookCalculatorBtn) {
            bookCalculatorBtn.addEventListener('click', () => {
                const total = totalCostDisplay.textContent;
                messageInput.value = `Hi, I'm interested in a ${pageCountSlider.value}-page website. \nSelected Add-ons: \n- SEO: ${calcSeo.checked ? 'Yes' : 'No'} \n- CMS: ${calcCms.checked ? 'Yes' : 'No'} \n- E-commerce: ${calcEcommerce.checked ? 'Yes' : 'No'} \nEstimated Budget: ₹${total}`;
            });
        }
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all items
            faqItems.forEach(faq => faq.classList.remove('active'));
            // Open clicked item if it wasn't already open
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

});
