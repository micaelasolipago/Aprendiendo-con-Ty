// Lógica principal del juego
const GameLogic = {
    // Estado actual del juego
    currentState: {
        level: 1,
        questionIndex: 1,
        score: 0,
        correctAnswers: 0,
        attempts: 0,
        startTime: null,
        endTime: null,
        currentQuestion: null,
        isAnswering: false,
        hintsUsed: 0,
        timeSpent: 0
    },

    // Configuración del juego
    config: {
        pointsPerCorrectAnswer: 10,
        bonusPointsForSpeed: 5,
        maxTimeForBonus: 10000, // 10 segundos
        hintPenalty: 2,
        maxHints: 3
    },

    // Callbacks para eventos del juego
    callbacks: {
        onQuestionStart: null,
        onQuestionEnd: null,
        onLevelComplete: null,
        onGameComplete: null,
        onScoreUpdate: null,
        onProgressUpdate: null
    },

    // === INICIALIZACIÓN ===

    // Inicializar el juego
    init: function() {
        this.resetState();
        console.log('GameLogic inicializado');
        return true;
    },

    // Reiniciar estado del juego
    resetState: function() {
        this.currentState = {
            level: 1,
            questionIndex: 1,
            score: 0,
            correctAnswers: 0,
            attempts: 0,
            startTime: null,
            endTime: null,
            currentQuestion: null,
            isAnswering: false,
            hintsUsed: 0,
            timeSpent: 0
        };
    },

    // Configurar callbacks
    setCallbacks: function(callbacks) {
        this.callbacks = { ...this.callbacks, ...callbacks };
    },

    // === CONTROL DEL JUEGO ===

    // Iniciar un nuevo juego en un nivel específico
    startGame: function(level) {
        this.resetState();
        this.currentState.level = level;
        this.currentState.startTime = Date.now();
        
        // Obtener la siguiente pregunta no respondida o la primera
        const nextQuestion = GameStorage.getNextQuestion(level);
        this.currentState.questionIndex = nextQuestion;

        // Audio removido por problemas de compatibilidad

        console.log(`Juego iniciado - Nivel: ${level}, Pregunta: ${nextQuestion}`);
        
        // Cargar la primera pregunta
        return this.loadCurrentQuestion();
    },

    // Cargar la pregunta actual
    loadCurrentQuestion: function() {
        const { level, questionIndex } = this.currentState;
        
        // Obtener datos de la pregunta
        const question = GameQuestions.getQuestion(level, questionIndex);
        if (!question) {
            console.error('Pregunta no encontrada:', level, questionIndex);
            return false;
        }

        this.currentState.currentQuestion = question;
        this.currentState.isAnswering = false;
        this.currentState.questionStartTime = Date.now();

        // Audio removido por problemas de compatibilidad

        // Callback de inicio de pregunta
        if (this.callbacks.onQuestionStart) {
            this.callbacks.onQuestionStart(question, this.getGameState());
        }

        console.log('Pregunta cargada:', question.id, question.question);
        return true;
    },

    // === MANEJO DE RESPUESTAS ===

    // Procesar respuesta del jugador
    submitAnswer: function(answerIndex, timeToAnswer = null) {
        if (this.currentState.isAnswering) {
            console.warn('Ya se está procesando una respuesta');
            return false;
        }

        this.currentState.isAnswering = true;
        this.currentState.attempts++;

        const { level, questionIndex, currentQuestion } = this.currentState;
        
        if (!currentQuestion) {
            console.error('No hay pregunta actual');
            return false;
        }

        // Verificar si la respuesta es correcta
        const isCorrect = GameQuestions.isCorrectAnswer(level, questionIndex, answerIndex);
        
        // Calcular puntos
        const points = this.calculatePoints(isCorrect, timeToAnswer);
        
        // Actualizar estado
        if (isCorrect) {
            this.currentState.correctAnswers++;
            this.currentState.score += points;
            
            // Sonido de éxito removido
        } else {
            // Sonido de error removido
        }

        // Actualizar progreso en storage
        GameStorage.updateLevelProgress(level, questionIndex, isCorrect, points);

        // Callback de fin de pregunta
        if (this.callbacks.onQuestionEnd) {
            this.callbacks.onQuestionEnd({
                question: currentQuestion,
                answerIndex,
                isCorrect,
                points,
                gameState: this.getGameState()
            });
        }

        // Callback de actualización de puntuación
        if (this.callbacks.onScoreUpdate) {
            this.callbacks.onScoreUpdate(this.currentState.score, points);
        }

        console.log(`Respuesta procesada - Correcta: ${isCorrect}, Puntos: ${points}`);

        // Verificar progreso después de un pequeño delay para mostrar feedback
        setTimeout(() => {
            this.checkProgress();
        }, 2000);

        return isCorrect;
    },

    // Calcular puntos obtenidos
    calculatePoints: function(isCorrect, timeToAnswer) {
        if (!isCorrect) return 0;

        let points = this.config.pointsPerCorrectAnswer;
        
        // Bonus por velocidad
        if (timeToAnswer && timeToAnswer <= this.config.maxTimeForBonus) {
            points += this.config.bonusPointsForSpeed;
        }

        // Penalización por usar pistas
        const hintPenalty = this.currentState.hintsUsed * this.config.hintPenalty;
        points = Math.max(1, points - hintPenalty);

        return points;
    },

    // === NAVEGACIÓN ===

    // Avanzar a la siguiente pregunta
    nextQuestion: function() {
        const { level } = this.currentState;
        const totalQuestions = GameQuestions.getTotalQuestions(level);
        
        if (this.currentState.questionIndex < totalQuestions) {
            this.currentState.questionIndex++;
            this.currentState.hintsUsed = 0; // Reset hints para nueva pregunta
            return this.loadCurrentQuestion();
        } else {
            // Nivel completado
            return this.completeLevel();
        }
    },

    // Ir a una pregunta específica
    goToQuestion: function(questionIndex) {
        const { level } = this.currentState;
        const totalQuestions = GameQuestions.getTotalQuestions(level);
        
        if (questionIndex >= 1 && questionIndex <= totalQuestions) {
            this.currentState.questionIndex = questionIndex;
            this.currentState.hintsUsed = 0;
            return this.loadCurrentQuestion();
        }
        
        return false;
    },

    // Verificar progreso y determinar siguiente acción
    checkProgress: function() {
        const { level, questionIndex } = this.currentState;
        const totalQuestions = GameQuestions.getTotalQuestions(level);
        
        // Callback de actualización de progreso
        if (this.callbacks.onProgressUpdate) {
            this.callbacks.onProgressUpdate({
                level,
                question: questionIndex,
                total: totalQuestions,
                percentage: Math.round((questionIndex / totalQuestions) * 100)
            });
        }

        // Verificar si hay más preguntas
        if (questionIndex < totalQuestions) {
            // Continuar con siguiente pregunta
            this.nextQuestion();
        } else {
            // Nivel completado
            this.completeLevel();
        }
    },

    // === COMPLETAR NIVEL/JUEGO ===

    // Completar nivel actual
    completeLevel: function() {
        this.currentState.endTime = Date.now();
        this.currentState.timeSpent = this.currentState.endTime - this.currentState.startTime;

        const { level, score, correctAnswers, attempts, timeSpent } = this.currentState;
        const totalQuestions = GameQuestions.getTotalQuestions(level);
        
        // Actualizar estadísticas
        const gameData = {
            level,
            totalQuestions,
            correctAnswers,
            attempts,
            score,
            timeSpent,
            accuracy: Math.round((correctAnswers / totalQuestions) * 100)
        };

        GameStorage.updateStatistics(gameData);

        // Callback de nivel completado
        if (this.callbacks.onLevelComplete) {
            this.callbacks.onLevelComplete(gameData);
        }

        // Verificar si hay siguiente nivel
        if (GameQuestions.hasNextLevel(level)) {
            console.log(`Nivel ${level} completado. Siguiente nivel desbloqueado.`);
        } else {
            // Juego completado
            this.completeGame();
        }

        return gameData;
    },

    // Completar juego completo
    completeGame: function() {
        const gameData = {
            allLevelsCompleted: true,
            totalScore: this.currentState.score,
            totalTime: this.currentState.timeSpent
        };

        // Callback de juego completado
        if (this.callbacks.onGameComplete) {
            this.callbacks.onGameComplete(gameData);
        }

        console.log('¡Juego completado! Todos los niveles terminados.');
        return gameData;
    },

    // === SISTEMA DE PISTAS ===

    // Solicitar pista para la pregunta actual
    requestHint: function() {
        if (this.currentState.hintsUsed >= this.config.maxHints) {
            console.warn('Máximo de pistas alcanzado');
            return null;
        }

        const { currentQuestion } = this.currentState;
        if (!currentQuestion || !currentQuestion.hint) {
            console.warn('No hay pista disponible para esta pregunta');
            return null;
        }

        this.currentState.hintsUsed++;
        console.log('Pista solicitada:', currentQuestion.hint);
        
        return {
            hint: currentQuestion.hint,
            hintsUsed: this.currentState.hintsUsed,
            hintsRemaining: this.config.maxHints - this.currentState.hintsUsed
        };
    },

    // Verificar si hay pistas disponibles
    canUseHint: function() {
        return this.currentState.hintsUsed < this.config.maxHints && 
               this.currentState.currentQuestion?.hint;
    },

    // === AUDIO ===

    // Reproducir audio de la pregunta actual (función deshabilitada)
    playQuestionAudio: function() {
        console.log('Audio deshabilitado para mejor compatibilidad');
        return false;
    },

    // === ESTADO DEL JUEGO ===

    // Obtener estado completo del juego
    getGameState: function() {
        const { level, questionIndex, score, correctAnswers, attempts, hintsUsed } = this.currentState;
        const totalQuestions = GameQuestions.getTotalQuestions(level);
        
        return {
            level,
            questionIndex,
            totalQuestions,
            score,
            correctAnswers,
            attempts,
            hintsUsed,
            accuracy: attempts > 0 ? Math.round((correctAnswers / attempts) * 100) : 0,
            progress: Math.round((questionIndex / totalQuestions) * 100),
            canUseHint: this.canUseHint(),
            currentQuestion: this.currentState.currentQuestion
        };
    },

    // Obtener estadísticas de la sesión actual
    getSessionStats: function() {
        const timeSpent = this.currentState.startTime ? 
            Date.now() - this.currentState.startTime : 0;
        
        return {
            timeSpent,
            questionsAnswered: this.currentState.attempts,
            correctAnswers: this.currentState.correctAnswers,
            score: this.currentState.score,
            hintsUsed: this.currentState.hintsUsed,
            accuracy: this.currentState.attempts > 0 ? 
                Math.round((this.currentState.correctAnswers / this.currentState.attempts) * 100) : 0
        };
    },

    // === UTILIDADES ===

    // Pausar juego
    pauseGame: function() {
        // Guardar estado actual
        console.log('Juego pausado');
        return this.getGameState();
    },

    // Reanudar juego
    resumeGame: function() {
        console.log('Juego reanudado');
        return true;
    },

    // Salir del juego
    exitGame: function() {
        // Guardar progreso actual
        if (this.currentState.startTime) {
            this.currentState.endTime = Date.now();
            this.currentState.timeSpent = this.currentState.endTime - this.currentState.startTime;
            
            // Actualizar estadísticas parciales
            const gameData = {
                level: this.currentState.level,
                totalQuestions: this.currentState.attempts,
                correctAnswers: this.currentState.correctAnswers,
                attempts: this.currentState.attempts,
                score: this.currentState.score,
                timeSpent: this.currentState.timeSpent
            };
            
            GameStorage.updateStatistics(gameData);
        }

        this.resetState();
        console.log('Juego terminado');
        return true;
    },

    // Verificar si el juego está activo
    isGameActive: function() {
        return this.currentState.startTime !== null && this.currentState.endTime === null;
    }
}; 