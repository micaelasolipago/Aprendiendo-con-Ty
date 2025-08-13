// ===== APLICACIÓN PRINCIPAL =====
class TyGameApp {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.currentSection = 'home';
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.setupTheme();
        this.setupNavigation();
        this.setupTyThemeToggle();
        this.setupAgeSelection();
        this.setupLevelCards();
        this.setupSettings();
        this.setupAnimations();
        this.setupAccessibility();
        
        console.log('🐶 Aprendiendo con Ty - Aplicación iniciada');
    }
    
    // ===== CONFIGURACIÓN DEL TEMA =====
    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
    }
    
    toggleTheme() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        document.body.classList.add('theme-transitioning');
        
        // Animación del botón de Ty
        const tyAvatar = document.getElementById('tyThemeToggle');
        if (tyAvatar) {
            tyAvatar.classList.add('pressing');
        }
        
        // Cambiar tema
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        
        // Crear partículas de efecto
        this.createThemeParticles();
        
        // Actualizar icono
        this.updateThemeIcon();
        
        // Remover clases de animación
        setTimeout(() => {
            if (tyAvatar) {
                tyAvatar.classList.remove('pressing');
            }
            document.body.classList.remove('theme-transitioning');
            this.isTransitioning = false;
        }, 500);
        
        // Notificación removida por solicitud del usuario
    }
    
    updateThemeIcon() {
        const tyAvatar = document.getElementById('tyThemeToggle');
        if (!tyAvatar) {
            console.warn('Ty avatar element not found');
            return;
        }
        
        if (this.currentTheme === 'dark') {
            tyAvatar.style.filter = 'brightness(1.2) contrast(0.8) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';
        } else {
            tyAvatar.style.filter = 'brightness(0.7) contrast(1.2) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))';
        }
    }
    
    createThemeParticles() {
        const colors = this.currentTheme === 'dark' 
            ? ['#3b82f6', '#8b5cf6', '#34d399'] 
            : ['#2563eb', '#fbbf24', '#10b981'];
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                this.createParticle(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 50);
        }
    }
    
    createParticle(color) {
        const particle = document.createElement('div');
        particle.className = 'particle sparkle';
        particle.style.background = color;
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
    
    // ===== CONFIGURACIÓN DE NAVEGACIÓN =====
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const screens = document.querySelectorAll('.screen');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mainNav = document.getElementById('mainNav');
        
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetSection = e.target.dataset.section;
                
                // Reproducir sonido de clic
                if (window.audioManager) {
                    window.audioManager.playClick();
                }
                
                this.navigateToSection(targetSection);
                
                // Cerrar menú móvil si está abierto
                this.closeMobileMenu();
            });
        });
        
        // Configurar menú móvil
        if (mobileMenuToggle && mainNav) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
            
            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
        
        // Marcar botón activo inicial
        this.updateActiveNavButton();
    }
    
    toggleMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mainNav = document.getElementById('mainNav');
        
        if (!mobileMenuToggle || !mainNav) return;
        
        const isOpen = mainNav.classList.contains('active');
        
        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mainNav = document.getElementById('mainNav');
        
        if (!mobileMenuToggle || !mainNav) return;
        
        mainNav.classList.add('active');
        mobileMenuToggle.classList.add('active');
        
        // Reproducir sonido
        if (window.audioManager) {
            window.audioManager.playClick();
        }
    }
    
    closeMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mainNav = document.getElementById('mainNav');
        
        if (!mobileMenuToggle || !mainNav) return;
        
        mainNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
    
    navigateToSection(sectionName) {
        if (this.currentSection === sectionName) return;
        
        // Ocultar pantalla actual
        const currentScreen = document.getElementById(this.currentSection);
        currentScreen.classList.remove('active');
        
        // Mostrar nueva pantalla
        const newScreen = document.getElementById(sectionName);
        newScreen.classList.add('active');
        
        // Actualizar estado
        this.currentSection = sectionName;
        this.updateActiveNavButton();
        
        // Animación de Ty
        this.animateTy();
        
        console.log(`Navegando a: ${sectionName}`);
    }
    
    updateActiveNavButton() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.section === this.currentSection) {
                button.classList.add('active');
            }
        });
    }
    
    // ===== CONFIGURACIÓN DEL BOTÓN DE TEMA DE TY =====
    setupTyThemeToggle() {
        const tyAvatar = document.getElementById('tyThemeToggle');
        
        if (!tyAvatar) {
            console.warn('Ty avatar element not found for setup');
            return;
        }
        
        tyAvatar.addEventListener('click', () => {
            // Reproducir sonido de clic
            if (window.audioManager) {
                window.audioManager.playClick();
            }
            
            this.toggleTheme();
        });
        
        // Efecto hover con partículas
        tyAvatar.addEventListener('mouseenter', () => {
            this.createTyParticles();
        });
    }
    
    createTyParticles() {
        const tyAvatar = document.getElementById('tyThemeToggle');
        if (!tyAvatar) {
            return;
        }
        
        const rect = tyAvatar.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle float';
                particle.style.background = '#1a1a1a';
                particle.style.left = (rect.left + rect.width / 2) + 'px';
                particle.style.top = (rect.top + rect.height / 2) + 'px';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.borderRadius = '50%';
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 2000);
            }, i * 100);
        }
    }
    
    // ===== CONFIGURACIÓN DE SELECCIÓN DE EDAD =====
    setupAgeSelection() {
        const ageButtons = document.querySelectorAll('.age-btn');
        
        ageButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ageRange = e.target.dataset.age;
                
                // Reproducir sonido de clic
                if (window.audioManager) {
                    window.audioManager.playClick();
                }
                
                this.selectAgeRange(ageRange);
            });
        });
    }
    
    selectAgeRange(ageRange) {
        // Animación de éxito
        const button = document.querySelector(`[data-age="${ageRange}"]`);
        if (button) {
            button.classList.add('button-success');
        }
        
        // Crear confeti
        this.createConfetti();
        
        // Navegar a niveles
        setTimeout(() => {
            this.navigateToSection('levels');
            if (button) {
                button.classList.remove('button-success');
            }
        }, 500);
        
        // Guardar selección
        localStorage.setItem('selectedAge', ageRange);
        
        console.log(`Edad seleccionada: ${ageRange}`);
    }
    
    createConfetti() {
        const colors = ['#fbbf24', '#f97316', '#10b981', '#8b5cf6', '#3b82f6'];
        
        // Reproducir sonido de confeti
        if (window.audioManager) {
            window.audioManager.playConfetti();
        }
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 50);
        }
    }
    
    // ===== CONFIGURACIÓN DE TARJETAS DE NIVEL =====
    setupLevelCards() {
        const levelCards = document.querySelectorAll('.level-card');
        const playButtons = document.querySelectorAll('.play-btn');
        
        levelCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('card-hover');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('card-hover');
            });
        });
        
        playButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.level-card');
                const level = card.dataset.level;
                
                // Reproducir sonido de clic
                if (window.audioManager) {
                    window.audioManager.playClick();
                }
                
                this.startLevel(level);
            });
        });
    }
    
    startLevel(level) {
        // Animación de la tarjeta
        const card = document.querySelector(`[data-level="${level}"]`);
        if (card) {
            card.classList.add('card-flip');
            
            // Crear efecto de estrella
            this.createStarBurst(card);
            
            // Mostrar notificación
            this.showNotification(`Iniciando Nivel ${level}...`, 'info');
            
            // Aquí se integraría con el sistema de juego
            setTimeout(() => {
                if (card) {
                    card.classList.remove('card-flip');
                }
                console.log(`Iniciando nivel: ${level}`);
            }, 600);
        } else {
            console.warn(`No se encontró la tarjeta del nivel ${level}`);
        }
    }
    
    createStarBurst(element) {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const star = document.createElement('div');
        star.className = 'star-burst';
        star.style.left = (rect.left + rect.width / 2 - 10) + 'px';
        star.style.top = (rect.top + rect.height / 2 - 10) + 'px';
        
        document.body.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 600);
    }
    
    // ===== CONFIGURACIÓN DE CONFIGURACIÓN =====
    setupSettings() {
        const musicVolume = document.getElementById('musicVolume');
        const sfxVolume = document.getElementById('sfxVolume');
        const animationSpeed = document.getElementById('animationSpeed');
        
        // Cargar valores guardados
        musicVolume.value = localStorage.getItem('musicVolume') || 50;
        sfxVolume.value = localStorage.getItem('sfxVolume') || 70;
        animationSpeed.value = localStorage.getItem('animationSpeed') || 1;
        
        // Eventos de cambio
        musicVolume.addEventListener('input', (e) => {
            localStorage.setItem('musicVolume', e.target.value);
            this.updateMusicVolume(e.target.value);
        });
        
        sfxVolume.addEventListener('input', (e) => {
            localStorage.setItem('sfxVolume', e.target.value);
            this.updateSFXVolume(e.target.value);
        });
        
        animationSpeed.addEventListener('input', (e) => {
            localStorage.setItem('animationSpeed', e.target.value);
            this.updateAnimationSpeed(e.target.value);
        });
        
        // Configurar botón de silencio
        const muteButton = document.getElementById('muteButton');
        if (muteButton) {
            this.updateMuteButton();
            
            muteButton.addEventListener('click', () => {
                if (window.audioManager) {
                    window.audioManager.toggleMute();
                    this.updateMuteButton();
                }
            });
        }
    }
    
    updateMusicVolume(volume) {
        // Convertir porcentaje a valor entre 0 y 1
        const volumeValue = volume / 100;
        
        if (window.audioManager) {
            window.audioManager.setMusicVolume(volumeValue);
        }
        
        console.log(`Volumen de música: ${volume}%`);
    }
    
    updateSFXVolume(volume) {
        // Convertir porcentaje a valor entre 0 y 1
        const volumeValue = volume / 100;
        
        if (window.audioManager) {
            window.audioManager.setSFXVolume(volumeValue);
        }
        
        console.log(`Volumen de efectos: ${volume}%`);
    }
    
    updateAnimationSpeed(speed) {
        document.documentElement.style.setProperty('--animation-speed', speed);
        console.log(`Velocidad de animación: ${speed}x`);
    }
    
    updateMuteButton() {
        const muteButton = document.getElementById('muteButton');
        if (!muteButton || !window.audioManager) return;
        
        const isMuted = window.audioManager.isMuted;
        const muteIcon = muteButton.querySelector('.mute-icon');
        const muteText = muteButton.querySelector('.mute-text');
        
        if (isMuted) {
            muteButton.classList.add('muted');
            muteIcon.textContent = '🔇';
            muteText.textContent = 'Activar Audio';
        } else {
            muteButton.classList.remove('muted');
            muteIcon.textContent = '🔊';
            muteText.textContent = 'Silenciar Audio';
        }
    }
    
    // ===== CONFIGURACIÓN DE ANIMACIONES =====
    setupAnimations() {
        // Animación de Ty en el header
        const tyCharacter = document.querySelector('.ty-character');
        
        setInterval(() => {
            tyCharacter.classList.add('wagging');
            setTimeout(() => {
                tyCharacter.classList.remove('wagging');
            }, 1000);
        }, 5000);
        
        // Animación de huellas decorativas
        this.animateDecorativePaws();
    }
    
    animateDecorativePaws() {
        const decorativePaws = document.querySelectorAll('.paw-print.decorative');
        
        decorativePaws.forEach((paw, index) => {
            setTimeout(() => {
                paw.classList.add('walking');
                setTimeout(() => {
                    paw.classList.remove('walking');
                }, 3000);
            }, index * 2000);
        });
    }
    
    animateTy() {
        const tyCharacter = document.querySelector('.ty-character');
        tyCharacter.classList.add('jumping');
        
        setTimeout(() => {
            tyCharacter.classList.remove('jumping');
        }, 500);
    }
    
    // ===== CONFIGURACIÓN DE ACCESIBILIDAD =====
    setupAccessibility() {
        // Soporte para navegación por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.navigateToSection('home');
            }
        });
        
        // Soporte para prefers-reduced-motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-speed', '0.1');
        }
        
        // Foco visible para elementos interactivos
        const interactiveElements = document.querySelectorAll('button, a, input');
        interactiveElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid var(--primary-blue)';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    }
    
    // ===== SISTEMA DE NOTIFICACIONES =====
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification slide-in`;
        notification.textContent = message;
        
        // Estilos según tipo
        switch (type) {
            case 'success':
                notification.style.borderColor = 'var(--accent-green)';
                notification.style.background = 'rgba(16, 185, 129, 0.1)';
                break;
            case 'error':
                notification.style.borderColor = 'var(--accent-orange)';
                notification.style.background = 'rgba(249, 115, 22, 0.1)';
                break;
            case 'warning':
                notification.style.borderColor = 'var(--accent-yellow)';
                notification.style.background = 'rgba(251, 191, 36, 0.1)';
                break;
            default:
                notification.style.borderColor = 'var(--primary-blue)';
                notification.style.background = 'rgba(37, 99, 235, 0.1)';
        }
        
        document.body.appendChild(notification);
        
        // Remover notificación después de 3 segundos
        setTimeout(() => {
            notification.classList.add('slide-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // ===== UTILIDADES =====
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    getCurrentSection() {
        return this.currentSection;
    }
    
    // ===== MANEJO DE ERRORES =====
    handleError(error) {
        console.error('Error en la aplicación:', error);
        this.showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.tyGameApp = new TyGameApp();
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
    }
});

// ===== EXPORTACIÓN PARA MÓDULOS =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TyGameApp;
}
