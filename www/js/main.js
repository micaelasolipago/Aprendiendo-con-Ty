// Archivo principal - Controlador del juego "Aprendiendo Inglés con Ty"
const App = {
    // Estado de la aplicación
    state: {
        currentScreen: 'loading',
        gameInitialized: false,
        loadingProgress: 0
    },

    // Referencias a elementos del DOM
    elements: {
        screens: {},
        buttons: {},
        displays: {}
    },

    // === INICIALIZACIÓN ===

    // Inicializar la aplicación
    init: function() {
        console.log('Iniciando Aprendiendo Inglés con Ty...');
        
        // Mostrar pantalla de carga
        this.showLoadingScreen();
        
        // Inicializar sistemas paso a paso
        this.initializeSystems();
    },

    // Configurar referencias a elementos del DOM
    setupDOMReferences: function() {
        // Pantallas
        this.elements.screens = {
            'loading': document.getElementById('loading-screen'),
            'main-menu': document.getElementById('main-menu'),
            'game': document.getElementById('game-screen'),
            'results': document.getElementById('results-screen')
        };

        // Botones principales
        this.elements.buttons = {
            levelButtons: document.querySelectorAll('.level-button'),
            backToMenu: document.getElementById('back-to-menu'),
            hintButton: document.getElementById('hint-button'),
            progressReset: document.getElementById('progress-reset')
        };

        // Elementos de información
        this.elements.displays = {
            currentScore: document.getElementById('current-score'),
            currentQuestion: document.getElementById('current-question'),
            totalQuestions: document.getElementById('total-questions'),
            currentLevelName: document.getElementById('current-level-name'),
            tyMessage: document.getElementById('ty-message'),
            progressLevels: {
                1: document.getElementById('progress-level-1'),
                2: document.getElementById('progress-level-2'),
                3: document.getElementById('progress-level-3')
            },
            progressFills: {
                1: document.getElementById('progress-fill-1'),
                2: document.getElementById('progress-fill-2'),
                3: document.getElementById('progress-fill-3')
            }
        };
    },

    // Inicializar sistemas del juego
    initializeSystems: function() {
        let progress = 0;
        const systems = [
            { name: 'DOM References', fn: () => this.setupDOMReferences() },
            { name: 'Game Storage', fn: () => GameStorage.init() },
            { name: 'Game Logic', fn: () => GameLogic.init() },
            { name: 'Question Renderer', fn: () => QuestionRenderer.init('question-content', {
                onAnswerSelect: (index) => this.onAnswerSelect(index),
                onAnswerSubmit: (index) => this.onAnswerSubmit(index)
            })},
            { name: 'Event Listeners', fn: () => this.setupEventListeners() },
            { name: 'Progress Update', fn: () => this.updateProgressDisplay() }
        ];

        // Inicializar sistemas uno por uno
        systems.forEach((system, index) => {
            setTimeout(() => {
                try {
                    console.log(`Inicializando ${system.name}...`);
                    system.fn();
                    progress = ((index + 1) / systems.length) * 100;
                    this.updateLoadingProgress(progress);
                    
                    // Si es el último sistema
                    if (index === systems.length - 1) {
                        setTimeout(() => {
                            this.finishInitialization();
                        }, 500);
                    }
                } catch (error) {
                    console.error(`Error inicializando ${system.name}:`, error);
                }
            }, index * 300);
        });
    },

    // Finalizar inicialización
    finishInitialization: function() {
        this.state.gameInitialized = true;
        
        // Cargar tema guardado
        this.loadSavedTheme();
        
        // Configurar callbacks del juego
        GameLogic.setCallbacks({
            onQuestionStart: (question, gameState) => this.onQuestionStart(question, gameState),
            onQuestionEnd: (data) => this.onQuestionEnd(data),
            onLevelComplete: (data) => this.onLevelComplete(data),
            onScoreUpdate: (score) => this.updateScore(score),
            onProgressUpdate: (progress) => this.updateGameProgress(progress)
        });

        console.log('Juego terminado');
        // Ir al menú principal
        setTimeout(() => {
            this.showMainMenu();
        }, 1000);
    },

    // === MANEJO DE PANTALLAS ===

    // Mostrar pantalla de carga
    showLoadingScreen: function() {
        this.switchToScreen('loading');
    },

    // Mostrar menú principal
    showMainMenu: function() {
        this.updateProgressDisplay();
        this.switchToScreen('main-menu');
    },

    // Mostrar pantalla de juego
    showGameScreen: function() {
        this.switchToScreen('game');
    },

    // Mostrar pantalla de resultados
    showResultsScreen: function() {
        this.switchToScreen('results');
    },

    // Cambiar a una pantalla específica
    switchToScreen: function(screenName) {
        // Ocultar todas las pantallas
        Object.values(this.elements.screens).forEach(screen => {
            if (screen) screen.classList.remove('active');
        });

        // Mostrar pantalla solicitada
        if (this.elements.screens[screenName]) {
            this.elements.screens[screenName].classList.add('active');
            this.state.currentScreen = screenName;
        } else {
            console.error(`Pantalla ${screenName} no encontrada`);
        }
    },

    // === EVENT LISTENERS ===

    // Configurar event listeners
    setupEventListeners: function() {
        // Botones de nivel
        this.elements.buttons.levelButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const level = parseInt(e.target.dataset.targetLevel);
                this.startLevel(level);
            });
        });

        // Botón de volver al menú
        if (this.elements.buttons.backToMenu) {
            this.elements.buttons.backToMenu.addEventListener('click', () => {
                this.returnToMainMenu();
            });
        }

        // Botón de pista
        if (this.elements.buttons.hintButton) {
            this.elements.buttons.hintButton.addEventListener('click', () => {
                this.requestHint();
            });
        }

        // Botón de reiniciar progreso
        if (this.elements.buttons.progressReset) {
            this.elements.buttons.progressReset.addEventListener('click', () => {
                this.confirmResetProgress();
            });
        }

        // Botón de cambio de tema
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Botones de resultados
        this.setupResultsEventListeners();
    },

    // Configurar event listeners de la pantalla de resultados
    setupResultsEventListeners: function() {
        const playAgainBtn = document.getElementById('play-again');
        const nextLevelBtn = document.getElementById('next-level');
        const backToLevelsBtn = document.getElementById('back-to-levels');

        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => {
                const currentLevel = GameLogic.currentState.level;
                this.startLevel(currentLevel);
            });
        }

        if (nextLevelBtn) {
            nextLevelBtn.addEventListener('click', () => {
                const nextLevel = GameLogic.currentState.level + 1;
                if (nextLevel <= 3) {
                    this.startLevel(nextLevel);
                }
            });
        }

        if (backToLevelsBtn) {
            backToLevelsBtn.addEventListener('click', () => {
                this.showMainMenu();
            });
        }
    },

    // === CONTROL DEL JUEGO ===

    // Iniciar un nivel específico
    startLevel: function(level) {
        console.log('Iniciando nivel:', level);
        
        // Actualizar información del nivel
        const levelInfo = GameQuestions.getLevelInfo(level);
        if (this.elements.displays.currentLevelName) {
            this.elements.displays.currentLevelName.textContent = levelInfo.name;
        }
        if (this.elements.displays.totalQuestions) {
            this.elements.displays.totalQuestions.textContent = levelInfo.totalQuestions;
        }

        // Iniciar el juego
        GameLogic.startGame(level);
        this.showGameScreen();
    },

    // Volver al menú principal
    returnToMainMenu: function() {
        // Guardar progreso actual si hay un juego activo
        if (GameLogic.isGameActive()) {
            GameLogic.exitGame();
        }

        this.showMainMenu();
    },

    // === CALLBACKS DEL JUEGO ===

    // Cuando inicia una nueva pregunta
    onQuestionStart: function(question, gameState) {
        console.log('Nueva pregunta:', question.id);
        
        // Actualizar displays
        if (this.elements.displays.currentQuestion) {
            this.elements.displays.currentQuestion.textContent = gameState.questionIndex;
        }

        // Mostrar pregunta usando el renderer
        QuestionRenderer.renderQuestion(question);

        // Mostrar mensaje de Ty
        this.showTyMessage('¡Veamos qué sabes sobre esta pregunta!');

        // Actualizar estado de botones
        this.updateGameButtons(gameState);
    },

    // Cuando el jugador selecciona una respuesta
    onAnswerSelect: function(answerIndex) {
        console.log('Respuesta seleccionada:', answerIndex);
        // El feedback visual lo maneja el QuestionRenderer
    },

    // Cuando se envía una respuesta
    onAnswerSubmit: function(answerIndex) {
        console.log('Respuesta enviada:', answerIndex);
        
        // Calcular tiempo de respuesta
        const timeToAnswer = Date.now() - GameLogic.currentState.questionStartTime;
        
        // Procesar respuesta
        const isCorrect = GameLogic.submitAnswer(answerIndex, timeToAnswer);
        
        // Mostrar feedback visual
        if (isCorrect) {
            QuestionRenderer.showCorrectAnswer(answerIndex);
        } else {
            QuestionRenderer.showIncorrectAnswer(answerIndex, GameLogic.currentState.currentQuestion.correct);
        }

        // Deshabilitar opciones
        QuestionRenderer.disableAllOptions();
    },

    // Cuando termina una pregunta
    onQuestionEnd: function(data) {
        const { question, isCorrect, points } = data;
        
        // Mostrar mensaje de Ty
        const tyMessage = GameQuestions.getTyMessage(
            GameLogic.currentState.level, 
            question.id, 
            isCorrect
        );
        this.showTyMessage(tyMessage);

        // Mostrar puntos obtenidos si es correcto
        if (isCorrect && points > 0) {
            this.showPointsEarned(points);
        }
    },

    // Cuando se completa un nivel
    onLevelComplete: function(data) {
        console.log('Nivel completado:', data);
        
        // Actualizar progreso
        this.updateProgressDisplay();
        
        // Mostrar pantalla de resultados
        this.showLevelResults(data);
    },

    // === ACTUALIZACIONES DE UI ===

    // Actualizar progreso de carga
    updateLoadingProgress: function(progress) {
        const progressBar = document.querySelector('.loading-progress');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        this.state.loadingProgress = progress;
    },

    // Actualizar display de progreso en menú principal
    updateProgressDisplay: function() {
        const progressSummary = GameStorage.getProgressSummary();
        if (!progressSummary) return;

        for (let level = 1; level <= 3; level++) {
            const data = progressSummary[`level${level}`];
            
            // Actualizar texto de progreso
            if (this.elements.displays.progressLevels[level]) {
                this.elements.displays.progressLevels[level].textContent = data.completed;
            }
            
            // Actualizar barra de progreso
            if (this.elements.displays.progressFills[level]) {
                this.elements.displays.progressFills[level].style.width = `${data.percentage}%`;
            }

            // Actualizar estado del botón de nivel
            const levelButton = document.querySelector(`[data-target-level="${level}"]`);
            if (levelButton) {
                // Todos los niveles siempre están disponibles
                levelButton.disabled = false;
                levelButton.textContent = '¡Empezar!';
            }
        }
    },

    // Actualizar puntuación
    updateScore: function(score) {
        if (this.elements.displays.currentScore) {
            this.elements.displays.currentScore.textContent = score;
        }
    },

    // Actualizar progreso del juego
    updateGameProgress: function(progress) {
        // El progreso se muestra en la barra superior del juego
        console.log('Progreso del juego:', progress);
    },

    // Actualizar botones del juego
    updateGameButtons: function(gameState) {
        // Botón de pista
        if (this.elements.buttons.hintButton) {
            this.elements.buttons.hintButton.disabled = !gameState.canUseHint;
        }
    },

    // === FUNCIONES DE UI ===

    // Mostrar mensaje de Ty
    showTyMessage: function(message) {
        if (this.elements.displays.tyMessage) {
            this.elements.displays.tyMessage.textContent = message;
        }
    },

    // Mostrar puntos ganados
    showPointsEarned: function(points) {
        // Crear elemento temporal para mostrar puntos
        const pointsElement = document.createElement('div');
        pointsElement.className = 'points-earned';
        pointsElement.textContent = `+${points} puntos`;
        pointsElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--primary-green);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-size: 1.2rem;
            font-weight: bold;
            z-index: 1000;
            animation: pointsAnimation 2s ease-out forwards;
        `;

        document.body.appendChild(pointsElement);

        // Remover después de la animación
        setTimeout(() => {
            pointsElement.remove();
        }, 2000);
    },

    // Mostrar resultados del nivel
    showLevelResults: function(data) {
        // Actualizar estadísticas en pantalla de resultados
        const elements = {
            correctAnswers: document.getElementById('correct-answers'),
            totalScore: document.getElementById('total-score'),
            accuracyPercentage: document.getElementById('accuracy-percentage'),
            celebrationMessage: document.getElementById('celebration-message'),
            nextLevelBtn: document.getElementById('next-level')
        };

        if (elements.correctAnswers) {
            elements.correctAnswers.textContent = data.correctAnswers;
        }
        if (elements.totalScore) {
            elements.totalScore.textContent = data.score;
        }
        if (elements.accuracyPercentage) {
            elements.accuracyPercentage.textContent = `${data.accuracy}%`;
        }

        // Mensaje de celebración basado en el rendimiento
        if (elements.celebrationMessage) {
            if (data.accuracy >= 90) {
                elements.celebrationMessage.textContent = '¡Excelente trabajo! ¡Eres increíble!';
            } else if (data.accuracy >= 70) {
                elements.celebrationMessage.textContent = '¡Muy bien! ¡Sigue así!';
            } else {
                elements.celebrationMessage.textContent = '¡Buen intento! ¡Puedes mejorar!';
            }
        }

        // Mostrar/ocultar botón de siguiente nivel
        if (elements.nextLevelBtn) {
            const hasNextLevel = GameQuestions.hasNextLevel(data.level);
            elements.nextLevelBtn.style.display = hasNextLevel ? 'block' : 'none';
        }

        this.showResultsScreen();
    },

    // === FUNCIONES DE ACCIÓN ===

    // Solicitar pista
    requestHint: function() {
        const hintData = GameLogic.requestHint();
        if (hintData) {
            this.showTyMessage(`💡 Pista: ${hintData.hint}`);
        } else {
            this.showTyMessage('No hay más pistas disponibles para esta pregunta.');
        }
    },



    // Confirmar reinicio de progreso
    confirmResetProgress: function() {
        if (confirm('¿Estás seguro de que quieres reiniciar todo el progreso? Esta acción no se puede deshacer.')) {
            GameStorage.resetAllProgress();
            this.updateProgressDisplay();
            this.showTyMessage('¡Progreso reiniciado! Comienza una nueva aventura de aprendizaje.');
        }
    },

    // === MANEJO DE TEMAS ===

    // Alternar entre tema claro y oscuro
    toggleTheme: function() {
        const body = document.body;
        const themeToggle = document.getElementById('theme-toggle');
        const isDark = body.classList.contains('dark-theme');
        
        if (isDark) {
            // Cambiar a tema claro
            body.classList.remove('dark-theme');
            themeToggle.title = 'Cambiar a modo oscuro';
            localStorage.setItem('gameTheme', 'light');
        } else {
            // Cambiar a tema oscuro
            body.classList.add('dark-theme');
            themeToggle.title = 'Cambiar a modo claro';
            localStorage.setItem('gameTheme', 'dark');
        }
        
        console.log('Tema cambiado a:', isDark ? 'claro' : 'oscuro');
    },

    // Cargar tema guardado
    loadSavedTheme: function() {
        const savedTheme = localStorage.getItem('gameTheme');
        const themeToggle = document.getElementById('theme-toggle');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeToggle) {
                themeToggle.title = 'Cambiar a modo claro';
            }
        } else {
            document.body.classList.remove('dark-theme');
            if (themeToggle) {
                themeToggle.title = 'Cambiar a modo oscuro';
            }
        }
    }
};

// === INICIALIZACIÓN AUTOMÁTICA ===

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    App.init();
});

// Manejar errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// CSS adicional para animación de puntos
const style = document.createElement('style');
style.textContent = `
    @keyframes pointsAnimation {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -80%) scale(1);
        }
    }
`;
document.head.appendChild(style); 