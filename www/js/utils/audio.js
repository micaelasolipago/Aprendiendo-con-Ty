// Sistema de audio para el juego
const AudioManager = {
    // Referencias a elementos de audio
    elements: {
        backgroundMusic: null,
        correctSound: null,
        incorrectSound: null,
        wordPronunciation: null
    },

    // Estado del audio
    state: {
        soundEnabled: true,
        musicEnabled: true,
        volume: 0.8,
        currentTrack: null,
        isInitialized: false
    },

    // Cache de archivos de audio
    audioCache: new Map(),

    // Inicializar el sistema de audio
    init: function() {
        try {
            // Obtener referencias a elementos de audio
            this.elements.backgroundMusic = document.getElementById('background-music');
            this.elements.correctSound = document.getElementById('correct-sound');
            this.elements.incorrectSound = document.getElementById('incorrect-sound');
            this.elements.wordPronunciation = document.getElementById('word-pronunciation');

            // Cargar configuraciones guardadas
            this.loadSettings();

            // Configurar volúmenes iniciales
            this.setVolume(this.state.volume);

            // Configurar eventos
            this.setupEventListeners();

            // Marcar como inicializado
            this.state.isInitialized = true;

            console.log('Sistema de audio inicializado correctamente');
            return true;
        } catch (error) {
            console.error('Error al inicializar sistema de audio:', error);
            return false;
        }
    },

    // Cargar configuraciones de audio del localStorage
    loadSettings: function() {
        const settings = GameStorage.getSettings();
        if (settings) {
            this.state.soundEnabled = settings.soundEnabled;
            this.state.musicEnabled = settings.musicEnabled;
            this.state.volume = settings.volume || 0.8;
        }
    },

    // Configurar event listeners
    setupEventListeners: function() {
        // Manejar errores de carga de audio
        Object.values(this.elements).forEach(audio => {
            if (audio) {
                audio.addEventListener('error', (e) => {
                    console.warn('Error al cargar audio:', e.target.src);
                });

                audio.addEventListener('canplaythrough', () => {
                    console.log('Audio listo:', audio.src);
                });
            }
        });

        // Configurar música de fondo para loop
        if (this.elements.backgroundMusic) {
            this.elements.backgroundMusic.addEventListener('ended', () => {
                if (this.state.musicEnabled) {
                    this.elements.backgroundMusic.currentTime = 0;
                    this.elements.backgroundMusic.play().catch(e => {
                        console.warn('No se pudo reproducir música de fondo:', e);
                    });
                }
            });
        }
    },

    // === CONTROL DE VOLUMEN ===

    // Establecer volumen general
    setVolume: function(volume) {
        this.state.volume = Math.max(0, Math.min(1, volume));
        
        Object.values(this.elements).forEach(audio => {
            if (audio) {
                audio.volume = this.state.volume;
            }
        });

        // Guardar configuración
        GameStorage.updateSetting('volume', this.state.volume);
    },

    // Obtener volumen actual
    getVolume: function() {
        return this.state.volume;
    },

    // === MÚSICA DE FONDO ===

    // Reproducir música de fondo
    playBackgroundMusic: function() {
        if (!this.state.musicEnabled || !this.elements.backgroundMusic) return false;

        try {
            this.elements.backgroundMusic.currentTime = 0;
            this.elements.backgroundMusic.volume = this.state.volume * 0.3; // Música más suave
            
            const playPromise = this.elements.backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.warn('No se pudo reproducir música de fondo:', e);
                });
            }
            return true;
        } catch (error) {
            console.error('Error al reproducir música de fondo:', error);
            return false;
        }
    },

    // Pausar música de fondo
    pauseBackgroundMusic: function() {
        if (this.elements.backgroundMusic) {
            this.elements.backgroundMusic.pause();
        }
    },

    // Alternar música de fondo
    toggleBackgroundMusic: function() {
        this.state.musicEnabled = !this.state.musicEnabled;
        GameStorage.updateSetting('musicEnabled', this.state.musicEnabled);

        if (this.state.musicEnabled) {
            this.playBackgroundMusic();
        } else {
            this.pauseBackgroundMusic();
        }

        return this.state.musicEnabled;
    },

    // === EFECTOS DE SONIDO ===

    // Reproducir sonido de respuesta correcta
    playCorrectSound: function() {
        if (!this.state.soundEnabled || !this.elements.correctSound) return false;

        try {
            this.elements.correctSound.currentTime = 0;
            this.elements.correctSound.volume = this.state.volume;
            
            const playPromise = this.elements.correctSound.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.warn('No se pudo reproducir sonido correcto:', e);
                });
            }
            return true;
        } catch (error) {
            console.error('Error al reproducir sonido correcto:', error);
            return false;
        }
    },

    // Reproducir sonido de respuesta incorrecta
    playIncorrectSound: function() {
        if (!this.state.soundEnabled || !this.elements.incorrectSound) return false;

        try {
            this.elements.incorrectSound.currentTime = 0;
            this.elements.incorrectSound.volume = this.state.volume;
            
            const playPromise = this.elements.incorrectSound.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.warn('No se pudo reproducir sonido incorrecto:', e);
                });
            }
            return true;
        } catch (error) {
            console.error('Error al reproducir sonido incorrecto:', error);
            return false;
        }
    },

    // Alternar efectos de sonido
    toggleSoundEffects: function() {
        this.state.soundEnabled = !this.state.soundEnabled;
        GameStorage.updateSetting('soundEnabled', this.state.soundEnabled);
        return this.state.soundEnabled;
    },

    // === PRONUNCIACIÓN DE PALABRAS ===

    // Reproducir pronunciación de una palabra
    playWordPronunciation: function(audioUrl) {
        if (!this.state.soundEnabled || !audioUrl) return false;

        // Usar audio cached si está disponible
        if (this.audioCache.has(audioUrl)) {
            return this.playFromCache(audioUrl);
        }

        // Cargar y reproducir nuevo audio
        return this.loadAndPlayAudio(audioUrl);
    },

    // Reproducir audio desde cache
    playFromCache: function(audioUrl) {
        try {
            const audio = this.audioCache.get(audioUrl);
            audio.currentTime = 0;
            audio.volume = this.state.volume;
            
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.warn('No se pudo reproducir audio desde cache:', e);
                });
            }
            return true;
        } catch (error) {
            console.error('Error al reproducir desde cache:', error);
            return false;
        }
    },

    // Cargar y reproducir audio nuevo
    loadAndPlayAudio: function(audioUrl) {
        try {
            // Usar el elemento de pronunciación existente
            if (this.elements.wordPronunciation) {
                this.elements.wordPronunciation.src = audioUrl;
                this.elements.wordPronunciation.volume = this.state.volume;
                
                const playPromise = this.elements.wordPronunciation.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => {
                        console.warn('No se pudo cargar audio:', audioUrl, e);
                        // Usar fallback o audio sintético si falla
                        this.playFallbackAudio();
                    });
                }
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error al cargar y reproducir audio:', error);
            return false;
        }
    },

    // Audio de respaldo usando Web Speech API
    playFallbackAudio: function(text = 'Audio not available') {
        if (!this.state.soundEnabled) return false;

        try {
            // Verificar soporte para Speech Synthesis
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'en-US';
                utterance.rate = 0.8;
                utterance.pitch = 1;
                utterance.volume = this.state.volume;

                // Intentar usar una voz específica en inglés
                const voices = speechSynthesis.getVoices();
                const englishVoice = voices.find(voice => 
                    voice.lang.startsWith('en-') && voice.name.includes('Google')
                ) || voices.find(voice => voice.lang.startsWith('en-'));

                if (englishVoice) {
                    utterance.voice = englishVoice;
                }

                speechSynthesis.speak(utterance);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error en speech synthesis:', error);
            return false;
        }
    },

    // === PRELOADING DE AUDIO ===

    // Precargar audio para una pregunta
    preloadQuestionAudio: function(question) {
        if (!question.audio) return;

        const audio = new Audio(question.audio);
        audio.preload = 'auto';
        audio.volume = this.state.volume;
        
        audio.addEventListener('canplaythrough', () => {
            this.audioCache.set(question.audio, audio);
        });

        audio.addEventListener('error', () => {
            console.warn('No se pudo precargar audio:', question.audio);
        });
    },

    // Precargar audio para un nivel completo
    preloadLevelAudio: function(level) {
        const questions = GameQuestions.getLevel(level);
        questions.forEach(question => {
            if (question.audio) {
                this.preloadQuestionAudio(question);
            }
        });
    },

    // === UTILIDADES ===

    // Verificar si el audio está habilitado
    isAudioEnabled: function() {
        return this.state.soundEnabled || this.state.musicEnabled;
    },

    // Obtener estado del audio
    getAudioState: function() {
        return {
            soundEnabled: this.state.soundEnabled,
            musicEnabled: this.state.musicEnabled,
            volume: this.state.volume,
            isInitialized: this.state.isInitialized
        };
    },

    // Configurar todo el sistema de audio
    configure: function(options) {
        if (options.soundEnabled !== undefined) {
            this.state.soundEnabled = options.soundEnabled;
            GameStorage.updateSetting('soundEnabled', options.soundEnabled);
        }

        if (options.musicEnabled !== undefined) {
            this.state.musicEnabled = options.musicEnabled;
            GameStorage.updateSetting('musicEnabled', options.musicEnabled);
            
            if (options.musicEnabled) {
                this.playBackgroundMusic();
            } else {
                this.pauseBackgroundMusic();
            }
        }

        if (options.volume !== undefined) {
            this.setVolume(options.volume);
        }
    },

    // Limpiar cache de audio
    clearAudioCache: function() {
        this.audioCache.clear();
    },

    // Reproducir audio personalizado
    playCustomAudio: function(audioUrl, volume = null) {
        if (!this.state.soundEnabled) return false;

        try {
            const audio = new Audio(audioUrl);
            audio.volume = volume !== null ? volume : this.state.volume;
            
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.warn('No se pudo reproducir audio personalizado:', e);
                });
            }
            return true;
        } catch (error) {
            console.error('Error al reproducir audio personalizado:', error);
            return false;
        }
    },

    // Reproducir audio con texto usando TTS como fallback
    playAudioWithFallback: function(audioUrl, fallbackText) {
        if (!this.state.soundEnabled) return false;

        const audio = new Audio(audioUrl);
        audio.volume = this.state.volume;

        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Si falla el audio, usar TTS
                this.playFallbackAudio(fallbackText);
            });
        }

        return true;
    },

    // Detener todos los audios
    stopAllAudio: function() {
        // Pausar música de fondo
        this.pauseBackgroundMusic();

        // Detener elementos de audio principales
        Object.values(this.elements).forEach(audio => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        });

        // Detener speech synthesis
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }

        // Limpiar cache
        this.audioCache.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }
}; 