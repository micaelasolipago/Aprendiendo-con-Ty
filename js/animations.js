// ===== SISTEMA DE ANIMACIONES AVANZADAS =====
class AnimationManager {
    constructor() {
        this.particles = [];
        this.animations = [];
        this.isRunning = false;
        
        this.init();
    }
    
    init() {
        this.setupParticleSystem();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
        
        console.log('🎬 Sistema de animaciones iniciado');
    }
    
    // ===== SISTEMA DE PARTÍCULAS =====
    setupParticleSystem() {
        // Crear partículas de fondo
        this.createBackgroundParticles();
        
        // Configurar limpieza automática
        setInterval(() => {
            this.cleanupParticles();
        }, 5000);
    }
    
    createBackgroundParticles() {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createFloatingParticle();
            }, i * 200);
        }
    }
    
    createFloatingParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle float';
        
        // Posición aleatoria
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        // Tamaño aleatorio
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Color aleatorio
        const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#fbbf24'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        
        // Opacidad aleatoria
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        document.body.appendChild(particle);
        this.particles.push(particle);
        
        // Remover después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                this.particles = this.particles.filter(p => p !== particle);
            }
        }, 4000);
    }
    
    createParticleBurst(x, y, color = '#3b82f6', count = 10) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle sparkle';
                
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.background = color;
                particle.style.width = '6px';
                particle.style.height = '6px';
                particle.style.borderRadius = '50%';
                
                // Velocidad aleatoria
                const angle = (Math.PI * 2 * i) / count;
                const velocity = Math.random() * 100 + 50;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                particle.style.setProperty('--vx', vx + 'px');
                particle.style.setProperty('--vy', vy + 'px');
                
                document.body.appendChild(particle);
                this.particles.push(particle);
                
                // Animar movimiento
                this.animateParticleMovement(particle, vx, vy);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                        this.particles = this.particles.filter(p => p !== particle);
                    }
                }, 2000);
            }, i * 50);
        }
    }
    
    animateParticleMovement(particle, vx, vy) {
        let x = parseFloat(particle.style.left);
        let y = parseFloat(particle.style.top);
        let opacity = 1;
        
        const animate = () => {
            x += vx * 0.01;
            y += vy * 0.01;
            opacity -= 0.02;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    cleanupParticles() {
        this.particles = this.particles.filter(particle => {
            if (!particle.parentNode) {
                return false;
            }
            return true;
        });
    }
    
    // ===== ANIMACIONES DE SCROLL =====
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observar elementos animables
        const animatableElements = document.querySelectorAll('.level-card, .stat-card, .age-btn');
        animatableElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // ===== EFECTOS HOVER =====
    setupHoverEffects() {
        // Efecto de ondas en botones
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e);
            });
        });
        
        // Efecto de hover en tarjeta
        const cards = document.querySelectorAll('.level-card, .stat-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.createHoverGlow(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeHoverGlow(card);
            });
        });
    }
    
    createRippleEffect(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.className = 'button-ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    createHoverGlow(element) {
        element.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.2)';
        element.style.transform = 'translateY(-5px) scale(1.02)';
    }
    
    removeHoverGlow(element) {
        element.style.boxShadow = '';
        element.style.transform = '';
    }
    
    // ===== ANIMACIONES DE CARGA =====
    setupLoadingAnimations() {
        // Mostrar animación de carga al cargar la página
        this.showLoadingScreen();
        
        // Simular carga de recursos
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 2000);
    }
    
    showLoadingScreen() {
        const loadingScreen = document.createElement('div');
        loadingScreen.id = 'loadingScreen';
        loadingScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease-out;
        `;
        
        loadingScreen.innerHTML = `
            <div class="ty-character" style="font-size: 4rem; margin-bottom: 2rem;">🐶</div>
            <div class="loading-spinner"></div>
            <p style="margin-top: 1rem; color: var(--text-secondary);">Cargando Aprendiendo con Ty...</p>
        `;
        
        document.body.appendChild(loadingScreen);
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }
    
    // ===== ANIMACIONES DE TY =====
    animateTyEmotion(emotion) {
        const tyCharacter = document.querySelector('.ty-character');
        if (!tyCharacter) return;
        
        // Remover clases anteriores
        tyCharacter.classList.remove('wagging', 'jumping', 'happy');
        
        // Aplicar nueva emoción
        switch (emotion) {
            case 'happy':
                tyCharacter.classList.add('happy');
                this.createParticleBurst(
                    tyCharacter.offsetLeft + tyCharacter.offsetWidth / 2,
                    tyCharacter.offsetTop,
                    '#fbbf24',
                    8
                );
                break;
            case 'excited':
                tyCharacter.classList.add('jumping');
                break;
            case 'friendly':
                tyCharacter.classList.add('wagging');
                break;
        }
    }
    
    // ===== ANIMACIONES DE PROGRESO =====
    animateProgressBar(element, targetValue, duration = 1000) {
        const progressFill = element.querySelector('.progress-fill');
        if (!progressFill) return;
        
        const startValue = 0;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = startValue + (targetValue - startValue) * this.easeOutQuart(progress);
            progressFill.style.width = currentValue + '%';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    
    // ===== ANIMACIONES DE EFECTOS ESPECIALES =====
    createConfettiBurst(x, y) {
        const colors = ['#fbbf24', '#f97316', '#10b981', '#8b5cf6', '#3b82f6'];
        const confettiCount = 30;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = x + 'px';
                confetti.style.top = y + 'px';
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 50);
        }
    }
    
    createStarBurst(x, y, color = '#fbbf24') {
        const star = document.createElement('div');
        star.className = 'star-burst';
        star.style.left = (x - 10) + 'px';
        star.style.top = (y - 10) + 'px';
        star.style.background = color;
        
        document.body.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 600);
    }
    
    // ===== ANIMACIONES DE TRANSICIÓN =====
    animatePageTransition(fromSection, toSection, callback) {
        const fromElement = document.getElementById(fromSection);
        const toElement = document.getElementById(toSection);
        
        if (!fromElement || !toElement) {
            if (callback) callback();
            return;
        }
        
        // Animación de salida
        fromElement.style.transform = 'translateX(-100%)';
        fromElement.style.opacity = '0';
        
        setTimeout(() => {
            fromElement.classList.remove('active');
            toElement.classList.add('active');
            
            // Animación de entrada
            toElement.style.transform = 'translateX(100%)';
            toElement.style.opacity = '0';
            
            requestAnimationFrame(() => {
                toElement.style.transition = 'all 0.5s ease-out';
                toElement.style.transform = 'translateX(0)';
                toElement.style.opacity = '1';
            });
            
            setTimeout(() => {
                toElement.style.transition = '';
                toElement.style.transform = '';
                toElement.style.opacity = '';
                if (callback) callback();
            }, 500);
        }, 300);
    }
    
    // ===== ANIMACIONES RESPONSIVAS =====
    setupResponsiveAnimations() {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        
        const handleResize = (e) => {
            if (e.matches) {
                // Dispositivo móvil - reducir animaciones
                document.documentElement.style.setProperty('--animation-speed', '0.5');
            } else {
                // Desktop - animaciones normales
                document.documentElement.style.setProperty('--animation-speed', '1');
            }
        };
        
        mediaQuery.addListener(handleResize);
        handleResize(mediaQuery);
    }
    
    // ===== ANIMACIONES DE ACCESIBILIDAD =====
    setupAccessibilityAnimations() {
        // Detectar preferencia de movimiento reducido
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            this.disableAnimations();
        }
        
        prefersReducedMotion.addListener((e) => {
            if (e.matches) {
                this.disableAnimations();
            } else {
                this.enableAnimations();
            }
        });
    }
    
    disableAnimations() {
        document.documentElement.style.setProperty('--animation-speed', '0.1');
        document.documentElement.style.setProperty('--transition-duration', '0.01s');
    }
    
    enableAnimations() {
        document.documentElement.style.setProperty('--animation-speed', '1');
        document.documentElement.style.setProperty('--transition-duration', '0.3s');
    }
    
    // ===== UTILIDADES =====
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // ===== LIMPIEZA =====
    cleanup() {
        this.particles.forEach(particle => {
            if (particle.parentNode) {
                particle.remove();
            }
        });
        this.particles = [];
        this.animations = [];
    }
}

// ===== INICIALIZACIÓN =====
let animationManager;

document.addEventListener('DOMContentLoaded', () => {
    try {
        animationManager = new AnimationManager();
        window.animationManager = animationManager;
    } catch (error) {
        console.error('Error al inicializar el sistema de animaciones:', error);
    }
});

// ===== EXPORTACIÓN =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationManager;
}


