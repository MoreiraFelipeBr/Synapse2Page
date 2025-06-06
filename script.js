// Particles Background for Hero Section
const canvas = document.getElementById('particles-js');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: `rgba(0, 209, 209, ${Math.random() * 0.5 + 0.1})`
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        // Draw connecting lines
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
            
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 209, 209, ${1 - distance / 100})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Responsive adjustments
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


      // Tab Functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                btn.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Responsive adjustments
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

                // Configurações personalizáveis
        const scrollConfig = {
            duration: 1200,      // Duração em ms
            easing: "easeInOutCubic",  // Curva de aceleração
            offset: -20          // Offset vertical (ajuste fino)
        };

        // Função de easing personalizada
        const easingFunctions = {
            easeInOutCubic: t => t<.5 ? 4*t*t*t : 1-(( -2*t + 2)**3)/2
        };

        // Função principal de scroll suave
        function smoothScroll(targetId) {
            const target = document.getElementById(targetId);
            if (!target) return;
            
            const startPosition = window.pageYOffset;
            const targetPosition = target.getBoundingClientRect().top + startPosition;
            const distance = targetPosition - startPosition + scrollConfig.offset;
            let startTime = null;
            
            // Função de animação
            function animation(currentTime) {
                if (!startTime) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / scrollConfig.duration, 1);
                
                // Aplica easing
                const easeProgress = easingFunctions[scrollConfig.easing](progress);
                
                window.scrollTo(0, startPosition + (distance * easeProgress));
                
                if (timeElapsed < scrollConfig.duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            requestAnimationFrame(animation);
        }

        // Configura os botões
        document.querySelectorAll('button[data-target]').forEach(button => {
            button.addEventListener('click', () => {
                smoothScroll(button.getAttribute('data-target'));
            });
        });

        // Scroll suave para âncoras
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                smoothScroll(targetId);
            });
        });

    document.addEventListener('DOMContentLoaded', () => {
        const fadeElements = document.querySelectorAll('.fade-in');
    
         const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Opcional: remover observação após a animação
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Dispara quando 10% do elemento estiver visível
        rootMargin: '0px 0px -50px 0px' // Ajuste fino: considera 50px antes de entrar na viewport
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});
        
