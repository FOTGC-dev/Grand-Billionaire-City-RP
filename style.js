// Cinematic Loader Handler
window.addEventListener('load', () => {
    const loader = document.getElementById('empire-loader');
    const progress = document.getElementById('loaderProgress');
    const status = document.getElementById('loaderStatus');
    
    let width = 0;
    const interval = setInterval(() => {
        width += Math.floor(Math.random() * 18) + 6;
        if (width >= 100) {
            width = 100;
            clearInterval(interval);
            status.textContent = "Supremacy Achieved.";
            setTimeout(() => {
                loader.classList.add('fade-out');
            }, 350);
        }
        progress.style.width = width + '%';
        if(width > 50) status.textContent = "Calibrating Fluid Dynamics...";
    }, 80);
});

// Mobile Menu Drawer Handler
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileDrawer.classList.toggle('open');
    document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// Mouse-following Spotlight Effect for Bento Cards
const bentoCards = document.querySelectorAll('.bento-card');
bentoCards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Counter Animation for Stats
const observerOptions = {
    threshold: 0.4
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.empire-stat-number');
            statNumbers.forEach(num => {
                const target = +num.getAttribute('data-target');
                let count = 0;
                const speed = target / 40;
                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        num.innerText = Math.ceil(count).toLocaleString() + '+';
                        setTimeout(updateCount, 25);
                    } else {
                        num.innerText = target.toLocaleString() + '+';
                    }
                };
                updateCount();
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.getElementById('stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Simulated Live Player Counter Fluctuation
setInterval(() => {
    const counterEl = document.getElementById('playerCounter');
    if(counterEl) {
        const basePlayers = 840;
        const fluctuation = Math.floor(Math.random() * 15) - 7;
        counterEl.innerText = `${basePlayers + fluctuation} Online`;
    }
}, 6000);
