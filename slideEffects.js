// slideEffects.js - Efeito de slide lateral suave
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os elementos com o atributo data-slide
    const slideElements = document.querySelectorAll('[data-slide]');
    
    // Configurações do Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Cria o Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                slideInElement(element);
                observer.unobserve(element); // Para de observar após a animação
            }
        });
    }, observerOptions);
    
    // Observa cada elemento com data-slide
    slideElements.forEach(element => {
        // Define o estado inicial baseado na direção
        const direction = element.getAttribute('data-slide-direction');
        const translateValue = direction === 'left' ? '-100px' : '100px';
        element.style.transform = `translateX(${translateValue})`;
        element.style.opacity = '0';
        
        // Começa a observar o elemento
        observer.observe(element);
    });
    
    // Função para animar o elemento entrando na tela
    function slideInElement(element) {
        const duration = parseInt(element.getAttribute('data-slide-duration')) || 1000;
        const delay = parseInt(element.getAttribute('data-slide-delay')) || 0;
        
        // Aplica a transição com atraso e duração personalizados
        element.style.transition = `transform ${duration}ms ease-out ${delay}ms, opacity ${duration}ms ease-out ${delay}ms`;
        
        // Define o estado final
        element.style.transform = 'translateX(0)';
        element.style.opacity = '1';
    }
});


