// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Background music control
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.querySelector('.music-icon');
let musicPlaying = false;

// Toggle music on button click
musicToggle.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicIcon.textContent = '🔇';
        musicToggle.classList.add('paused');
        musicPlaying = false;
    } else {
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
        musicIcon.textContent = '🔊';
        musicToggle.classList.remove('paused');
        musicPlaying = true;
    }
});

// Auto play music on first user interaction
document.addEventListener('click', (e) => {
    if (!musicPlaying && e.target !== musicToggle) {
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
        musicIcon.textContent = '🔊';
        musicToggle.classList.remove('paused');
        musicPlaying = true;
    }
}, { once: true });

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    parallaxElements.forEach(el => {
        el.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project items
document.querySelectorAll('.project-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.6s ease-out';
    observer.observe(item);
});

// Add glow effect to cursor
document.addEventListener('mousemove', (e) => {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.style.left = e.pageX + 'px';
    glow.style.top = e.pageY + 'px';
    document.body.appendChild(glow);
    
    setTimeout(() => {
        glow.remove();
    }, 1000);
});

// Add cursor glow styles dynamically
const style = document.createElement('style');
style.textContent = `
    .cursor-glow {
        position: absolute;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(220, 20, 60, 0.5) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: fadeOut 1s ease-out forwards;
        z-index: 9999;
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(style);

// Project item click handler
document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', function() {
        // Add your project detail view logic here
        console.log('Project clicked:', this);
    });
});

// Active navigation highlighting based on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.section-nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
