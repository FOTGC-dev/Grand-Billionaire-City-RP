// --- 1. DYNAMIC COMPONENT LOADER (HEADER & FOOTER) ---
document.addEventListener("DOMContentLoaded", () => {
    async function loadComponent(id, file) {
        const element = document.getElementById(id);
        if (element) {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    element.innerHTML = await response.text();
                    
                    // Re-bind interactive header elements once injected
                    if (id === 'site-header') {
                        initMobileMenu();
                    }
                } else {
                    console.error(`Failed to load ${file}: Status ${response.status}`);
                }
            } catch (error) {
                console.error(`Network or parsing error loading ${file}:`, error);
            }
        }
    }

    // Trigger template injections
    loadComponent('site-header', 'header.html');
    loadComponent('site-footer', 'footer.html');

    // Initialize remaining page features
    initLoader();
    initStatsCounter();
    initBentoSpotlight();
});


// --- 2. MOBILE MENU INTERACTIVITY ---
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileDrawer) {
        // Toggle mobile drawer state
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenuBtn.classList.toggle('active');
            mobileDrawer.classList.toggle('open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close drawer automatically when a navigation link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileDrawer.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }
}


// --- 3. CINEMATIC LOADER SCREEN ---
function initLoader() {
    const loader = document.getElementById('empire-loader');
    const progressFill = document.getElementById('loaderProgress');
    const loaderStatus = document.getElementById('loaderStatus');

    if (!loader || !progressFill || !loaderStatus) return;

    const statuses = [
        "Initializing Crimson Atmosphere...",
        "Calibrating Sovereign Factions...",
        "Securing Economic Protocols...",
        "Welcome to the Empire."
    ];

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 12) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Fade out loader smoothly
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 1000);
        }

        progressFill.style.width = `${progress}%`;

        // Update loading status text incrementally
        if (progress > 75) {
            loaderStatus.textContent = statuses[3];
        } else if (progress > 45) {
            loaderStatus.textContent = statuses[2];
        } else if (progress > 20) {
            loaderStatus.textContent = statuses[1];
        }
    }, 80);
}


// --- 4. ANIMATED STATS COUNTER ---
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.empire-stat-number');
    if (statNumbers.length === 0) return;

    let animated = false;

    const runCounters = () => {
        statNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let current = 0;
            const increment = target / 50; // Speed adjustment factor

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = `${Math.ceil(current)}+`;
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = `${target}+`;
                }
            };
            updateCount();
        });
    };

    // Trigger counter animation using Intersection Observer when visible
    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                runCounters();
                observerInstance.disconnect();
            }
        });
    }, { threshold: 0.3 });

    const statsStrip = document.querySelector('.stats-strip');
    if (statsStrip) {
        observer.observe(statsStrip);
    }
}


// --- 5. BENTO CARD MOUSE SPOTLIGHT EFFECT ---
function initBentoSpotlight() {
    const bentoGrid = document.querySelector('.bento-grid');
    if (!bentoGrid) return;

    bentoGrid.addEventListener('mousemove', (e) => {
        const cards = bentoGrid.querySelectorAll('.bento-card');
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Apply CSS variables dynamically for radial spotlight tracking
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}
