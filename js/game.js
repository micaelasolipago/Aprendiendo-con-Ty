console.log('🎮 Cargando archivo game.js...');

// ===== SISTEMA DE JUEGO PRINCIPAL =====
class TyGame {
    constructor() {
        console.log('🏗️ Constructor de TyGame llamado');
        this.currentLevel = 1;
        this.currentQuestion = 0;
        this.score = 0;
        this.streak = 0;
        this.selectedAge = localStorage.getItem('selectedAge') || '3-6';
        this.gameData = this.loadGameData();
        this.isGameActive = false;
        this.eventListenersConfigured = false;
        
        // Nuevas propiedades para el botón Siguiente
        this.nextButtonCountdown = null;
        this.autoAdvanceTimer = null;
        this.countdownDuration = 5; // segundos
        this.enableAutoAdvance = true;
        this.nextButtonSound = null;
        
        this.init();
    }
    
    init() {
        this.setupGameUI();
        this.loadUserProgress();
        
        console.log('🎮 Sistema de juego iniciado');
    }
    
    // ===== CARGA DE DATOS DEL JUEGO =====
    loadGameData() {
        return {
            level1: {
                title: "Exploradores de Sonidos",
                description: "Aprende vocabulario básico en inglés",
                ageRange: "3-6 años",
                questions: [
                    // Animales
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'perro' en inglés?",
                        audio: "dog",
                        options: ["🐕 Dog", "🐱 Cat", "🐄 Cow", "🐔 Chicken"],
                        correct: 0,
                        spanish: "perro",
                        english: "dog"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'gato' en inglés?",
                        audio: "cat",
                        options: ["🐱 Cat", "🐕 Dog", "🐰 Rabbit", "🐹 Hamster"],
                        correct: 0,
                        spanish: "gato",
                        english: "cat"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'vaca' en inglés?",
                        audio: "cow",
                        options: ["🐄 Cow", "🐷 Pig", "🐑 Sheep", "🐐 Goat"],
                        correct: 0,
                        spanish: "vaca",
                        english: "cow"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'pollo' en inglés?",
                        audio: "chicken",
                        options: ["🐔 Chicken", "🦆 Duck", "🦃 Turkey", "🦅 Eagle"],
                        correct: 0,
                        spanish: "pollo",
                        english: "chicken"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'conejo' en inglés?",
                        audio: "rabbit",
                        options: ["🐰 Rabbit", "🐹 Hamster", "🐭 Mouse", "🐿️ Squirrel"],
                        correct: 0,
                        spanish: "conejo",
                        english: "rabbit"
                    },
                    // Colores
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'rojo' en inglés?",
                        audio: "red",
                        options: ["🔴 Red", "🔵 Blue", "🟡 Yellow", "🟢 Green"],
                        correct: 0,
                        spanish: "rojo",
                        english: "red"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'azul' en inglés?",
                        audio: "blue",
                        options: ["🔵 Blue", "🟣 Purple", "🔴 Red", "⚫ Black"],
                        correct: 0,
                        spanish: "azul",
                        english: "blue"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'amarillo' en inglés?",
                        audio: "yellow",
                        options: ["🟡 Yellow", "🟠 Orange", "🟢 Green", "⚪ White"],
                        correct: 0,
                        spanish: "amarillo",
                        english: "yellow"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'verde' en inglés?",
                        audio: "green",
                        options: ["🟢 Green", "🔵 Blue", "🟡 Yellow", "🟣 Purple"],
                        correct: 0,
                        spanish: "verde",
                        english: "green"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'negro' en inglés?",
                        audio: "black",
                        options: ["⚫ Black", "⚪ White", "🔴 Red", "🔵 Blue"],
                        correct: 0,
                        spanish: "negro",
                        english: "black"
                    },
                    // Formas
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'círculo' en inglés?",
                        audio: "circle",
                        options: ["⭕ Circle", "⬜ Square", "🔺 Triangle", "⭐ Star"],
                        correct: 0,
                        spanish: "círculo",
                        english: "circle"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'cuadrado' en inglés?",
                        audio: "square",
                        options: ["⬜ Square", "⭕ Circle", "🔺 Triangle", "💎 Diamond"],
                        correct: 0,
                        spanish: "cuadrado",
                        english: "square"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'triángulo' en inglés?",
                        audio: "triangle",
                        options: ["🔺 Triangle", "⭕ Circle", "⬜ Square", "⭐ Star"],
                        correct: 0,
                        spanish: "triángulo",
                        english: "triangle"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'estrella' en inglés?",
                        audio: "star",
                        options: ["⭐ Star", "🌙 Moon", "☀️ Sun", "💫 Sparkle"],
                        correct: 0,
                        spanish: "estrella",
                        english: "star"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'corazón' en inglés?",
                        audio: "heart",
                        options: ["❤️ Heart", "💙 Blue heart", "💚 Green heart", "💛 Yellow heart"],
                        correct: 0,
                        spanish: "corazón",
                        english: "heart"
                    },
                    // Comida
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'manzana' en inglés?",
                        audio: "apple",
                        options: ["🍎 Apple", "🍌 Banana", "🍊 Orange", "🍇 Grape"],
                        correct: 0,
                        spanish: "manzana",
                        english: "apple"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'plátano' en inglés?",
                        audio: "banana",
                        options: ["🍌 Banana", "🍎 Apple", "🍊 Orange", "🍓 Strawberry"],
                        correct: 0,
                        spanish: "plátano",
                        english: "banana"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'naranja' en inglés?",
                        audio: "orange",
                        options: ["🍊 Orange", "🍎 Apple", "🍌 Banana", "🍋 Lemon"],
                        correct: 0,
                        spanish: "naranja",
                        english: "orange"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'leche' en inglés?",
                        audio: "milk",
                        options: ["🥛 Milk", "🧃 Juice", "💧 Water", "☕ Coffee"],
                        correct: 0,
                        spanish: "leche",
                        english: "milk"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'pan' en inglés?",
                        audio: "bread",
                        options: ["🍞 Bread", "🥖 Baguette", "🥨 Pretzel", "🥯 Bagel"],
                        correct: 0,
                        spanish: "pan",
                        english: "bread"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'agua' en inglés?",
                        audio: "water",
                        options: ["💧 Water", "🥛 Milk", "🧃 Juice", "☕ Coffee"],
                        correct: 0,
                        spanish: "agua",
                        english: "water"
                    },
                    // Naturaleza
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'sol' en inglés?",
                        audio: "sun",
                        options: ["☀️ Sun", "🌙 Moon", "⭐ Star", "☁️ Cloud"],
                        correct: 0,
                        spanish: "sol",
                        english: "sun"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'luna' en inglés?",
                        audio: "moon",
                        options: ["🌙 Moon", "☀️ Sun", "⭐ Star", "☁️ Cloud"],
                        correct: 0,
                        spanish: "luna",
                        english: "moon"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'árbol' en inglés?",
                        audio: "tree",
                        options: ["🌳 Tree", "🌱 Plant", "🌸 Flower", "🌿 Grass"],
                        correct: 0,
                        spanish: "árbol",
                        english: "tree"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'flor' en inglés?",
                        audio: "flower",
                        options: ["🌸 Flower", "🌳 Tree", "🌱 Plant", "🌿 Grass"],
                        correct: 0,
                        spanish: "flor",
                        english: "flower"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'casa' en inglés?",
                        audio: "house",
                        options: ["🏠 House", "🏢 Building", "🏘️ Houses", "🏡 Home"],
                        correct: 0,
                        spanish: "casa",
                        english: "house"
                    },
                    // Números
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'uno' en inglés?",
                        audio: "one",
                        options: ["1️⃣ One", "2️⃣ Two", "3️⃣ Three", "4️⃣ Four"],
                        correct: 0,
                        spanish: "uno",
                        english: "one"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'dos' en inglés?",
                        audio: "two",
                        options: ["2️⃣ Two", "1️⃣ One", "3️⃣ Three", "4️⃣ Four"],
                        correct: 0,
                        spanish: "dos",
                        english: "two"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'tres' en inglés?",
                        audio: "three",
                        options: ["3️⃣ Three", "1️⃣ One", "2️⃣ Two", "4️⃣ Four"],
                        correct: 0,
                        spanish: "tres",
                        english: "three"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'cuatro' en inglés?",
                        audio: "four",
                        options: ["4️⃣ Four", "1️⃣ One", "2️⃣ Two", "3️⃣ Three"],
                        correct: 0,
                        spanish: "cuatro",
                        english: "four"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'cinco' en inglés?",
                        audio: "five",
                        options: ["5️⃣ Five", "1️⃣ One", "2️⃣ Two", "3️⃣ Three"],
                        correct: 0,
                        spanish: "cinco",
                        english: "five"
                    }
                ]
            },
            level2: {
                title: "Constructores de Palabras",
                description: "Aprende frases simples en inglés",
                ageRange: "6-12 años",
                questions: [
                    // Emociones y estados
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'estoy feliz' en inglés?",
                        audio: "i_am_happy",
                        options: ["I am happy", "I am sad", "I am tired", "I am hungry"],
                        correct: 0,
                        spanish: "estoy feliz",
                        english: "I am happy"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'estoy triste' en inglés?",
                        audio: "i_am_sad",
                        options: ["I am sad", "I am happy", "I am angry", "I am scared"],
                        correct: 0,
                        spanish: "estoy triste",
                        english: "I am sad"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'estoy cansado' en inglés?",
                        audio: "i_am_tired",
                        options: ["I am tired", "I am happy", "I am sad", "I am hungry"],
                        correct: 0,
                        spanish: "estoy cansado",
                        english: "I am tired"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'tengo hambre' en inglés?",
                        audio: "i_am_hungry",
                        options: ["I am hungry", "I am thirsty", "I am tired", "I am happy"],
                        correct: 0,
                        spanish: "tengo hambre",
                        english: "I am hungry"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'tengo sed' en inglés?",
                        audio: "i_am_thirsty",
                        options: ["I am thirsty", "I am hungry", "I am tired", "I am happy"],
                        correct: 0,
                        spanish: "tengo sed",
                        english: "I am thirsty"
                    },
                    // Presentaciones
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'mi nombre es' en inglés?",
                        audio: "my_name_is",
                        options: ["My name is", "I am called", "My name are", "I name is"],
                        correct: 0,
                        spanish: "mi nombre es",
                        english: "My name is"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'tengo 8 años' en inglés?",
                        audio: "i_am_eight",
                        options: ["I am eight", "I have eight", "I am eight years", "I have eight years"],
                        correct: 0,
                        spanish: "tengo 8 años",
                        english: "I am eight"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'soy de España' en inglés?",
                        audio: "i_am_from_spain",
                        options: ["I am from Spain", "I am Spain", "I from Spain", "I am in Spain"],
                        correct: 0,
                        spanish: "soy de España",
                        english: "I am from Spain"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'me gusta jugar' en inglés?",
                        audio: "i_like_to_play",
                        options: ["I like to play", "I like play", "I like playing", "I like plays"],
                        correct: 0,
                        spanish: "me gusta jugar",
                        english: "I like to play"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'no me gusta' en inglés?",
                        audio: "i_dont_like",
                        options: ["I don't like", "I not like", "I don't likes", "I not likes"],
                        correct: 0,
                        spanish: "no me gusta",
                        english: "I don't like"
                    },
                    // Saludos y cortesía
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'buenos días' en inglés?",
                        audio: "good_morning",
                        options: ["Good morning", "Good afternoon", "Good evening", "Good night"],
                        correct: 0,
                        spanish: "buenos días",
                        english: "Good morning"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'buenas tardes' en inglés?",
                        audio: "good_afternoon",
                        options: ["Good afternoon", "Good morning", "Good evening", "Good night"],
                        correct: 0,
                        spanish: "buenas tardes",
                        english: "Good afternoon"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'buenas noches' en inglés?",
                        audio: "good_night",
                        options: ["Good night", "Good morning", "Good afternoon", "Good evening"],
                        correct: 0,
                        spanish: "buenas noches",
                        english: "Good night"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'gracias' en inglés?",
                        audio: "thank_you",
                        options: ["Thank you", "Please", "Sorry", "Hello"],
                        correct: 0,
                        spanish: "gracias",
                        english: "Thank you"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'por favor' en inglés?",
                        audio: "please",
                        options: ["Please", "Thank you", "Sorry", "Hello"],
                        correct: 0,
                        spanish: "por favor",
                        english: "Please"
                    },
                    // Familia
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'mamá' en inglés?",
                        audio: "mom",
                        options: ["Mom", "Dad", "Sister", "Brother"],
                        correct: 0,
                        spanish: "mamá",
                        english: "Mom"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'papá' en inglés?",
                        audio: "dad",
                        options: ["Dad", "Mom", "Sister", "Brother"],
                        correct: 0,
                        spanish: "papá",
                        english: "Dad"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'hermana' en inglés?",
                        audio: "sister",
                        options: ["Sister", "Brother", "Mom", "Dad"],
                        correct: 0,
                        spanish: "hermana",
                        english: "Sister"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'hermano' en inglés?",
                        audio: "brother",
                        options: ["Brother", "Sister", "Mom", "Dad"],
                        correct: 0,
                        spanish: "hermano",
                        english: "Brother"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'abuelo' en inglés?",
                        audio: "grandfather",
                        options: ["Grandfather", "Grandmother", "Father", "Mother"],
                        correct: 0,
                        spanish: "abuelo",
                        english: "Grandfather"
                    },
                    // Escuela
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'escuela' en inglés?",
                        audio: "school",
                        options: ["School", "House", "Park", "Store"],
                        correct: 0,
                        spanish: "escuela",
                        english: "School"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'maestro' en inglés?",
                        audio: "teacher",
                        options: ["Teacher", "Student", "Friend", "Family"],
                        correct: 0,
                        spanish: "maestro",
                        english: "Teacher"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'amigo' en inglés?",
                        audio: "friend",
                        options: ["Friend", "Family", "Teacher", "Student"],
                        correct: 0,
                        spanish: "amigo",
                        english: "Friend"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'libro' en inglés?",
                        audio: "book",
                        options: ["Book", "Pen", "Pencil", "Paper"],
                        correct: 0,
                        spanish: "libro",
                        english: "Book"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'lápiz' en inglés?",
                        audio: "pencil",
                        options: ["Pencil", "Pen", "Book", "Paper"],
                        correct: 0,
                        spanish: "lápiz",
                        english: "Pencil"
                    },
                    // Colores adicionales
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'blanco' en inglés?",
                        audio: "white",
                        options: ["White", "Black", "Red", "Blue"],
                        correct: 0,
                        spanish: "blanco",
                        english: "White"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'rosa' en inglés?",
                        audio: "pink",
                        options: ["Pink", "Purple", "Red", "Blue"],
                        correct: 0,
                        spanish: "rosa",
                        english: "Pink"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'morado' en inglés?",
                        audio: "purple",
                        options: ["Purple", "Pink", "Blue", "Red"],
                        correct: 0,
                        spanish: "morado",
                        english: "Purple"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'naranja' en inglés?",
                        audio: "orange_color",
                        options: ["Orange", "Yellow", "Red", "Pink"],
                        correct: 0,
                        spanish: "naranja",
                        english: "Orange"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'marrón' en inglés?",
                        audio: "brown",
                        options: ["Brown", "Black", "Gray", "White"],
                        correct: 0,
                        spanish: "marrón",
                        english: "Brown"
                    }
                ]
            },
            level3: {
                title: "Creadores de Historias",
                description: "Aprende conversaciones en inglés",
                ageRange: "12-18 años",
                questions: [
                    // Preguntas básicas
                    {
                        type: "translation",
                        question: "¿Cómo se dice '¿cómo estás?' en inglés?",
                        audio: "how_are_you",
                        options: ["How are you?", "What is your name?", "Where are you from?", "How old are you?"],
                        correct: 0,
                        spanish: "¿cómo estás?",
                        english: "How are you?"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice '¿cuál es tu nombre?' en inglés?",
                        audio: "what_is_your_name",
                        options: ["What is your name?", "How are you?", "Where are you from?", "How old are you?"],
                        correct: 0,
                        spanish: "¿cuál es tu nombre?",
                        english: "What is your name?"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice '¿de dónde eres?' en inglés?",
                        audio: "where_are_you_from",
                        options: ["Where are you from?", "What is your name?", "How are you?", "How old are you?"],
                        correct: 0,
                        spanish: "¿de dónde eres?",
                        english: "Where are you from?"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice '¿cuántos años tienes?' en inglés?",
                        audio: "how_old_are_you",
                        options: ["How old are you?", "What is your name?", "Where are you from?", "How are you?"],
                        correct: 0,
                        spanish: "¿cuántos años tienes?",
                        english: "How old are you?"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice '¿qué hora es?' en inglés?",
                        audio: "what_time_is_it",
                        options: ["What time is it?", "What day is it?", "What date is it?", "What month is it?"],
                        correct: 0,
                        spanish: "¿qué hora es?",
                        english: "What time is it?"
                    },
                    // Expresiones de gusto
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'me gusta' en inglés?",
                        audio: "i_like",
                        options: ["I like", "I love", "I want", "I need"],
                        correct: 0,
                        spanish: "me gusta",
                        english: "I like"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'me encanta' en inglés?",
                        audio: "i_love",
                        options: ["I love", "I like", "I want", "I need"],
                        correct: 0,
                        spanish: "me encanta",
                        english: "I love"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'no me gusta' en inglés?",
                        audio: "i_dont_like",
                        options: ["I don't like", "I not like", "I don't likes", "I not likes"],
                        correct: 0,
                        spanish: "no me gusta",
                        english: "I don't like"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'quiero' en inglés?",
                        audio: "i_want",
                        options: ["I want", "I need", "I like", "I love"],
                        correct: 0,
                        spanish: "quiero",
                        english: "I want"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'necesito' en inglés?",
                        audio: "i_need",
                        options: ["I need", "I want", "I like", "I love"],
                        correct: 0,
                        spanish: "necesito",
                        english: "I need"
                    },
                    // Preguntas de ubicación
                    {
                        type: "translation",
                        question: "¿Cómo se dice '¿dónde está el baño?' en inglés?",
                        audio: "where_is_bathroom",
                        options: ["Where is the bathroom?", "Where is the kitchen?", "Where is the bedroom?", "Where is the living room?"],
                        correct: 0,
                        spanish: "¿dónde está el baño?",
                        english: "Where is the bathroom?"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice '¿dónde está la estación?' en inglés?",
                        audio: "where_is_station",
                        options: ["Where is the station?", "Where is the airport?", "Where is the bus stop?", "Where is the train?"],
                        correct: 0,
                        spanish: "¿dónde está la estación?",
                        english: "Where is the station?"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice '¿dónde está el hospital?' en inglés?",
                        audio: "where_is_hospital",
                        options: ["Where is the hospital?", "Where is the doctor?", "Where is the pharmacy?", "Where is the clinic?"],
                        correct: 0,
                        spanish: "¿dónde está el hospital?",
                        english: "Where is the hospital?"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice '¿dónde está el restaurante?' en inglés?",
                        audio: "where_is_restaurant",
                        options: ["Where is the restaurant?", "Where is the café?", "Where is the bar?", "Where is the food?"],
                        correct: 0,
                        spanish: "¿dónde está el restaurante?",
                        english: "Where is the restaurant?"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice '¿dónde está el banco?' en inglés?",
                        audio: "where_is_bank",
                        options: ["Where is the bank?", "Where is the ATM?", "Where is the money?", "Where is the cash?"],
                        correct: 0,
                        spanish: "¿dónde está el banco?",
                        english: "Where is the bank?"
                    },
                    // Expresiones de comunicación
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'no entiendo' en inglés?",
                        audio: "i_dont_understand",
                        options: ["I don't understand", "I don't know", "I don't speak", "I don't want"],
                        correct: 0,
                        spanish: "no entiendo",
                        english: "I don't understand"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'no sé' en inglés?",
                        audio: "i_dont_know",
                        options: ["I don't know", "I don't understand", "I don't speak", "I don't want"],
                        correct: 0,
                        spanish: "no sé",
                        english: "I don't know"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'no hablo inglés' en inglés?",
                        audio: "i_dont_speak_english",
                        options: ["I don't speak English", "I don't know English", "I don't understand English", "I don't want English"],
                        correct: 0,
                        spanish: "no hablo inglés",
                        english: "I don't speak English"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice '¿puedes ayudarme?' en inglés?",
                        audio: "can_you_help_me",
                        options: ["Can you help me?", "Can you speak English?", "Can you repeat that?", "Can you show me?"],
                        correct: 0,
                        spanish: "¿puedes ayudarme?",
                        english: "Can you help me?"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice '¿puedes repetir eso?' en inglés?",
                        audio: "can_you_repeat_that",
                        options: ["Can you repeat that?", "Can you help me?", "Can you speak English?", "Can you show me?"],
                        correct: 0,
                        spanish: "¿puedes repetir eso?",
                        english: "Can you repeat that?"
                    },
                    // Expresiones de tiempo
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'hoy' en inglés?",
                        audio: "today",
                        options: ["Today", "Yesterday", "Tomorrow", "Now"],
                        correct: 0,
                        spanish: "hoy",
                        english: "Today"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'ayer' en inglés?",
                        audio: "yesterday",
                        options: ["Yesterday", "Today", "Tomorrow", "Now"],
                        correct: 0,
                        spanish: "ayer",
                        english: "Yesterday"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'mañana' en inglés?",
                        audio: "tomorrow",
                        options: ["Tomorrow", "Today", "Yesterday", "Now"],
                        correct: 0,
                        spanish: "mañana",
                        english: "Tomorrow"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'ahora' en inglés?",
                        audio: "now",
                        options: ["Now", "Today", "Yesterday", "Tomorrow"],
                        correct: 0,
                        spanish: "ahora",
                        english: "Now"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'después' en inglés?",
                        audio: "later",
                        options: ["Later", "Now", "Before", "After"],
                        correct: 0,
                        spanish: "después",
                        english: "Later"
                    },
                    // Expresiones de cortesía
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'disculpa' en inglés?",
                        audio: "excuse_me",
                        options: ["Excuse me", "Sorry", "Please", "Thank you"],
                        correct: 0,
                        spanish: "disculpa",
                        english: "Excuse me"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'lo siento' en inglés?",
                        audio: "i_am_sorry",
                        options: ["I am sorry", "Excuse me", "Please", "Thank you"],
                        correct: 0,
                        spanish: "lo siento",
                        english: "I am sorry"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'con permiso' en inglés?",
                        audio: "excuse_me_polite",
                        options: ["Excuse me", "Sorry", "Please", "Thank you"],
                        correct: 0,
                        spanish: "con permiso",
                        english: "Excuse me"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'de nada' en inglés?",
                        audio: "you_are_welcome",
                        options: ["You are welcome", "Thank you", "Please", "Sorry"],
                        correct: 0,
                        spanish: "de nada",
                        english: "You are welcome"
                    },
                    {
                        type: "translation",
                        question: "¿Cómo se dice 'hasta luego' en inglés?",
                        audio: "see_you_later",
                        options: ["See you later", "Goodbye", "Hello", "Thank you"],
                        correct: 0,
                        spanish: "hasta luego",
                        english: "See you later"
                    }
                ]
            }
        };
    }
    
    // ===== CONFIGURACIÓN DE LA INTERFAZ DEL JUEGO =====
    setupGameUI() {
        console.log('🎨 Configurando UI del juego...');
        
        // Crear contenedor del juego
        const gameContainer = document.createElement('div');
        gameContainer.id = 'gameContainer';
        gameContainer.className = 'game-container hidden';
        gameContainer.innerHTML = `
            <div class="game-header-bar">
                <div class="game-info">
                    <h2 class="level-title">Nivel 1: Exploradores de Sonidos</h2>
                    <div class="progress-info">
                        <span class="question-counter">Pregunta 1 de 3</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 0%"></div>
                        </div>
                    </div>
                </div>
                <div class="game-stats">
                    <div class="stat">
                        <span class="stat-label">Puntos</span>
                        <span class="stat-value" id="scoreDisplay">0</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Racha</span>
                        <span class="stat-value" id="streakDisplay">0</span>
                    </div>
                </div>
                <button class="close-game-btn" id="closeGameBtn">✕</button>
            </div>
            
            <div class="game-content">
                <div class="question-container">
                    <div class="ty-game-character">🐶</div>
                    <h3 class="question-text" id="questionText">¿Qué animal hace este sonido?</h3>
                    <div class="audio-controls">
                        <button class="audio-btn" id="playAudioBtn">🔊 Reproducir</button>
                    </div>
                </div>
                
                <div class="options-container" id="optionsContainer">
                    <!-- Las opciones se generarán dinámicamente -->
                </div>
                
                <div class="feedback-container hidden" id="feedbackContainer">
                    <div class="feedback-message" id="feedbackMessage"></div>
                    <button class="next-btn" id="nextBtn">
                        <span class="next-btn-text">Siguiente</span>
                        <span class="next-btn-icon">→</span>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(gameContainer);
        console.log('✅ Contenedor del juego agregado al DOM');
        
        // Agregar estilos específicos del juego
        this.addGameStyles();
        console.log('✅ Estilos del juego agregados');
    }
    
    addGameStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .game-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--bg-primary);
                z-index: 2000;
                display: flex;
                flex-direction: column;
                animation: slideIn 0.3s ease-out;
            }
            
            .game-container.hidden {
                display: none;
            }
            
            .game-header-bar {
                background: var(--bg-card);
                backdrop-filter: var(--blur-light);
                border-bottom: 2px solid var(--border-light);
                padding: 1rem 2rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 2rem;
            }
            
            .game-info {
                flex: 1;
            }
            
            .level-title {
                color: var(--primary-blue);
                margin: 0 0 0.5rem 0;
                font-size: 1.5rem;
            }
            
            .progress-info {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .question-counter {
                color: var(--text-secondary);
                font-size: 0.9rem;
                white-space: nowrap;
            }
            
            .progress-bar {
                flex: 1;
                height: 8px;
                background: var(--border-light);
                border-radius: 4px;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--primary-blue), var(--secondary-blue));
                border-radius: 4px;
                transition: width 0.3s ease;
            }
            
            .game-stats {
                display: flex;
                gap: 2rem;
            }
            
            .stat {
                text-align: center;
            }
            
            .stat-label {
                display: block;
                color: var(--text-secondary);
                font-size: 0.8rem;
                margin-bottom: 0.25rem;
            }
            
            .stat-value {
                display: block;
                color: var(--primary-blue);
                font-size: 1.5rem;
                font-weight: 700;
            }
            
            .close-game-btn {
                background: transparent;
                color: var(--text-secondary);
                border: 2px solid var(--border-light);
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                transition: all var(--transition-fast);
            }
            
            .close-game-btn:hover {
                background: var(--primary-blue);
                color: white;
                border-color: var(--primary-blue);
            }
            
            .game-content {
                flex: 1;
                padding: 2rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 2rem;
            }
            
            .question-container {
                text-align: center;
                max-width: 600px;
            }
            
            .ty-game-character {
                font-size: 4rem;
                filter: brightness(0.7) contrast(1.2);
                margin-bottom: 1rem;
                animation: bounce 2s infinite;
            }
            
            .question-text {
                color: var(--text-primary);
                font-size: 1.5rem;
                margin-bottom: 1.5rem;
                line-height: 1.4;
            }
            
            .audio-controls {
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin-bottom: 2rem;
            }
            
            .audio-btn, .hint-btn {
                background: var(--primary-blue);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 12px;
                font-weight: 500;
                transition: all var(--transition-fast);
                cursor: pointer;
            }
            
            .audio-btn:hover, .hint-btn:hover {
                background: var(--primary-blue-hover);
                transform: translateY(-2px);
            }
            
            .audio-btn.playing {
                background: var(--accent-green);
                animation: pulse 0.5s ease-in-out;
            }
            

            
            .options-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
                max-width: 800px;
                width: 100%;
            }
            
            .option-btn {
                background: var(--bg-card);
                border: 2px solid var(--border-light);
                border-radius: 16px;
                padding: 1.5rem;
                text-align: center;
                font-size: 1.1rem;
                font-weight: 500;
                color: var(--text-primary);
                transition: all var(--transition-fast);
                cursor: pointer;
                backdrop-filter: var(--blur-light);
            }
            
            .option-btn:hover {
                border-color: var(--primary-blue);
                transform: translateY(-3px);
                box-shadow: var(--shadow-lg);
            }
            
            .option-btn.correct {
                background: var(--accent-green);
                color: white;
                border-color: var(--accent-green);
            }
            
            .option-btn.incorrect {
                background: var(--accent-orange);
                color: white;
                border-color: var(--accent-orange);
            }
            
            .option-btn.disabled {
                pointer-events: none;
                opacity: 0.7;
            }
            
            .feedback-container {
                text-align: center;
                max-width: 500px;
            }
            
            .feedback-message {
                font-size: 1.2rem;
                margin-bottom: 1.5rem;
                padding: 1rem;
                border-radius: 12px;
                background: var(--bg-card);
                border: 2px solid var(--border-light);
            }
            
            .feedback-message.correct {
                border-color: var(--accent-green);
                background: rgba(16, 185, 129, 0.1);
                color: var(--accent-green);
            }
            
            .feedback-message.incorrect {
                border-color: var(--accent-orange);
                background: rgba(249, 115, 22, 0.1);
                color: var(--accent-orange);
            }
            
            .next-btn {
                background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                color: white;
                border: none;
                padding: 1.25rem 2.5rem;
                border-radius: 20px;
                font-size: 1.2rem;
                font-weight: 700;
                font-family: 'Fredoka', sans-serif;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
                box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
                letter-spacing: 0.5px;
                text-transform: uppercase;
                min-height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                cursor: pointer;
            }
            
            .next-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                transition: left 0.6s ease;
            }
            
            .next-btn:hover::before {
                left: 100%;
            }
            
            .next-btn:hover {
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                transform: translateY(-4px) scale(1.05);
                box-shadow: 0 12px 35px rgba(79, 70, 229, 0.4);
            }
            
            .next-btn:active {
                transform: translateY(-2px) scale(0.98);
                box-shadow: 0 6px 20px rgba(79, 70, 229, 0.3);
            }
            
            .next-btn.pulsing {
                animation: pulse-glow 2s infinite;
            }
            
            .next-btn.countdown {
                background: linear-gradient(135deg, #059669 0%, #10b981 100%);
            }
            
            .next-btn.countdown::after {
                content: attr(data-countdown);
                position: absolute;
                top: -8px;
                right: -8px;
                background: #ef4444;
                color: white;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                font-weight: 700;
                animation: bounce-countdown 1s infinite;
            }
            
            .next-btn-icon {
                font-size: 1.1rem;
                transition: transform 0.3s ease;
            }
            
            .next-btn:hover .next-btn-icon {
                transform: translateX(3px);
            }
            
            @keyframes pulse-glow {
                0%, 100% {
                    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
                }
                50% {
                    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.6), 0 0 20px rgba(79, 70, 229, 0.4);
                }
            }
            
            @keyframes bounce-countdown {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.1);
                }
            }
            
            /* ===== RESPONSIVE DESIGN PARA EL JUEGO ===== */
            
            /* ===== MÓVILES PEQUEÑOS (hasta 480px) ===== */
            @media (max-width: 480px) {
                .game-header-bar {
                    padding: 0.75rem;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .game-info {
                    text-align: center;
                }
                
                .level-title {
                    font-size: 1.2rem;
                    margin-bottom: 0.5rem;
                }
                
                .progress-info {
                    flex-direction: column;
                    gap: 0.5rem;
                    align-items: center;
                }
                
                .question-counter {
                    font-size: 0.8rem;
                }
                
                .progress-bar {
                    height: 6px;
                    width: 100%;
                    max-width: 200px;
                }
                
                .game-stats {
                    gap: 0.75rem;
                    justify-content: center;
                }
                
                .stat {
                    min-width: 60px;
                }
                
                .stat-label {
                    font-size: 0.7rem;
                }
                
                .stat-value {
                    font-size: 1.2rem;
                }
                
                .close-game-btn {
                    width: 35px;
                    height: 35px;
                    font-size: 1rem;
                }
                
                .game-content {
                    padding: 1rem 0.75rem 2rem 0.75rem;
                    gap: 1.5rem;
                    min-height: calc(100vh - 200px);
                    justify-content: space-between;
                }
                
                .question-container {
                    max-width: 100%;
                }
                
                .ty-game-character {
                    font-size: 3rem;
                    margin-bottom: 0.75rem;
                }
                
                .question-text {
                    font-size: 1.1rem;
                    margin-bottom: 1rem;
                    line-height: 1.3;
                }
                
                .audio-controls {
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-bottom: 1.5rem;
                }
                
                .audio-btn {
                    padding: 0.75rem 1.25rem;
                    font-size: 0.95rem;
                    min-height: 44px;
                    width: 100%;
                    max-width: 200px;
                }
                
                .options-container {
                    grid-template-columns: 1fr;
                    gap: 0.75rem;
                    max-width: 100%;
                }
                
                .option-btn {
                    padding: 1rem;
                    font-size: 1rem;
                    min-height: 50px;
                }
                
                .feedback-container {
                    max-width: 100%;
                    margin: 1rem 0;
                    padding: 0 0.5rem;
                }
                
                .feedback-message {
                    font-size: 1rem;
                    padding: 1rem;
                    margin-bottom: 1.5rem;
                }
                
                .next-btn {
                    padding: 1.25rem 2rem;
                    font-size: 1.1rem;
                    min-height: 60px;
                    margin: 1.5rem 0;
                    width: 100%;
                    max-width: 320px;
                    border-radius: 25px;
                    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
                    letter-spacing: 0.3px;
                    position: relative;
                }
                
                .next-btn.countdown::after {
                    width: 28px;
                    height: 28px;
                    font-size: 0.9rem;
                    top: -10px;
                    right: -10px;
                }
                }
            }
            
            /* ===== MÓVILES GRANDES (481px - 767px) ===== */
            @media (min-width: 481px) and (max-width: 767px) {
                .game-header-bar {
                    padding: 1rem;
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .game-info {
                    text-align: center;
                }
                
                .level-title {
                    font-size: 1.4rem;
                }
                
                .progress-info {
                    justify-content: center;
                }
                
                .game-stats {
                    gap: 1rem;
                    justify-content: center;
                }
                
                .game-content {
                    padding: 1.5rem 1.5rem 2.5rem 1.5rem;
                    gap: 2rem;
                    min-height: calc(100vh - 250px);
                    justify-content: space-between;
                }
                
                .ty-game-character {
                    font-size: 3.5rem;
                }
                
                .question-text {
                    font-size: 1.3rem;
                }
                
                .audio-controls {
                    gap: 1rem;
                }
                
                .audio-btn {
                    padding: 0.875rem 1.5rem;
                    font-size: 1rem;
                    min-height: 46px;
                }
                
                .options-container {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }
                
                .option-btn {
                    padding: 1.25rem;
                    font-size: 1.05rem;
                }
                
                .next-btn {
                    padding: 1.5rem 2.5rem;
                    font-size: 1.2rem;
                    min-height: 65px;
                    margin: 2rem 0;
                    width: 100%;
                    max-width: 380px;
                    border-radius: 30px;
                    box-shadow: 0 10px 30px rgba(79, 70, 229, 0.35);
                    letter-spacing: 0.4px;
                }
                
                .next-btn.countdown::after {
                    width: 30px;
                    height: 30px;
                    font-size: 1rem;
                    top: -12px;
                    right: -12px;
                }
            }
            
            /* ===== TABLETS (768px - 1023px) ===== */
            @media (min-width: 768px) and (max-width: 1023px) {
                .game-header-bar {
                    padding: 1.5rem;
                }
                
                .game-content {
                    padding: 2rem;
                }
                
                .ty-game-character {
                    font-size: 4rem;
                }
                
                .question-text {
                    font-size: 1.5rem;
                }
                
                .options-container {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                }
                
                .option-btn {
                    padding: 1.5rem;
                    font-size: 1.1rem;
                }
            }
            
            /* ===== DESKTOP (1024px y más) ===== */
            @media (min-width: 1024px) {
                .game-header-bar {
                    padding: 2rem;
                }
                
                .game-content {
                    padding: 3rem;
                }
                
                .ty-game-character {
                    font-size: 5rem;
                }
                
                .question-text {
                    font-size: 1.8rem;
                }
                
                .options-container {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 2rem;
                    max-width: 900px;
                }
                
                .option-btn {
                    padding: 2rem;
                    font-size: 1.2rem;
                }
            }
            
            /* ===== LANDSCAPE EN MÓVILES ===== */
            @media (orientation: landscape) and (max-height: 500px) {
                .game-header-bar {
                    padding: 0.5rem 1rem;
                }
                
                .level-title {
                    font-size: 1.1rem;
                    margin-bottom: 0.25rem;
                }
                
                .progress-info {
                    gap: 0.5rem;
                }
                
                .question-counter {
                    font-size: 0.8rem;
                }
                
                .game-content {
                    padding: 1rem;
                    gap: 1rem;
                }
                
                .ty-game-character {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                }
                
                .question-text {
                    font-size: 1rem;
                    margin-bottom: 0.75rem;
                }
                
                .audio-controls {
                    margin-bottom: 1rem;
                }
                
                .audio-btn {
                    padding: 0.5rem 1rem;
                    font-size: 0.9rem;
                    min-height: 40px;
                }
                
                .options-container {
                    gap: 0.75rem;
                }
                
                .option-btn {
                    padding: 0.75rem;
                    font-size: 0.9rem;
                    min-height: 40px;
                }
                
                .next-btn {
                    padding: 1rem 1.5rem;
                    font-size: 1rem;
                    min-height: 50px;
                    margin: 0.75rem 0;
                    border-radius: 20px;
                }
                
                .next-btn.countdown::after {
                    width: 20px;
                    height: 20px;
                    font-size: 0.7rem;
                    top: -6px;
                    right: -6px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // ===== CONFIGURACIÓN DE EVENTOS =====
    setupEventListeners() {
        console.log('🔧 Configurando event listeners...');
        console.log('🔍 Buscando elementos en el DOM...');
        
        // Evitar configurar event listeners múltiples veces
        if (this.eventListenersConfigured) {
            console.log('⚠️ Event listeners ya configurados, saltando...');
            return;
        }
        
        // Función para configurar event listeners con retraso
        const configureListeners = () => {
            // Verificar si el contenedor del juego existe
            const gameContainer = document.getElementById('gameContainer');
            console.log('🎮 Contenedor del juego:', gameContainer ? 'Encontrado' : 'NO ENCONTRADO');
            
            if (!gameContainer) {
                console.error('❌ Contenedor del juego no encontrado, reintentando...');
                setTimeout(configureListeners, 100);
                return;
            }
            
            // Botón de cerrar juego
            const closeBtn = document.getElementById('closeGameBtn');
            console.log('❌ Botón cerrar:', closeBtn ? 'Encontrado' : 'NO ENCONTRADO');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.closeGame();
                });
                console.log('✅ Event listener para cerrar juego configurado');
            } else {
                console.error('❌ No se encontró el botón closeGameBtn');
            }
            
            // Botón de reproducir audio
            const playBtn = document.getElementById('playAudioBtn');
            console.log('🔊 Botón reproducir:', playBtn ? 'Encontrado' : 'NO ENCONTRADO');
            if (playBtn) {
                playBtn.addEventListener('click', () => {
                    console.log('🔊 Click en botón reproducir detectado');
                    this.playAudio();
                });
                console.log('✅ Event listener para reproducir audio configurado');
            } else {
                console.error('❌ No se encontró el botón playAudioBtn');
            }
            

            
            // Botón de siguiente
            const nextBtn = document.getElementById('nextBtn');
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    this.nextQuestion();
                });
                console.log('✅ Event listener para siguiente configurado');
            } else {
                console.error('❌ No se encontró el botón nextBtn');
            }
            
            // Navegación por teclado
            document.addEventListener('keydown', (e) => {
                if (!this.isGameActive) return;
                
                switch (e.key) {
                    case 'Escape':
                        this.closeGame();
                        break;
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                        const optionIndex = parseInt(e.key) - 1;
                        this.selectOption(optionIndex);
                        break;
                    case 'Enter':
                        if (document.getElementById('nextBtn').classList.contains('hidden')) {
                            this.nextQuestion();
                        }
                        break;
                }
            });
            
            // Marcar que los event listeners ya están configurados
            this.eventListenersConfigured = true;
            console.log('✅ Todos los event listeners configurados correctamente');
        };
        
        // Configurar event listeners con un pequeño retraso para asegurar que el DOM esté listo
        setTimeout(configureListeners, 50);
    }
    
    // ===== INICIO DEL JUEGO =====
    startLevel(level) {
        console.log(`🚀 Iniciando startLevel con nivel: ${level}`);
        
        this.currentLevel = level;
        this.currentQuestion = 0;
        this.score = 0;
        this.streak = 0;
        this.isGameActive = true;
        
        // Mostrar contenedor del juego
        const gameContainer = document.getElementById('gameContainer');
        if (gameContainer) {
            gameContainer.classList.remove('hidden');
            console.log('✅ Contenedor del juego mostrado');
        } else {
            console.error('❌ No se encontró el contenedor del juego');
        }
        
        // Configurar event listeners DESPUÉS de mostrar la UI
        this.setupEventListeners();
        
        // Actualizar información del nivel
        this.updateLevelInfo();
        
        // Cargar primera pregunta
        this.loadQuestion();
        
        // Animar entrada
        if (window.animationManager) {
            window.animationManager.animateTyEmotion('excited');
        }
        
        console.log(`✅ Nivel ${level} iniciado correctamente`);
    }
    
    updateLevelInfo() {
        const levelData = this.gameData[`level${this.currentLevel}`];
        const levelTitle = document.querySelector('.level-title');
        levelTitle.textContent = `Nivel ${this.currentLevel}: ${levelData.title}`;
        
        this.updateProgress();
        this.updateStats();
    }
    
    // ===== CARGA DE PREGUNTAS =====
    loadQuestion() {
        const levelData = this.gameData[`level${this.currentLevel}`];
        const question = levelData.questions[this.currentQuestion];
        
        if (!question) {
            this.finishLevel();
            return;
        }
        
        // Actualizar texto de la pregunta
        document.getElementById('questionText').textContent = question.question;
        
        // Generar opciones
        this.generateOptions(question);
        
        // Actualizar contador
        document.querySelector('.question-counter').textContent = 
            `Pregunta ${this.currentQuestion + 1} de ${levelData.questions.length}`;
        
        // Actualizar progreso
        this.updateProgress();
        
        // Ocultar feedback
        document.getElementById('feedbackContainer').classList.add('hidden');
        
        // Habilitar opciones
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.classList.remove('disabled', 'correct', 'incorrect');
        });
    }
    
    generateOptions(question) {
        const optionsContainer = document.getElementById('optionsContainer');
        optionsContainer.innerHTML = '';
        
        // Crear una copia de las opciones para mezclar
        const shuffledOptions = [...question.options];
        const correctAnswer = shuffledOptions[question.correct];
        
        // Mezclar las opciones aleatoriamente
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }
        
        // Encontrar la nueva posición de la respuesta correcta
        const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);
        
        // Crear los botones con las opciones mezcladas
        shuffledOptions.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.textContent = option;
            optionBtn.dataset.index = index;
            optionBtn.dataset.correct = (index === newCorrectIndex).toString();
            
            optionBtn.addEventListener('click', () => {
                this.selectOption(index, newCorrectIndex);
            });
            
            optionsContainer.appendChild(optionBtn);
        });
        
        // Guardar el índice correcto actualizado para esta pregunta
        this.currentCorrectIndex = newCorrectIndex;
        
        console.log(`🎲 Opciones mezcladas. Respuesta correcta ahora en posición: ${newCorrectIndex + 1}`);
    }
    
    // ===== SELECCIÓN DE OPCIONES =====
    selectOption(optionIndex, correctIndex = null) {
        if (!this.isGameActive) return;
        
        const levelData = this.gameData[`level${this.currentLevel}`];
        const question = levelData.questions[this.currentQuestion];
        
        // Usar el índice correcto mezclado si está disponible, sino usar el original
        const actualCorrectIndex = correctIndex !== null ? correctIndex : question.correct;
        const isCorrect = optionIndex === actualCorrectIndex;
        
        // Deshabilitar todas las opciones
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.classList.add('disabled');
        });
        
        // Marcar opción seleccionada
        const selectedBtn = optionBtns[optionIndex];
        selectedBtn.classList.add(isCorrect ? 'correct' : 'incorrect');
        
        // Marcar respuesta correcta si es incorrecta
        if (!isCorrect) {
            const correctBtn = optionBtns[actualCorrectIndex];
            correctBtn.classList.add('correct');
        }
        
        // Actualizar puntuación
        if (isCorrect) {
            this.score += 10;
            this.streak++;
            
            // Bonus por racha
            if (this.streak >= 3) {
                this.score += 5;
            }
            
            // Efectos de éxito
            if (window.animationManager) {
                window.animationManager.createConfettiBurst(
                    selectedBtn.offsetLeft + selectedBtn.offsetWidth / 2,
                    selectedBtn.offsetTop
                );
            }
        } else {
            this.streak = 0;
        }
        
        this.updateStats();
        this.showFeedback(isCorrect, question);
    }
    
    showFeedback(isCorrect, question) {
        const feedbackContainer = document.getElementById('feedbackContainer');
        const feedbackMessage = document.getElementById('feedbackMessage');
        const nextBtn = document.getElementById('nextBtn');
        
        feedbackMessage.textContent = isCorrect 
            ? `¡Correcto! "${question.spanish}" se dice "${question.english}" en inglés.`
            : `Incorrecto. La respuesta correcta es "${question.english}".`;
        
        feedbackMessage.className = `feedback-message ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackContainer.classList.remove('hidden');
        
        // Configurar el botón Siguiente con nuevas funcionalidades
        this.setupNextButton(isCorrect);
        
        // Reproducir sonido de feedback
        if (window.audioManager) {
            if (isCorrect) {
                window.audioManager.playCorrect();
                window.audioManager.playTyHappy();
            } else {
                window.audioManager.playIncorrect();
                window.audioManager.playTyEncouragement();
            }
        }
        
        // Animar Ty
        if (window.animationManager) {
            window.animationManager.animateTyEmotion(isCorrect ? 'happy' : 'friendly');
        }
    }
    
    // ===== CONFIGURACIÓN DEL BOTÓN SIGUIENTE =====
    setupNextButton(isCorrect) {
        const nextBtn = document.getElementById('nextBtn');
        if (!nextBtn) return;
        
        // Limpiar timers anteriores
        this.clearNextButtonTimers();
        
        // Configurar el botón según la respuesta
        if (isCorrect) {
            // Respuesta correcta: botón verde con pulso
            nextBtn.classList.add('pulsing');
            nextBtn.classList.remove('countdown');
            nextBtn.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
            
            // Auto-avance más rápido para respuestas correctas
            this.startAutoAdvance(3);
        } else {
            // Respuesta incorrecta: botón azul con countdown
            nextBtn.classList.remove('pulsing');
            nextBtn.classList.add('countdown');
            nextBtn.style.background = 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)';
            
            // Auto-avance más lento para respuestas incorrectas
            this.startAutoAdvance(this.countdownDuration);
        }
        
        // Agregar efectos de sonido al botón
        this.addNextButtonSoundEffects(nextBtn);
        
        // Agregar efectos táctiles en móviles
        this.addNextButtonTouchEffects(nextBtn);
        
        console.log('🎯 Botón Siguiente configurado con nuevas funcionalidades');
    }
    
    startAutoAdvance(duration) {
        if (!this.enableAutoAdvance) return;
        
        const nextBtn = document.getElementById('nextBtn');
        if (!nextBtn) return;
        
        let countdown = duration;
        
        // Actualizar el countdown en el botón
        const updateCountdown = () => {
            if (nextBtn.classList.contains('countdown')) {
                nextBtn.setAttribute('data-countdown', countdown);
            }
        };
        
        updateCountdown();
        
        this.nextButtonCountdown = setInterval(() => {
            countdown--;
            updateCountdown();
            
            if (countdown <= 0) {
                this.clearNextButtonTimers();
                this.nextQuestion();
            }
        }, 1000);
        
        // Efecto visual de countdown
        this.autoAdvanceTimer = setTimeout(() => {
            if (nextBtn.classList.contains('countdown')) {
                nextBtn.style.animation = 'pulse-glow 0.5s infinite';
            }
        }, (duration - 2) * 1000);
    }
    
    clearNextButtonTimers() {
        if (this.nextButtonCountdown) {
            clearInterval(this.nextButtonCountdown);
            this.nextButtonCountdown = null;
        }
        if (this.autoAdvanceTimer) {
            clearTimeout(this.autoAdvanceTimer);
            this.autoAdvanceTimer = null;
        }
    }
    
    addNextButtonSoundEffects(button) {
        // Sonido al hacer hover
        button.addEventListener('mouseenter', () => {
            if (window.audioManager) {
                window.audioManager.playHover();
            }
        });
        
        // Sonido al hacer clic
        button.addEventListener('click', () => {
            if (window.audioManager) {
                window.audioManager.playClick();
                window.audioManager.playSuccess();
            }
            
            // Efecto visual de clic
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    }
    
    addNextButtonTouchEffects(button) {
        // Efectos táctiles para móviles
        let touchStartTime = 0;
        
        button.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
            button.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', (e) => {
            const touchDuration = Date.now() - touchStartTime;
            
            if (touchDuration < 200) {
                // Tocar rápido - efecto de vibración
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }
            
            button.style.transform = '';
        });
        
        // Prevenir zoom en doble toque
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
        });
    }
    
    // ===== FUNCIONES DE AUDIO Y PISTAS =====
    playAudio() {
        console.log('🔊 Botón reproducir clickeado!');
        
        const levelData = this.gameData[`level${this.currentLevel}`];
        const question = levelData.questions[this.currentQuestion];
        
        // Mostrar feedback visual inmediatamente
        const playBtn = document.getElementById('playAudioBtn');
        if (playBtn) {
            playBtn.classList.add('playing');
            setTimeout(() => {
                playBtn.classList.remove('playing');
            }, 1000);
        }
        
        // Usar Text-to-Speech para pronunciar la palabra/frase
        if ('speechSynthesis' in window) {
            console.log('🎤 Usando Text-to-Speech para pronunciar...');
            
            // Crear el mensaje de voz según el nivel
            let speechText = '';
            let speechLang = 'en-US'; // Siempre pronunciar en inglés para aprender
            
            switch (this.currentLevel) {
                case 1:
                    // Nivel 1: Pronunciar solo en inglés (palabras simples)
                    speechText = question.english;
                    break;
                case 2:
                    // Nivel 2: Pronunciar solo en inglés (frases simples)
                    speechText = question.english;
                    break;
                case 3:
                    // Nivel 3: Pronunciar solo en inglés (conversaciones)
                    speechText = question.english;
                    break;
                default:
                    speechText = question.english;
            }
            
            // Crear y configurar el utterance
            const utterance = new SpeechSynthesisUtterance(speechText);
            utterance.lang = speechLang;
            utterance.rate = 0.8; // Velocidad más lenta para niños
            utterance.pitch = 1.1; // Tono ligeramente más alto
            utterance.volume = 1.0;
            
            // Seleccionar una voz apropiada
            const voices = speechSynthesis.getVoices();
            const preferredVoice = voices.find(voice => 
                voice.lang.startsWith(speechLang) && 
                (voice.name.includes('Female') || voice.name.includes('female'))
            ) || voices.find(voice => voice.lang.startsWith(speechLang)) || voices[0];
            
            if (preferredVoice) {
                utterance.voice = preferredVoice;
                console.log(`🎤 Usando voz: ${preferredVoice.name} (${preferredVoice.lang})`);
            }
            
            // Reproducir el audio
            speechSynthesis.speak(utterance);
            
            // También reproducir un sonido de fondo del AudioManager
            if (window.audioManager) {
                window.audioManager.playClick();
            }
            
            console.log(`🎤 Pronunciando: "${speechText}" en ${speechLang}`);
            
        } else {
            console.warn('⚠️ Text-to-Speech no disponible, usando AudioManager...');
            
            // Fallback al AudioManager si TTS no está disponible
            if (window.audioManager) {
                switch (this.currentLevel) {
                    case 1:
                        if (question.audio.includes('perro')) {
                            window.audioManager.playTyBark();
                        } else if (question.audio.includes('rojo')) {
                            window.audioManager.playCorrect();
                        } else if (question.audio.includes('circulo')) {
                            window.audioManager.playSuccess();
                        } else {
                            window.audioManager.playClick();
                        }
                        break;
                    case 2:
                        if (question.audio.includes('cat')) {
                            window.audioManager.playTyHappy();
                        } else if (question.audio.includes('i_am_happy')) {
                            window.audioManager.playCorrect();
                        } else if (question.audio.includes('house')) {
                            window.audioManager.playSuccess();
                        } else {
                            window.audioManager.playClick();
                        }
                        break;
                    case 3:
                        if (question.audio.includes('story')) {
                            window.audioManager.playTyEncouragement();
                        } else if (question.audio.includes('goes')) {
                            window.audioManager.playCorrect();
                        } else if (question.audio.includes('weather')) {
                            window.audioManager.playSuccess();
                        } else {
                            window.audioManager.playClick();
                        }
                        break;
                    default:
                        window.audioManager.playClick();
                }
            }
        }
        
        console.log(`🎵 Reproduciendo audio para: ${question.audio}`);
    }
    

    
    // ===== NAVEGACIÓN DE PREGUNTAS =====
    nextQuestion() {
        // Limpiar timers del botón Siguiente
        this.clearNextButtonTimers();
        
        // Resetear el botón Siguiente
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.classList.remove('pulsing', 'countdown');
            nextBtn.style.background = '';
            nextBtn.style.animation = '';
            nextBtn.removeAttribute('data-countdown');
        }
        
        this.currentQuestion++;
        
        const levelData = this.gameData[`level${this.currentLevel}`];
        if (this.currentQuestion >= levelData.questions.length) {
            this.finishLevel();
        } else {
            this.loadQuestion();
        }
    }
    
    // ===== FINALIZACIÓN DEL NIVEL =====
    finishLevel() {
        this.isGameActive = false;
        
        const levelData = this.gameData[`level${this.currentLevel}`];
        const totalQuestions = levelData.questions.length;
        const percentage = Math.round((this.score / (totalQuestions * 10)) * 100);
        
        // Mostrar resultados
        this.showResults(percentage, totalQuestions);
        
        // Guardar progreso
        this.saveProgress();
        
        console.log(`Nivel ${this.currentLevel} completado. Puntuación: ${this.score}/${totalQuestions * 10}`);
    }
    
    showResults(percentage, totalQuestions) {
        const gameContent = document.querySelector('.game-content');
        gameContent.innerHTML = `
            <div class="results-container">
                <div class="ty-game-character">🐶</div>
                <h2>¡Nivel Completado!</h2>
                <div class="results-stats">
                    <div class="result-stat">
                        <span class="result-label">Puntuación</span>
                        <span class="result-value">${this.score}/${totalQuestions * 10}</span>
                    </div>
                    <div class="result-stat">
                        <span class="result-label">Porcentaje</span>
                        <span class="result-value">${percentage}%</span>
                    </div>
                </div>
                <div class="results-message">
                    ${this.getResultsMessage(percentage)}
                </div>
                <div class="results-actions">
                    <button class="retry-btn" id="retryBtn">Reintentar</button>
                    <button class="next-level-btn" id="nextLevelBtn">Siguiente Nivel</button>
                    <button class="menu-btn" id="menuBtn">Menú Principal</button>
                </div>
            </div>
        `;
        
        // Eventos de los botones de resultados
        document.getElementById('retryBtn').addEventListener('click', () => {
            this.startLevel(this.currentLevel);
        });
        
        document.getElementById('nextLevelBtn').addEventListener('click', () => {
            if (this.currentLevel < 3) {
                this.startLevel(this.currentLevel + 1);
            } else {
                this.closeGame();
            }
        });
        
        document.getElementById('menuBtn').addEventListener('click', () => {
            this.closeGame();
        });
        
        // Efectos de celebración
        if (window.animationManager) {
            window.animationManager.createConfettiBurst(
                window.innerWidth / 2,
                window.innerHeight / 2
            );
        }
    }
    
    getResultsMessage(percentage) {
        if (percentage >= 90) {
            return "¡Excelente trabajo! Eres un maestro del inglés.";
        } else if (percentage >= 70) {
            return "¡Muy bien! Sigues mejorando.";
        } else if (percentage >= 50) {
            return "Buen intento. ¡Sigue practicando!";
        } else {
            return "No te rindas. ¡La práctica hace al maestro!";
        }
    }
    
    // ===== ACTUALIZACIÓN DE INTERFAZ =====
    updateProgress() {
        const levelData = this.gameData[`level${this.currentLevel}`];
        const progress = (this.currentQuestion / levelData.questions.length) * 100;
        
        const progressFill = document.querySelector('.progress-fill');
        progressFill.style.width = progress + '%';
    }
    
    updateStats() {
        document.getElementById('scoreDisplay').textContent = this.score;
        document.getElementById('streakDisplay').textContent = this.streak;
    }
    
    // ===== PERSISTENCIA DE DATOS =====
    saveProgress() {
        const progress = {
            level: this.currentLevel,
            score: this.score,
            date: new Date().toISOString()
        };
        
        const savedProgress = JSON.parse(localStorage.getItem('gameProgress') || '[]');
        savedProgress.push(progress);
        localStorage.setItem('gameProgress', JSON.stringify(savedProgress));
        
        // Actualizar estadísticas globales
        const totalScore = parseInt(localStorage.getItem('totalScore') || '0');
        localStorage.setItem('totalScore', totalScore + this.score);
    }
    
    loadUserProgress() {
        const savedProgress = JSON.parse(localStorage.getItem('gameProgress') || '[]');
        const totalScore = parseInt(localStorage.getItem('totalScore') || '0');
        
        // Actualizar estadísticas en la pantalla de progreso
        const statValues = document.querySelectorAll('.stat-value');
        if (statValues.length >= 3) {
            statValues[0].textContent = totalScore; // Puntos totales
            statValues[1].textContent = this.getHighestLevel(savedProgress); // Nivel actual
            statValues[2].textContent = this.getAchievementCount(savedProgress); // Logros
        }
    }
    
    getHighestLevel(progress) {
        if (progress.length === 0) return 1;
        return Math.max(...progress.map(p => p.level));
    }
    
    getAchievementCount(progress) {
        const highScores = progress.filter(p => p.score >= 25).length;
        return highScores;
    }
    
    // ===== CIERRE DEL JUEGO =====
    closeGame() {
        // Limpiar timers del botón Siguiente
        this.clearNextButtonTimers();
        
        const gameContainer = document.getElementById('gameContainer');
        gameContainer.classList.add('hidden');
        
        this.isGameActive = false;
        
        // Navegar de vuelta a la pantalla de niveles
        if (window.tyGameApp) {
            window.tyGameApp.navigateToSection('levels');
        }
        
        console.log('Juego cerrado');
    }
    
    // ===== CONFIGURACIÓN DEL BOTÓN SIGUIENTE =====
    setAutoAdvance(enabled) {
        this.enableAutoAdvance = enabled;
        console.log(`🔄 Auto-avance ${enabled ? 'habilitado' : 'deshabilitado'}`);
    }
    
    setCountdownDuration(duration) {
        this.countdownDuration = duration;
        console.log(`⏱️ Duración del countdown establecida en ${duration} segundos`);
    }
    
    // ===== UTILIDADES =====
    getCurrentLevel() {
        return this.currentLevel;
    }
    
    getScore() {
        return this.score;
    }
    
    getStreak() {
        return this.streak;
    }
}

// ===== INICIALIZACIÓN =====
let tyGame;

document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM cargado, inicializando TyGame...');
    try {
        tyGame = new TyGame();
        window.tyGame = tyGame;
        console.log('✅ TyGame inicializado correctamente');
        
        // Conectar con la aplicación principal
        if (window.tyGameApp) {
            console.log('🔗 Conectando con tyGameApp...');
            // Sobrescribir el método startLevel para integrar con el juego
            const originalStartLevel = window.tyGameApp.startLevel;
            window.tyGameApp.startLevel = function(level) {
                console.log(`🎮 tyGameApp.startLevel(${level}) llamado`);
                if (window.tyGame) {
                    window.tyGame.startLevel(level);
                } else {
                    console.warn('⚠️ window.tyGame no encontrado, usando método original');
                    originalStartLevel.call(this, level);
                }
            };
            console.log('✅ Conexión con tyGameApp establecida');
        } else {
            console.warn('⚠️ tyGameApp no encontrado');
        }
    } catch (error) {
        console.error('❌ Error al inicializar el juego:', error);
    }
});

// ===== EXPORTACIÓN =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TyGame;
}
