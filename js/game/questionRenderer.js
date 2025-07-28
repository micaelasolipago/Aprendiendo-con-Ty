// Renderizador de preguntas para diferentes tipos y niveles
const QuestionRenderer = {
    // Contenedor principal donde se renderizan las preguntas
    container: null,

    // Estado actual del renderizador
    state: {
        currentQuestionType: null,
        isRendering: false,
        selectedAnswer: null,
        dragDropData: null
    },

    // Callbacks para eventos de respuesta
    callbacks: {
        onAnswerSelect: null,
        onAnswerSubmit: null
    },

    // === INICIALIZACIÓN ===

    // Inicializar el renderizador
    init: function(containerId, callbacks = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Container no encontrado:', containerId);
            return false;
        }

        this.callbacks = { ...this.callbacks, ...callbacks };
        console.log('QuestionRenderer inicializado');
        return true;
    },

    // === RENDERIZADO PRINCIPAL ===

    // Renderizar una pregunta según su tipo
    renderQuestion: function(question) {
        if (!this.container || !question) {
            console.error('Container o pregunta no válidos');
            return false;
        }

        this.state.isRendering = true;
        this.state.currentQuestionType = question.type;
        this.state.selectedAnswer = null;

        // Limpiar contenedor
        this.container.innerHTML = '';

        try {
            // Renderizar según el tipo de pregunta
            switch (question.type) {
                case 'image-choice':
                    this.renderImageChoice(question);
                    break;
                case 'audio-choice':
                    this.renderAudioChoice(question);
                    break;
                case 'complete-sentence':
                    this.renderCompleteSentence(question);
                    break;
                case 'word-order':
                    this.renderWordOrder(question);
                    break;
                case 'text-input':
                    this.renderTextInput(question);
                    break;
                case 'reading-comprehension':
                    this.renderReadingComprehension(question);
                    break;
                case 'grammar-choice':
                    this.renderGrammarChoice(question);
                    break;
                default:
                    this.renderDefaultChoice(question);
            }

            this.state.isRendering = false;
            return true;
        } catch (error) {
            console.error('Error al renderizar pregunta:', error);
            this.state.isRendering = false;
            return false;
        }
    },

    // === TIPOS DE PREGUNTAS ===

    // Renderizar pregunta con imagen y opciones múltiples
    renderImageChoice: function(question) {
        const html = `
            <div class="question-content image-choice-question">
                <div class="question-header">
                    <div class="question-icon">🤔</div>
                    <h3 class="question-title">${question.question}</h3>
                </div>
                
                ${question.image ? `
                    <div class="question-image-container">
                        <img src="${question.image}" alt="Pregunta" class="question-image" onerror="this.style.display='none'">
                    </div>
                ` : ''}
                
                <div class="answer-options-container">
                    <p class="options-instruction">Selecciona la respuesta correcta:</p>
                    <div class="answer-options" data-question-type="image-choice">
                        ${question.options.map((option, index) => `
                            <div class="answer-option-wrapper" data-answer-index="${index}">
                                <button class="answer-option modern-option" data-answer-index="${index}">
                                    <div class="option-content">
                                        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                                        <span class="option-text">${option}</span>
                                        <button class="audio-btn" onclick="event.stopPropagation(); QuestionRenderer.playOptionAudio('${option}')">
                                            <span class="audio-icon">🔊</span>
                                            <span class="audio-text">Escuchar</span>
                                        </button>
                                    </div>
                                    <div class="option-feedback">
                                        <span class="feedback-icon">✓</span>
                                    </div>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        this.container.innerHTML = html;
        this.attachEventListeners();
        this.addOptionEffects();
    },

    // Renderizar pregunta de audio con opciones
    renderAudioChoice: function(question) {
        const html = `
            <div class="question-content audio-choice-question">
                <h3 class="question-title">${question.question}</h3>
                <div class="audio-play-section">
                    <button class="big-audio-button" onclick="QuestionRenderer.playQuestionAudio('${question.audio}')">
                        <span class="audio-icon">🔊</span>
                        <span class="audio-text">Escuchar Audio</span>
                    </button>
                </div>
                <div class="answer-options" data-question-type="audio-choice">
                    ${question.options.map((option, index) => `
                        <button class="answer-option" data-answer-index="${index}">
                            <span class="option-text">${option}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        this.container.innerHTML = html;
        this.attachEventListeners();
    },

    // Renderizar pregunta de completar oración
    renderCompleteSentence: function(question) {
        const sentenceParts = question.sentence.split('_____');
        
        const html = `
            <div class="question-content complete-sentence-question">
                <h3 class="question-title">${question.question}</h3>
                <div class="sentence-display">
                    ${sentenceParts[0] || ''}
                    <span class="sentence-blank" id="sentence-blank">_____</span>
                    ${sentenceParts[1] || ''}
                </div>
                <div class="answer-options" data-question-type="complete-sentence">
                    ${question.options.map((option, index) => `
                        <button class="answer-option" data-answer-index="${index}">
                            <span class="option-text">${option}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        this.container.innerHTML = html;
        this.attachEventListeners();
    },

    // Renderizar pregunta de ordenar palabras
    renderWordOrder: function(question) {
        const shuffledWords = [...question.words].sort(() => Math.random() - 0.5);
        
        const html = `
            <div class="question-content word-order-question">
                <h3 class="question-title">${question.question}</h3>
                <div class="drag-drop-container">
                    <div class="draggable-words" id="draggable-words">
                        ${shuffledWords.map((word, index) => `
                            <div class="draggable-word" draggable="true" data-word="${word}" data-index="${index}">
                                ${word}
                            </div>
                        `).join('')}
                    </div>
                    <div class="drop-zone" id="drop-zone">
                        <span class="drop-placeholder">Arrastra las palabras aquí para formar la oración</span>
                    </div>
                    <div class="word-order-actions">
                        <button class="action-button secondary" onclick="QuestionRenderer.clearWordOrder()">
                            Limpiar
                        </button>
                        <button class="action-button primary" onclick="QuestionRenderer.submitWordOrder()" disabled id="submit-word-order">
                            Enviar Respuesta
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.container.innerHTML = html;
        this.setupDragAndDrop();
    },

    // Renderizar pregunta de entrada de texto
    renderTextInput: function(question) {
        const html = `
            <div class="question-content text-input-question">
                <h3 class="question-title">${question.question}</h3>
                ${question.image ? `<img src="${question.image}" alt="Pregunta" class="question-image" onerror="this.style.display='none'">` : ''}
                <div class="text-input-container">
                    <input type="text" class="text-input" id="text-answer" placeholder="Escribe tu respuesta aquí..." autocomplete="off">
                    <button class="action-button primary" onclick="QuestionRenderer.submitTextAnswer()" id="submit-text">
                        Enviar Respuesta
                    </button>
                </div>
            </div>
        `;

        this.container.innerHTML = html;
        this.setupTextInput();
    },

    // Renderizar pregunta de comprensión de lectura
    renderReadingComprehension: function(question) {
        const html = `
            <div class="question-content reading-comprehension-question">
                <div class="reading-passage">
                    <h4>Lee el siguiente texto:</h4>
                    <p class="passage-text">${question.passage}</p>
                </div>
                <h3 class="question-title">${question.question}</h3>
                <div class="answer-options" data-question-type="reading-comprehension">
                    ${question.options.map((option, index) => `
                        <button class="answer-option" data-answer-index="${index}">
                            <span class="option-text">${option}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        this.container.innerHTML = html;
        this.attachEventListeners();
    },

    // Renderizar pregunta de gramática
    renderGrammarChoice: function(question) {
        const html = `
            <div class="question-content grammar-choice-question">
                <h3 class="question-title">${question.question}</h3>
                <div class="answer-options" data-question-type="grammar-choice">
                    ${question.options.map((option, index) => `
                        <button class="answer-option" data-answer-index="${index}">
                            <span class="option-text">${option}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        this.container.innerHTML = html;
        this.attachEventListeners();
    },

    // Renderizar pregunta por defecto (opción múltiple simple)
    renderDefaultChoice: function(question) {
        const html = `
            <div class="question-content default-choice-question">
                <div class="question-header">
                    <div class="question-icon">🤔</div>
                    <h3 class="question-title">${question.question}</h3>
                </div>
                
                <div class="answer-options-container">
                    <p class="options-instruction">Selecciona la respuesta correcta:</p>
                    <div class="answer-options" data-question-type="default">
                        ${question.options.map((option, index) => `
                            <div class="answer-option-wrapper" data-answer-index="${index}">
                                <button class="answer-option modern-option" data-answer-index="${index}">
                                    <div class="option-content">
                                        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                                        <span class="option-text">${option}</span>
                                        <button class="audio-btn" onclick="event.stopPropagation(); QuestionRenderer.playOptionAudio('${option}')">
                                            <span class="audio-icon">🔊</span>
                                            <span class="audio-text">Escuchar</span>
                                        </button>
                                    </div>
                                    <div class="option-feedback">
                                        <span class="feedback-icon">✓</span>
                                    </div>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        this.container.innerHTML = html;
        this.attachEventListeners();
        this.addOptionEffects();
    },

    // === EVENT LISTENERS ===

    // Configurar event listeners para opciones de respuesta
    attachEventListeners: function() {
        const answerWrappers = this.container.querySelectorAll('.answer-option-wrapper');
        const answerOptions = this.container.querySelectorAll('.answer-option');
        
        answerWrappers.forEach(wrapper => {
            wrapper.addEventListener('click', (e) => {
                if (e.target.closest('.audio-btn')) return; // No seleccionar si se hace clic en audio
                const answerIndex = parseInt(wrapper.dataset.answerIndex);
                const option = wrapper.querySelector('.answer-option');
                this.selectAnswer(answerIndex, option);
            });
        });
        
        answerOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                if (e.target.closest('.audio-btn')) return; // No seleccionar si se hace clic en audio
                const answerIndex = parseInt(e.currentTarget.dataset.answerIndex);
                this.selectAnswer(answerIndex, e.currentTarget);
            });
        });
    },

    // Configurar drag and drop para preguntas de ordenar palabras
    setupDragAndDrop: function() {
        const draggableWords = this.container.querySelectorAll('.draggable-word');
        const dropZone = this.container.querySelector('#drop-zone');

        // Configurar palabras arrastrables
        draggableWords.forEach(word => {
            word.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.word);
                e.target.classList.add('dragging');
            });

            word.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });

        // Configurar zona de drop
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            
            const word = e.dataTransfer.getData('text/plain');
            this.addWordToSentence(word);
        });

        // Inicializar estado de drag and drop
        this.state.dragDropData = {
            sentence: [],
            availableWords: [...document.querySelectorAll('.draggable-word')].map(el => el.dataset.word)
        };
    },

    // Configurar input de texto
    setupTextInput: function() {
        const textInput = this.container.querySelector('#text-answer');
        const submitButton = this.container.querySelector('#submit-text');

        textInput.addEventListener('input', () => {
            submitButton.disabled = textInput.value.trim().length === 0;
        });

        textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !submitButton.disabled) {
                this.submitTextAnswer();
            }
        });
    },

    // === MANEJO DE RESPUESTAS ===

    // Seleccionar una respuesta de opción múltiple
    selectAnswer: function(answerIndex, element) {
        // Remover selección anterior
        this.container.querySelectorAll('.answer-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Seleccionar nueva opción
        element.classList.add('selected');
        this.state.selectedAnswer = answerIndex;

        // Callback de selección
        if (this.callbacks.onAnswerSelect) {
            this.callbacks.onAnswerSelect(answerIndex);
        }

        // Auto-submit después de un breve delay
        setTimeout(() => {
            this.submitAnswer(answerIndex);
        }, 1000);
    },

    // Enviar respuesta
    submitAnswer: function(answerIndex) {
        if (this.callbacks.onAnswerSubmit) {
            this.callbacks.onAnswerSubmit(answerIndex);
        }
    },

    // === FUNCIONES ESPECÍFICAS DE TIPOS ===

    // Agregar palabra a la oración en construcción
    addWordToSentence: function(word) {
        if (!this.state.dragDropData.sentence.includes(word)) {
            this.state.dragDropData.sentence.push(word);
            this.updateDropZone();
            this.updateSubmitButton();
        }
    },

    // Actualizar zona de drop con la oración actual
    updateDropZone: function() {
        const dropZone = this.container.querySelector('#drop-zone');
        const sentence = this.state.dragDropData.sentence;

        if (sentence.length === 0) {
            dropZone.innerHTML = '<span class="drop-placeholder">Arrastra las palabras aquí para formar la oración</span>';
        } else {
            dropZone.innerHTML = sentence.map((word, index) => `
                <span class="dropped-word" onclick="QuestionRenderer.removeWordFromSentence(${index})">
                    ${word} <span class="remove-word">×</span>
                </span>
            `).join(' ');
            dropZone.classList.add('filled');
        }
    },

    // Remover palabra de la oración
    removeWordFromSentence: function(index) {
        this.state.dragDropData.sentence.splice(index, 1);
        this.updateDropZone();
        this.updateSubmitButton();
    },

    // Limpiar orden de palabras
    clearWordOrder: function() {
        this.state.dragDropData.sentence = [];
        this.updateDropZone();
        this.updateSubmitButton();
    },

    // Actualizar estado del botón de envío
    updateSubmitButton: function() {
        const submitButton = this.container.querySelector('#submit-word-order');
        submitButton.disabled = this.state.dragDropData.sentence.length === 0;
    },

    // Enviar respuesta de orden de palabras
    submitWordOrder: function() {
        const sentence = this.state.dragDropData.sentence.join(' ');
        // Convertir a índice de respuesta basado en la oración correcta
        const answerIndex = 0; // Simplificado por ahora
        this.submitAnswer(answerIndex);
    },

    // Enviar respuesta de texto
    submitTextAnswer: function() {
        const textInput = this.container.querySelector('#text-answer');
        const answer = textInput.value.trim();
        
        if (answer) {
            // Convertir texto a índice de respuesta
            const answerIndex = 0; // Simplificado por ahora
            this.submitAnswer(answerIndex);
        }
    },

    // === FUNCIONES DE AUDIO ===

    // Reproducir audio de pregunta (función deshabilitada)
    playQuestionAudio: function(audioUrl) {
        console.log('Audio deshabilitado para mejor compatibilidad');
    },

    // Reproducir audio de una opción específica usando TTS
    playOptionAudio: function(text) {
        if (!text || typeof text !== 'string') return;
        
        try {
            // Cancelar cualquier síntesis anterior
            if ('speechSynthesis' in window) {
                speechSynthesis.cancel();
                
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'en-US';
                utterance.rate = 0.8;
                utterance.volume = 0.8;
                
                speechSynthesis.speak(utterance);
            }
        } catch (error) {
            console.warn('Error en TTS de opción:', error);
        }
    },

    // === FEEDBACK VISUAL ===

    // Mostrar respuesta correcta
    showCorrectAnswer: function(correctIndex) {
        const options = this.container.querySelectorAll('.answer-option');
        options.forEach((option, index) => {
            if (index === correctIndex) {
                option.classList.add('correct');
            }
        });
    },

    // Mostrar respuesta incorrecta
    showIncorrectAnswer: function(selectedIndex, correctIndex) {
        const options = this.container.querySelectorAll('.answer-option');
        options.forEach((option, index) => {
            if (index === selectedIndex) {
                option.classList.add('incorrect');
            } else if (index === correctIndex) {
                option.classList.add('correct');
            }
        });
    },

    // Deshabilitar todas las opciones
    disableAllOptions: function() {
        const options = this.container.querySelectorAll('.answer-option');
        options.forEach(option => {
            option.classList.add('disabled');
            option.disabled = true;
        });
    },

    // === UTILIDADES ===

    // Limpiar estado del renderizador
    clearState: function() {
        this.state.selectedAnswer = null;
        this.state.currentQuestionType = null;
        this.state.dragDropData = null;
    },

    // Obtener respuesta seleccionada
    getSelectedAnswer: function() {
        return this.state.selectedAnswer;
    },

    // Verificar si hay una respuesta seleccionada
    hasSelectedAnswer: function() {
        return this.state.selectedAnswer !== null;
    },

    // Agregar efectos a las opciones
    addOptionEffects: function() {
        const options = this.container.querySelectorAll('.answer-option-wrapper');
        
        options.forEach((wrapper, index) => {
            // Agregar delay a la animación de entrada
            wrapper.style.animationDelay = `${index * 0.1}s`;
            wrapper.classList.add('option-entrance');
            
            const option = wrapper.querySelector('.answer-option');
            const audioBtn = wrapper.querySelector('.audio-btn');
            
            // Efecto hover mejorado
            option.addEventListener('mouseenter', function() {
                this.classList.add('option-hover');
            });
            
            option.addEventListener('mouseleave', function() {
                this.classList.remove('option-hover');
            });
            
            // Efecto para el botón de audio
            if (audioBtn) {
                audioBtn.addEventListener('mouseenter', function() {
                    this.classList.add('audio-hover');
                });
                
                audioBtn.addEventListener('mouseleave', function() {
                    this.classList.remove('audio-hover');
                });
            }
        });
    }
}; 