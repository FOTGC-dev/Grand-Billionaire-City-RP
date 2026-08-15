document.addEventListener("DOMContentLoaded", () => {
    async function loadComponent(id, file) {
        const element = document.getElementById(id);
        if (element) {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    element.innerHTML = await response.text();
                    if (id === 'site-header') {
                        initMobileMenu();
                    }
                }
            } catch (error) {
                console.error(`Error loading ${file}:`, error);
            }
        }
    }

    loadComponent('site-header', 'header.html');
    loadComponent('site-footer', 'footer.html');

    initLoader();
    initStatsCounter();
    initBentoSpotlight();
});

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenuBtn.classList.toggle('active');
            mobileDrawer.classList.toggle('open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileDrawer.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }
}

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
            loader.classList.add('fade-out');
            setTimeout(() => { loader.style.display = 'none'; }, 1000);
        }
        progressFill.style.width = `${progress}%`;
        if (progress > 75) loaderStatus.textContent = statuses[3];
        else if (progress > 45) loaderStatus.textContent = statuses[2];
        else if (progress > 20) loaderStatus.textContent = statuses[1];
    }, 80);
}

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.empire-stat-number');
    if (statNumbers.length === 0) return;

    let animated = false;
    const runCounters = () => {
        statNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let current = 0;
            const increment = target / 50;

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
    if (statsStrip) observer.observe(statsStrip);
}

function initBentoSpotlight() {
    const bentoGrid = document.querySelector('.bento-grid');
    if (!bentoGrid) return;

    bentoGrid.addEventListener('mousemove', (e) => {
        const cards = bentoGrid.querySelectorAll('.bento-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });
}
