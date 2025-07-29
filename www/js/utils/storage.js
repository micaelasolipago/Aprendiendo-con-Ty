// Sistema de almacenamiento local para el progreso del juego
const GameStorage = {
    // Claves para localStorage
    STORAGE_KEYS: {
        PROGRESS: 'english_with_ty_progress',
        SETTINGS: 'english_with_ty_settings',
        STATISTICS: 'english_with_ty_statistics'
    },

    // Inicializar el almacenamiento
    init: function() {
        // Verificar si localStorage está disponible
        if (!this.isStorageAvailable()) {
            console.warn('localStorage no está disponible. El progreso no se guardará.');
            return false;
        }

        // Inicializar progreso si no existe
        if (!this.getProgress()) {
            this.initializeProgress();
        }

        // Inicializar configuraciones si no existen
        if (!this.getSettings()) {
            this.initializeSettings();
        }

        // Inicializar estadísticas si no existen
        if (!this.getStatistics()) {
            this.initializeStatistics();
        }

        return true;
    },

    // Verificar disponibilidad de localStorage
    isStorageAvailable: function() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    },

    // Inicializar progreso por defecto
    initializeProgress: function() {
        const defaultProgress = {
            level1: {
                completed: 0,
                unlocked: true,
                questionsAnswered: [],
                bestScore: 0,
                attempts: 0
            },
            level2: {
                completed: 0,
                unlocked: true,
                questionsAnswered: [],
                bestScore: 0,
                attempts: 0
            },
            level3: {
                completed: 0,
                unlocked: true,
                questionsAnswered: [],
                bestScore: 0,
                attempts: 0
            },
            currentLevel: 1,
            totalScore: 0,
            lastPlayed: null
        };
        
        this.saveProgress(defaultProgress);
        return defaultProgress;
    },

    // Inicializar configuraciones por defecto
    initializeSettings: function() {
        const defaultSettings = {
            soundEnabled: true,
            musicEnabled: true,
            volume: 0.8,
            difficulty: 'normal',
            language: 'es',
            showHints: true,
            autoAdvance: true
        };
        
        this.saveSettings(defaultSettings);
        return defaultSettings;
    },

    // Inicializar estadísticas por defecto
    initializeStatistics: function() {
        const defaultStats = {
            totalGamesPlayed: 0,
            totalQuestionsAnswered: 0,
            totalCorrectAnswers: 0,
            averageScore: 0,
            timeSpent: 0,
            favoriteLevel: 1,
            achievements: [],
            streaks: {
                current: 0,
                longest: 0
            }
        };
        
        this.saveStatistics(defaultStats);
        return defaultStats;
    },

    // === MÉTODOS DE PROGRESO ===

    // Obtener progreso completo
    getProgress: function() {
        try {
            const progress = localStorage.getItem(this.STORAGE_KEYS.PROGRESS);
            return progress ? JSON.parse(progress) : null;
        } catch (e) {
            console.error('Error al obtener progreso:', e);
            return null;
        }
    },

    // Guardar progreso completo
    saveProgress: function(progress) {
        try {
            progress.lastPlayed = new Date().toISOString();
            localStorage.setItem(this.STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
            return true;
        } catch (e) {
            console.error('Error al guardar progreso:', e);
            return false;
        }
    },

    // Obtener progreso de un nivel específico
    getLevelProgress: function(level) {
        const progress = this.getProgress();
        const levelKey = `level${level}`;
        return progress ? progress[levelKey] : null;
    },

    // Actualizar progreso de un nivel
    updateLevelProgress: function(level, questionId, isCorrect, score = 0) {
        const progress = this.getProgress();
        if (!progress) return false;

        const levelKey = `level${level}`;
        const levelProgress = progress[levelKey];

        // Marcar pregunta como respondida
        if (!levelProgress.questionsAnswered.includes(questionId)) {
            levelProgress.questionsAnswered.push(questionId);
            levelProgress.completed = levelProgress.questionsAnswered.length;
        }

        // Actualizar mejor puntuación
        if (score > levelProgress.bestScore) {
            levelProgress.bestScore = score;
        }

        // Verificar si el nivel está completado
        const totalQuestions = GameQuestions.getTotalQuestions(level);
        if (levelProgress.completed >= totalQuestions) {
            // Desbloquear siguiente nivel
            const nextLevel = level + 1;
            if (nextLevel <= 3) {
                progress[`level${nextLevel}`].unlocked = true;
            }
        }

        // Actualizar puntuación total
        progress.totalScore += (isCorrect ? score : 0);

        return this.saveProgress(progress);
    },

    // Reiniciar progreso de un nivel
    resetLevelProgress: function(level) {
        const progress = this.getProgress();
        if (!progress) return false;

        const levelKey = `level${level}`;
        progress[levelKey] = {
            completed: 0,
            unlocked: true, // Todos los niveles siempre están desbloqueados
            questionsAnswered: [],
            bestScore: 0,
            attempts: 0
        };

        // Mantener todos los niveles desbloqueados (no bloquear niveles superiores)
        for (let i = 1; i <= 3; i++) {
            if (progress[`level${i}`]) {
                progress[`level${i}`].unlocked = true;
            }
        }

        return this.saveProgress(progress);
    },

    // Reiniciar todo el progreso
    resetAllProgress: function() {
        return this.initializeProgress();
    },

    // === MÉTODOS DE CONFIGURACIÓN ===

    // Obtener configuraciones
    getSettings: function() {
        try {
            const settings = localStorage.getItem(this.STORAGE_KEYS.SETTINGS);
            return settings ? JSON.parse(settings) : null;
        } catch (e) {
            console.error('Error al obtener configuraciones:', e);
            return null;
        }
    },

    // Guardar configuraciones
    saveSettings: function(settings) {
        try {
            localStorage.setItem(this.STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
            return true;
        } catch (e) {
            console.error('Error al guardar configuraciones:', e);
            return false;
        }
    },

    // Actualizar una configuración específica
    updateSetting: function(key, value) {
        const settings = this.getSettings();
        if (!settings) return false;

        settings[key] = value;
        return this.saveSettings(settings);
    },

    // === MÉTODOS DE ESTADÍSTICAS ===

    // Obtener estadísticas
    getStatistics: function() {
        try {
            const stats = localStorage.getItem(this.STORAGE_KEYS.STATISTICS);
            return stats ? JSON.parse(stats) : null;
        } catch (e) {
            console.error('Error al obtener estadísticas:', e);
            return null;
        }
    },

    // Guardar estadísticas
    saveStatistics: function(statistics) {
        try {
            localStorage.setItem(this.STORAGE_KEYS.STATISTICS, JSON.stringify(statistics));
            return true;
        } catch (e) {
            console.error('Error al guardar estadísticas:', e);
            return false;
        }
    },

    // Actualizar estadísticas después de una partida
    updateStatistics: function(gameData) {
        const stats = this.getStatistics();
        if (!stats) return false;

        // Actualizar contadores básicos
        stats.totalGamesPlayed++;
        stats.totalQuestionsAnswered += gameData.totalQuestions;
        stats.totalCorrectAnswers += gameData.correctAnswers;
        stats.timeSpent += gameData.timeSpent || 0;

        // Calcular promedio
        stats.averageScore = stats.totalQuestionsAnswered > 0 ? 
            Math.round((stats.totalCorrectAnswers / stats.totalQuestionsAnswered) * 100) : 0;

        // Actualizar racha
        if (gameData.correctAnswers === gameData.totalQuestions) {
            stats.streaks.current++;
            if (stats.streaks.current > stats.streaks.longest) {
                stats.streaks.longest = stats.streaks.current;
            }
        } else {
            stats.streaks.current = 0;
        }

        // Actualizar nivel favorito
        if (gameData.level) {
            stats.favoriteLevel = gameData.level;
        }

        return this.saveStatistics(stats);
    },

    // === MÉTODOS DE UTILIDAD ===

    // Obtener resumen del progreso para la UI
    getProgressSummary: function() {
        const progress = this.getProgress();
        if (!progress) return null;

        const summary = {};
        for (let level = 1; level <= 3; level++) {
            const levelProgress = progress[`level${level}`];
            const totalQuestions = GameQuestions.getTotalQuestions(level);
            
            summary[`level${level}`] = {
                completed: levelProgress.completed,
                total: totalQuestions,
                percentage: Math.round((levelProgress.completed / totalQuestions) * 100),
                unlocked: levelProgress.unlocked,
                bestScore: levelProgress.bestScore
            };
        }

        return summary;
    },

    // Verificar si un nivel está desbloqueado
    isLevelUnlocked: function(level) {
        // Todos los niveles están desbloqueados para que cualquiera pueda jugar
        return level >= 1 && level <= 3;
    },

    // Obtener siguiente pregunta no respondida
    getNextQuestion: function(level) {
        const progress = this.getProgress();
        if (!progress) return 1;

        const levelProgress = progress[`level${level}`];
        if (!levelProgress) return 1;

        // Encontrar la primera pregunta no respondida
        for (let i = 1; i <= GameQuestions.getTotalQuestions(level); i++) {
            if (!levelProgress.questionsAnswered.includes(i)) {
                return i;
            }
        }

        // Si todas están respondidas, empezar desde el principio
        return 1;
    },

    // Exportar datos para respaldo
    exportData: function() {
        try {
            const data = {
                progress: this.getProgress(),
                settings: this.getSettings(),
                statistics: this.getStatistics(),
                exportDate: new Date().toISOString(),
                version: '1.0'
            };
            return JSON.stringify(data, null, 2);
        } catch (e) {
            console.error('Error al exportar datos:', e);
            return null;
        }
    },

    // Importar datos desde respaldo
    importData: function(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (data.progress) this.saveProgress(data.progress);
            if (data.settings) this.saveSettings(data.settings);
            if (data.statistics) this.saveStatistics(data.statistics);
            
            return true;
        } catch (e) {
            console.error('Error al importar datos:', e);
            return false;
        }
    },

    // Limpiar todo el almacenamiento
    clearAll: function() {
        try {
            localStorage.removeItem(this.STORAGE_KEYS.PROGRESS);
            localStorage.removeItem(this.STORAGE_KEYS.SETTINGS);
            localStorage.removeItem(this.STORAGE_KEYS.STATISTICS);
            return true;
        } catch (e) {
            console.error('Error al limpiar almacenamiento:', e);
            return false;
        }
    }
}; 