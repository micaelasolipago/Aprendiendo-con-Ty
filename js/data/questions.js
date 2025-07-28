// Base de datos de preguntas para cada nivel
const GAME_DATA = {
    // Nivel 1: Exploradores (3-6 años) - Vocabulario básico e identificación
    level1: [
        // Preguntas 1-10: Identificación de objetos comunes
        {
            id: 1,
            type: 'image-choice',
            question: '¿Cómo se dice "manzana" en inglés?',
            image: 'images/apple.jpg',
            options: ['apple', 'orange', 'banana'],
            correct: 0,
            hint: 'Es roja y es muy dulce',
            audio: 'audio/words/apple.mp3',
            tyMessage: '¡Muy bien! Apple es manzana en inglés'
        },
        {
            id: 2,
            type: 'image-choice',
            question: '¿Qué animal es este?',
            image: 'images/cat.jpg',
            options: ['dog', 'cat', 'bird'],
            correct: 1,
            hint: 'Este animal dice "meow"',
            audio: 'audio/words/cat.mp3',
            tyMessage: '¡Excelente! Es un cat (gato)'
        },
        {
            id: 3,
            type: 'image-choice',
            question: '¿Cómo se dice "perro" en inglés?',
            image: 'images/dog.jpg',
            options: ['cat', 'bird', 'dog'],
            correct: 2,
            hint: 'Como yo, Ty! Woof woof!',
            audio: 'audio/words/dog.mp3',
            tyMessage: '¡Perfecto! Dog significa perro, como yo'
        },
        {
            id: 4,
            type: 'image-choice',
            question: '¿Qué color es este?',
            image: 'images/red.jpg',
            options: ['blue', 'red', 'green'],
            correct: 1,
            hint: 'Es el color de las fresas',
            audio: 'audio/words/red.mp3',
            tyMessage: '¡Genial! Red es rojo en inglés'
        },
        {
            id: 5,
            type: 'image-choice',
            question: '¿Cómo se dice "casa" en inglés?',
            image: 'images/house.jpg',
            options: ['car', 'house', 'tree'],
            correct: 1,
            hint: 'Es donde vives con tu familia',
            audio: 'audio/words/house.mp3',
            tyMessage: '¡Muy bien! House es casa'
        },
        {
            id: 6,
            type: 'image-choice',
            question: '¿Qué fruta es esta?',
            image: 'images/banana.jpg',
            options: ['apple', 'banana', 'orange'],
            correct: 1,
            hint: 'Es amarilla y alargada',
            audio: 'audio/words/banana.mp3',
            tyMessage: '¡Excelente! Banana en inglés'
        },
        {
            id: 7,
            type: 'image-choice',
            question: '¿Cómo se dice "carro" en inglés?',
            image: 'images/car.jpg',
            options: ['car', 'bus', 'bike'],
            correct: 0,
            hint: 'Tiene 4 ruedas y va por la calle',
            audio: 'audio/words/car.mp3',
            tyMessage: '¡Perfecto! Car es carro en inglés'
        },
        {
            id: 8,
            type: 'image-choice',
            question: '¿Qué color es este?',
            image: 'images/blue.jpg',
            options: ['red', 'blue', 'yellow'],
            correct: 1,
            hint: 'Es el color del cielo',
            audio: 'audio/words/blue.mp3',
            tyMessage: '¡Genial! Blue es azul'
        },
        {
            id: 9,
            type: 'image-choice',
            question: '¿Cómo se dice "libro" en inglés?',
            image: 'images/book.jpg',
            options: ['pen', 'book', 'table'],
            correct: 1,
            hint: 'Tiene páginas y puedes leer',
            audio: 'audio/words/book.mp3',
            tyMessage: '¡Muy bien! Book es libro'
        },
        {
            id: 10,
            type: 'image-choice',
            question: '¿Qué animal hace "moo"?',
            image: 'images/cow.jpg',
            options: ['pig', 'cow', 'sheep'],
            correct: 1,
            hint: 'Da leche y es grande',
            audio: 'audio/words/cow.mp3',
            tyMessage: '¡Excelente! Cow es vaca'
        },

        // Preguntas 11-20: Números y partes del cuerpo
        {
            id: 11,
            type: 'audio-choice',
            question: 'Escucha y elige el número correcto',
            options: ['one', 'two', 'three'],
            correct: 0,
            hint: 'Es el primer número',
            audio: 'audio/numbers/one.mp3',
            tyMessage: '¡Perfecto! One es uno'
        },
        {
            id: 12,
            type: 'image-choice',
            question: '¿Cómo se dice "ojo" en inglés?',
            image: 'images/eye.jpg',
            options: ['ear', 'eye', 'nose'],
            correct: 1,
            hint: 'Con esto puedes ver',
            audio: 'audio/body/eye.mp3',
            tyMessage: '¡Muy bien! Eye es ojo'
        },
        {
            id: 13,
            type: 'audio-choice',
            question: 'Escucha el número',
            options: ['one', 'two', 'three'],
            correct: 1,
            hint: 'Viene después del one',
            audio: 'audio/numbers/two.mp3',
            tyMessage: '¡Genial! Two es dos'
        },
        {
            id: 14,
            type: 'image-choice',
            question: '¿Qué parte del cuerpo es esta?',
            image: 'images/hand.jpg',
            options: ['foot', 'hand', 'head'],
            correct: 1,
            hint: 'La usas para tocar y escribir',
            audio: 'audio/body/hand.mp3',
            tyMessage: '¡Excelente! Hand es mano'
        },
        {
            id: 15,
            type: 'audio-choice',
            question: 'Escucha el número',
            options: ['two', 'three', 'four'],
            correct: 1,
            hint: 'Viene después del two',
            audio: 'audio/numbers/three.mp3',
            tyMessage: '¡Perfecto! Three es tres'
        },
        {
            id: 16,
            type: 'image-choice',
            question: '¿Cómo se dice "cabeza" en inglés?',
            image: 'images/head.jpg',
            options: ['hand', 'foot', 'head'],
            correct: 2,
            hint: 'Está arriba de todo tu cuerpo',
            audio: 'audio/body/head.mp3',
            tyMessage: '¡Muy bien! Head es cabeza'
        },
        {
            id: 17,
            type: 'audio-choice',
            question: 'Escucha el número',
            options: ['three', 'four', 'five'],
            correct: 1,
            hint: 'Viene después del three',
            audio: 'audio/numbers/four.mp3',
            tyMessage: '¡Genial! Four es cuatro'
        },
        {
            id: 18,
            type: 'image-choice',
            question: '¿Qué parte del cuerpo es esta?',
            image: 'images/foot.jpg',
            options: ['hand', 'foot', 'ear'],
            correct: 1,
            hint: 'Con esto caminas',
            audio: 'audio/body/foot.mp3',
            tyMessage: '¡Excelente! Foot es pie'
        },
        {
            id: 19,
            type: 'audio-choice',
            question: 'Escucha el número',
            options: ['four', 'five', 'six'],
            correct: 1,
            hint: 'Viene después del four',
            audio: 'audio/numbers/five.mp3',
            tyMessage: '¡Perfecto! Five es cinco'
        },
        {
            id: 20,
            type: 'image-choice',
            question: '¿Cómo se dice "nariz" en inglés?',
            image: 'images/nose.jpg',
            options: ['eye', 'nose', 'mouth'],
            correct: 1,
            hint: 'Con esto puedes oler',
            audio: 'audio/body/nose.mp3',
            tyMessage: '¡Muy bien! Nose es nariz'
        },

        // Preguntas 21-30: Familia y objetos de la casa
        {
            id: 21,
            type: 'image-choice',
            question: '¿Cómo se dice "mamá" en inglés?',
            image: 'images/mother.jpg',
            options: ['father', 'mother', 'sister'],
            correct: 1,
            hint: 'Es quien te cuida mucho',
            audio: 'audio/family/mother.mp3',
            tyMessage: '¡Excelente! Mother es mamá'
        },
        {
            id: 22,
            type: 'image-choice',
            question: '¿Cómo se dice "papá" en inglés?',
            image: 'images/father.jpg',
            options: ['father', 'brother', 'mother'],
            correct: 0,
            hint: 'Es el hombre de la familia',
            audio: 'audio/family/father.mp3',
            tyMessage: '¡Perfecto! Father es papá'
        },
        {
            id: 23,
            type: 'image-choice',
            question: '¿Qué es esto?',
            image: 'images/ball.jpg',
            options: ['book', 'ball', 'car'],
            correct: 1,
            hint: 'Es redondo y puedes jugar con él',
            audio: 'audio/toys/ball.mp3',
            tyMessage: '¡Muy bien! Ball es pelota'
        },
        {
            id: 24,
            type: 'image-choice',
            question: '¿Cómo se dice "mesa" en inglés?',
            image: 'images/table.jpg',
            options: ['chair', 'table', 'bed'],
            correct: 1,
            hint: 'Ahí comes y haces tareas',
            audio: 'audio/furniture/table.mp3',
            tyMessage: '¡Genial! Table es mesa'
        },
        {
            id: 25,
            type: 'image-choice',
            question: '¿Qué es esto?',
            image: 'images/chair.jpg',
            options: ['table', 'chair', 'door'],
            correct: 1,
            hint: 'Te sientas en esto',
            audio: 'audio/furniture/chair.mp3',
            tyMessage: '¡Excelente! Chair es silla'
        },
        {
            id: 26,
            type: 'image-choice',
            question: '¿Cómo se dice "cama" en inglés?',
            image: 'images/bed.jpg',
            options: ['chair', 'table', 'bed'],
            correct: 2,
            hint: 'Ahí duermes por la noche',
            audio: 'audio/furniture/bed.mp3',
            tyMessage: '¡Perfecto! Bed es cama'
        },
        {
            id: 27,
            type: 'image-choice',
            question: '¿Qué fruta es esta?',
            image: 'images/orange.jpg',
            options: ['apple', 'orange', 'banana'],
            correct: 1,
            hint: 'Es del mismo color que su nombre',
            audio: 'audio/words/orange.mp3',
            tyMessage: '¡Muy bien! Orange es naranja'
        },
        {
            id: 28,
            type: 'image-choice',
            question: '¿Cómo se dice "agua" en inglés?',
            image: 'images/water.jpg',
            options: ['milk', 'water', 'juice'],
            correct: 1,
            hint: 'La necesitas para vivir y es transparente',
            audio: 'audio/drinks/water.mp3',
            tyMessage: '¡Genial! Water es agua'
        },
        {
            id: 29,
            type: 'image-choice',
            question: '¿Qué animal es este?',
            image: 'images/bird.jpg',
            options: ['cat', 'bird', 'fish'],
            correct: 1,
            hint: 'Puede volar en el cielo',
            audio: 'audio/animals/bird.mp3',
            tyMessage: '¡Excelente! Bird es pájaro'
        },
        {
            id: 30,
            type: 'image-choice',
            question: '¿Cómo se dice "sol" en inglés?',
            image: 'images/sun.jpg',
            options: ['moon', 'star', 'sun'],
            correct: 2,
            hint: 'Nos da luz y calor durante el día',
            audio: 'audio/nature/sun.mp3',
            tyMessage: '¡Perfecto! Sun es sol. ¡Has completado el nivel!'
        }
    ],

    // Nivel 2: Aventureros (6-12 años) - Frases y gramática básica
    level2: [
        // Preguntas 1-10: Completar oraciones simples
        {
            id: 1,
            type: 'complete-sentence',
            question: 'Completa la oración: "I _____ a student"',
            sentence: 'I _____ a student',
            options: ['am', 'is', 'are'],
            correct: 0,
            hint: 'Cuando hablamos de "I" (yo) usamos esta forma del verbo ser',
            audio: 'audio/sentences/i-am-student.mp3',
            tyMessage: '¡Excelente! "I am a student" significa "Yo soy un estudiante"'
        },
        {
            id: 2,
            type: 'complete-sentence',
            question: 'Completa: "She _____ my sister"',
            sentence: 'She _____ my sister',
            options: ['am', 'is', 'are'],
            correct: 1,
            hint: 'Para "she" (ella) usamos esta forma',
            audio: 'audio/sentences/she-is-sister.mp3',
            tyMessage: '¡Muy bien! "She is my sister" - Ella es mi hermana'
        },
        {
            id: 3,
            type: 'complete-sentence',
            question: 'Completa: "They _____ happy"',
            sentence: 'They _____ happy',
            options: ['am', 'is', 'are'],
            correct: 2,
            hint: 'Para "they" (ellos) usamos esta forma',
            audio: 'audio/sentences/they-are-happy.mp3',
            tyMessage: '¡Perfecto! "They are happy" - Ellos están felices'
        },
        {
            id: 4,
            type: 'word-order',
            question: 'Ordena las palabras para formar una oración',
            words: ['like', 'I', 'apples'],
            correctOrder: ['I', 'like', 'apples'],
            hint: 'Empieza con "I" (yo)',
            audio: 'audio/sentences/i-like-apples.mp3',
            tyMessage: '¡Genial! "I like apples" - Me gustan las manzanas'
        },
        {
            id: 5,
            type: 'complete-sentence',
            question: 'Completa: "The cat _____ sleeping"',
            sentence: 'The cat _____ sleeping',
            options: ['am', 'is', 'are'],
            correct: 1,
            hint: 'El gato es singular, como "he" o "she"',
            audio: 'audio/sentences/cat-is-sleeping.mp3',
            tyMessage: '¡Excelente! "The cat is sleeping" - El gato está durmiendo'
        },
        {
            id: 6,
            type: 'word-order',
            question: 'Ordena: Hacer una pregunta sobre el color',
            words: ['color', 'is', 'What', 'this', '?'],
            correctOrder: ['What', 'color', 'is', 'this', '?'],
            hint: 'Las preguntas empiezan con "What"',
            audio: 'audio/sentences/what-color-is-this.mp3',
            tyMessage: '¡Muy bien! "What color is this?" - ¿De qué color es esto?'
        },
        {
            id: 7,
            type: 'complete-sentence',
            question: 'Completa: "We _____ friends"',
            sentence: 'We _____ friends',
            options: ['am', 'is', 'are'],
            correct: 2,
            hint: 'Para "we" (nosotros) usamos la misma forma que "they"',
            audio: 'audio/sentences/we-are-friends.mp3',
            tyMessage: '¡Perfecto! "We are friends" - Somos amigos'
        },
        {
            id: 8,
            type: 'word-order',
            question: 'Ordena para hacer una oración',
            words: ['have', 'I', 'a', 'dog'],
            correctOrder: ['I', 'have', 'a', 'dog'],
            hint: 'Empieza con "I"',
            audio: 'audio/sentences/i-have-dog.mp3',
            tyMessage: '¡Genial! "I have a dog" - Tengo un perro'
        },
        {
            id: 9,
            type: 'complete-sentence',
            question: 'Completa: "You _____ smart"',
            sentence: 'You _____ smart',
            options: ['am', 'is', 'are'],
            correct: 2,
            hint: 'Para "you" (tú) usamos esta forma',
            audio: 'audio/sentences/you-are-smart.mp3',
            tyMessage: '¡Excelente! "You are smart" - Eres inteligente'
        },
        {
            id: 10,
            type: 'word-order',
            question: 'Ordena: Preguntar por el nombre',
            words: ['your', 'What', 'name', 'is', '?'],
            correctOrder: ['What', 'is', 'your', 'name', '?'],
            hint: 'Empieza con "What"',
            audio: 'audio/sentences/what-is-your-name.mp3',
            tyMessage: '¡Muy bien! "What is your name?" - ¿Cuál es tu nombre?'
        },

        // Preguntas 11-20: Vocabulario de acciones y tiempo
        {
            id: 11,
            type: 'image-choice',
            question: '¿Qué está haciendo el niño?',
            image: 'images/running.jpg',
            options: ['walking', 'running', 'sleeping'],
            correct: 1,
            hint: 'Lo hace muy rápido para hacer ejercicio',
            audio: 'audio/actions/running.mp3',
            tyMessage: '¡Perfecto! "Running" es correr'
        },
        {
            id: 12,
            type: 'complete-sentence',
            question: 'Completa: "I _____ to school every day"',
            sentence: 'I _____ to school every day',
            options: ['go', 'goes', 'going'],
            correct: 0,
            hint: 'Con "I" usamos la forma base del verbo',
            audio: 'audio/sentences/i-go-to-school.mp3',
            tyMessage: '¡Excelente! "I go to school" - Voy a la escuela'
        },
        {
            id: 13,
            type: 'image-choice',
            question: '¿Qué está haciendo?',
            image: 'images/eating.jpg',
            options: ['drinking', 'eating', 'reading'],
            correct: 1,
            hint: 'Lo haces cuando tienes hambre',
            audio: 'audio/actions/eating.mp3',
            tyMessage: '¡Muy bien! "Eating" es comer'
        },
        {
            id: 14,
            type: 'complete-sentence',
            question: 'Completa: "She _____ her homework"',
            sentence: 'She _____ her homework',
            options: ['do', 'does', 'doing'],
            correct: 1,
            hint: 'Con "she" agregamos "s" al verbo',
            audio: 'audio/sentences/she-does-homework.mp3',
            tyMessage: '¡Genial! "She does her homework" - Ella hace su tarea'
        },
        {
            id: 15,
            type: 'time-choice',
            question: '¿Cuándo desayunamos?',
            options: ['morning', 'afternoon', 'night'],
            correct: 0,
            hint: 'Es la primera comida del día',
            audio: 'audio/time/morning.mp3',
            tyMessage: '¡Perfecto! "Morning" es mañana'
        },
        {
            id: 16,
            type: 'complete-sentence',
            question: 'Completa: "They _____ soccer"',
            sentence: 'They _____ soccer',
            options: ['play', 'plays', 'playing'],
            correct: 0,
            hint: 'Con "they" usamos la forma base',
            audio: 'audio/sentences/they-play-soccer.mp3',
            tyMessage: '¡Excelente! "They play soccer" - Juegan fútbol'
        },
        {
            id: 17,
            type: 'image-choice',
            question: '¿Qué está haciendo?',
            image: 'images/reading.jpg',
            options: ['writing', 'reading', 'singing'],
            correct: 1,
            hint: 'Lo haces con libros',
            audio: 'audio/actions/reading.mp3',
            tyMessage: '¡Muy bien! "Reading" es leer'
        },
        {
            id: 18,
            type: 'time-choice',
            question: '¿Cuándo dormimos?',
            options: ['morning', 'afternoon', 'night'],
            correct: 2,
            hint: 'Cuando está oscuro',
            audio: 'audio/time/night.mp3',
            tyMessage: '¡Genial! "Night" es noche'
        },
        {
            id: 19,
            type: 'complete-sentence',
            question: 'Completa: "He _____ music"',
            sentence: 'He _____ music',
            options: ['listen', 'listens', 'listening'],
            correct: 1,
            hint: 'Con "he" agregamos "s"',
            audio: 'audio/sentences/he-listens-music.mp3',
            tyMessage: '¡Perfecto! "He listens to music" - Él escucha música'
        },
        {
            id: 20,
            type: 'image-choice',
            question: '¿Qué está haciendo?',
            image: 'images/swimming.jpg',
            options: ['running', 'jumping', 'swimming'],
            correct: 2,
            hint: 'Lo haces en el agua',
            audio: 'audio/actions/swimming.mp3',
            tyMessage: '¡Excelente! "Swimming" es nadar'
        },

        // Preguntas 21-30: Preposiciones y descripciones
        {
            id: 21,
            type: 'preposition-choice',
            question: 'Completa: "The book is _____ the table"',
            image: 'images/book-on-table.jpg',
            options: ['on', 'in', 'under'],
            correct: 0,
            hint: 'El libro está encima',
            audio: 'audio/prepositions/on.mp3',
            tyMessage: '¡Muy bien! "On" significa encima'
        },
        {
            id: 22,
            type: 'preposition-choice',
            question: 'Completa: "The cat is _____ the box"',
            image: 'images/cat-in-box.jpg',
            options: ['on', 'in', 'next to'],
            correct: 1,
            hint: 'El gato está adentro',
            audio: 'audio/prepositions/in.mp3',
            tyMessage: '¡Perfecto! "In" significa dentro'
        },
        {
            id: 23,
            type: 'adjective-choice',
            question: '¿Cómo es el elefante?',
            image: 'images/big-elephant.jpg',
            options: ['small', 'big', 'fast'],
            correct: 1,
            hint: 'Es lo contrario de pequeño',
            audio: 'audio/adjectives/big.mp3',
            tyMessage: '¡Genial! "Big" significa grande'
        },
        {
            id: 24,
            type: 'preposition-choice',
            question: 'Completa: "The dog is _____ the tree"',
            image: 'images/dog-under-tree.jpg',
            options: ['on', 'under', 'in'],
            correct: 1,
            hint: 'El perro está debajo',
            audio: 'audio/prepositions/under.mp3',
            tyMessage: '¡Excelente! "Under" significa debajo'
        },
        {
            id: 25,
            type: 'adjective-choice',
            question: '¿Cómo es la tortuga?',
            image: 'images/slow-turtle.jpg',
            options: ['fast', 'slow', 'big'],
            correct: 1,
            hint: 'Es lo contrario de rápido',
            audio: 'audio/adjectives/slow.mp3',
            tyMessage: '¡Muy bien! "Slow" significa lento'
        },
        {
            id: 26,
            type: 'plural-choice',
            question: '¿Cuál es el plural de "cat"?',
            options: ['cat', 'cats', 'cates'],
            correct: 1,
            hint: 'Agregamos "s" al final',
            audio: 'audio/plurals/cats.mp3',
            tyMessage: '¡Perfecto! "Cats" es gatos'
        },
        {
            id: 27,
            type: 'adjective-choice',
            question: '¿Cómo está el niño?',
            image: 'images/happy-child.jpg',
            options: ['sad', 'angry', 'happy'],
            correct: 2,
            hint: 'Está sonriendo',
            audio: 'audio/emotions/happy.mp3',
            tyMessage: '¡Genial! "Happy" significa feliz'
        },
        {
            id: 28,
            type: 'plural-choice',
            question: '¿Cuál es el plural de "book"?',
            options: ['book', 'books', 'bookes'],
            correct: 1,
            hint: 'Agregamos "s"',
            audio: 'audio/plurals/books.mp3',
            tyMessage: '¡Excelente! "Books" es libros'
        },
        {
            id: 29,
            type: 'word-order',
            question: 'Ordena para describir: El gato negro',
            words: ['cat', 'black', 'The'],
            correctOrder: ['The', 'black', 'cat'],
            hint: 'El adjetivo va antes del sustantivo en inglés',
            audio: 'audio/sentences/the-black-cat.mp3',
            tyMessage: '¡Muy bien! "The black cat" - El gato negro'
        },
        {
            id: 30,
            type: 'complete-sentence',
            question: 'Completa: "I _____ 8 years old"',
            sentence: 'I _____ 8 years old',
            options: ['am', 'is', 'are'],
            correct: 0,
            hint: 'Para decir la edad usamos "I am"',
            audio: 'audio/sentences/i-am-8-years-old.mp3',
            tyMessage: '¡Perfecto! ¡Has completado el nivel 2!'
        }
    ],

    // Nivel 3: Maestros (12-18 años) - Gramática avanzada y comprensión
    level3: [
        // Preguntas 1-10: Tiempos verbales
        {
            id: 1,
            type: 'grammar-choice',
            question: 'Choose the correct past tense: "Yesterday I _____ to the movies"',
            options: ['go', 'went', 'going'],
            correct: 1,
            hint: 'Past tense of "go" is irregular',
            audio: 'audio/grammar/past-went.mp3',
            tyMessage: 'Excellent! "Went" is the past tense of "go"'
        },
        {
            id: 2,
            type: 'grammar-choice',
            question: 'Complete with present continuous: "She _____ a book right now"',
            options: ['reads', 'is reading', 'read'],
            correct: 1,
            hint: 'Present continuous uses "is/are + verb-ing"',
            audio: 'audio/grammar/present-continuous.mp3',
            tyMessage: 'Perfect! Present continuous shows an action happening now'
        },
        {
            id: 3,
            type: 'grammar-choice',
            question: 'Choose the future form: "Tomorrow we _____ to the beach"',
            options: ['go', 'went', 'will go'],
            correct: 2,
            hint: 'Future tense uses "will + base verb"',
            audio: 'audio/grammar/future-will.mp3',
            tyMessage: 'Great! "Will go" expresses future action'
        },
        {
            id: 4,
            type: 'grammar-choice',
            question: 'Past continuous: "They _____ TV when I arrived"',
            options: ['watched', 'were watching', 'are watching'],
            correct: 1,
            hint: 'Past continuous uses "was/were + verb-ing"',
            audio: 'audio/grammar/past-continuous.mp3',
            tyMessage: 'Excellent! Past continuous shows ongoing past action'
        },
        {
            id: 5,
            type: 'grammar-choice',
            question: 'Present perfect: "I _____ never _____ to Paris"',
            options: ['have/been', 'had/been', 'will/be'],
            correct: 0,
            hint: 'Present perfect uses "have/has + past participle"',
            audio: 'audio/grammar/present-perfect.mp3',
            tyMessage: 'Perfect! Present perfect connects past to present'
        },
        {
            id: 6,
            type: 'conditional-choice',
            question: 'First conditional: "If it _____, we will stay home"',
            options: ['rain', 'rains', 'rained'],
            correct: 1,
            hint: 'First conditional: If + present, will + base verb',
            audio: 'audio/grammar/first-conditional.mp3',
            tyMessage: 'Great! First conditional expresses real possibilities'
        },
        {
            id: 7,
            type: 'grammar-choice',
            question: 'Choose the correct form: "She _____ English for 5 years"',
            options: ['studies', 'has studied', 'studied'],
            correct: 1,
            hint: 'Duration from past to present uses present perfect',
            audio: 'audio/grammar/duration-present-perfect.mp3',
            tyMessage: 'Excellent! Present perfect with duration'
        },
        {
            id: 8,
            type: 'passive-voice',
            question: 'Change to passive: "The chef cooks the meal"',
            options: ['The meal is cooked by the chef', 'The meal cooks by the chef', 'The chef is cooked the meal'],
            correct: 0,
            hint: 'Passive voice: object + is/are + past participle + by + subject',
            audio: 'audio/grammar/passive-voice.mp3',
            tyMessage: 'Perfect! Passive voice focuses on the action, not the doer'
        },
        {
            id: 9,
            type: 'grammar-choice',
            question: 'Past perfect: "When I arrived, they _____ already _____ dinner"',
            options: ['have/finished', 'had/finished', 'will/finish'],
            correct: 1,
            hint: 'Past perfect: had + past participle',
            audio: 'audio/grammar/past-perfect.mp3',
            tyMessage: 'Great! Past perfect shows action before another past action'
        },
        {
            id: 10,
            type: 'modal-choice',
            question: 'Choose the modal: "You _____ study harder for better grades"',
            options: ['can', 'should', 'may'],
            correct: 1,
            hint: 'This modal expresses advice or recommendation',
            audio: 'audio/grammar/modal-should.mp3',
            tyMessage: 'Excellent! "Should" expresses advice'
        },

        // Preguntas 11-20: Comprensión lectora
        {
            id: 11,
            type: 'reading-comprehension',
            question: 'Read and answer: "Maria loves reading books. She reads every night before bed. Her favorite genre is mystery novels because they keep her guessing until the end." What does Maria read every night?',
            passage: 'Maria loves reading books. She reads every night before bed. Her favorite genre is mystery novels because they keep her guessing until the end.',
            options: ['mystery novels', 'books', 'magazines'],
            correct: 1,
            hint: 'Look for what she does every night',
            tyMessage: 'Perfect! She reads books every night'
        },
        {
            id: 12,
            type: 'reading-comprehension',
            question: 'Why does Maria like mystery novels?',
            passage: 'Maria loves reading books. She reads every night before bed. Her favorite genre is mystery novels because they keep her guessing until the end.',
            options: ['They are short', 'They keep her guessing', 'They are easy'],
            correct: 1,
            hint: 'The passage explains the reason with "because"',
            tyMessage: 'Excellent! Mystery novels keep her guessing'
        },
        {
            id: 13,
            type: 'reading-comprehension',
            question: 'Read: "The weather forecast predicts heavy rain tomorrow. Schools might close if the storm gets worse. Students should bring umbrellas and wear raincoats." What should students bring?',
            passage: 'The weather forecast predicts heavy rain tomorrow. Schools might close if the storm gets worse. Students should bring umbrellas and wear raincoats.',
            options: ['books', 'umbrellas', 'food'],
            correct: 1,
            hint: 'Look for what students "should bring"',
            tyMessage: 'Great! Students should bring umbrellas'
        },
        {
            id: 14,
            type: 'reading-comprehension',
            question: 'What might happen to schools?',
            passage: 'The weather forecast predicts heavy rain tomorrow. Schools might close if the storm gets worse. Students should bring umbrellas and wear raincoats.',
            options: ['They might close', 'They will open late', 'Nothing will happen'],
            correct: 0,
            hint: 'Look for what "might" happen',
            tyMessage: 'Perfect! Schools might close'
        },
        {
            id: 15,
            type: 'vocabulary-context',
            question: 'In "The ancient castle stood majestically on the hill", what does "majestically" mean?',
            options: ['quickly', 'impressively', 'quietly'],
            correct: 1,
            hint: 'Think about how a castle would look impressive',
            audio: 'audio/vocabulary/majestically.mp3',
            tyMessage: 'Excellent! "Majestically" means impressively or grandly'
        },
        {
            id: 16,
            type: 'reading-comprehension',
            question: 'Read: "Climate change affects ecosystems worldwide. Rising temperatures cause ice caps to melt, leading to higher sea levels. This threatens coastal cities and wildlife habitats." What causes higher sea levels?',
            passage: 'Climate change affects ecosystems worldwide. Rising temperatures cause ice caps to melt, leading to higher sea levels. This threatens coastal cities and wildlife habitats.',
            options: ['Climate change', 'Melting ice caps', 'Wildlife'],
            correct: 1,
            hint: 'What directly leads to higher sea levels?',
            tyMessage: 'Perfect! Melting ice caps lead to higher sea levels'
        },
        {
            id: 17,
            type: 'vocabulary-context',
            question: 'In "She showed resilience during difficult times", what does "resilience" mean?',
            options: ['weakness', 'ability to recover', 'anger'],
            correct: 1,
            hint: 'Think about dealing with difficult times positively',
            audio: 'audio/vocabulary/resilience.mp3',
            tyMessage: 'Great! "Resilience" is the ability to bounce back'
        },
        {
            id: 18,
            type: 'reading-comprehension',
            question: 'What does climate change threaten?',
            passage: 'Climate change affects ecosystems worldwide. Rising temperatures cause ice caps to melt, leading to higher sea levels. This threatens coastal cities and wildlife habitats.',
            options: ['Only cities', 'Coastal cities and wildlife habitats', 'Only wildlife'],
            correct: 1,
            hint: 'Look for what is threatened at the end',
            tyMessage: 'Excellent! Both coastal cities and wildlife habitats are threatened'
        },
        {
            id: 19,
            type: 'inference-question',
            question: 'Read: "Tom studied all night for his exam. He drank coffee to stay awake and reviewed his notes multiple times. The next morning, he felt confident." How did Tom probably do on his exam?',
            options: ['Poorly', 'Well', 'He didn\'t take it'],
            correct: 1,
            hint: 'He felt confident after studying hard',
            tyMessage: 'Perfect! His preparation and confidence suggest he did well'
        },
        {
            id: 20,
            type: 'vocabulary-context',
            question: 'In "The professor\'s explanation was ambiguous", what does "ambiguous" mean?',
            options: ['very clear', 'unclear or confusing', 'very long'],
            correct: 1,
            hint: 'Think about explanations that could be interpreted different ways',
            audio: 'audio/vocabulary/ambiguous.mp3',
            tyMessage: 'Excellent! "Ambiguous" means unclear or open to interpretation'
        },

        // Preguntas 21-30: Gramática avanzada y escritura
        {
            id: 21,
            type: 'relative-pronouns',
            question: 'Complete: "The book _____ I read yesterday was fascinating"',
            options: ['who', 'which', 'whose'],
            correct: 1,
            hint: 'Use "which" for things, "who" for people',
            audio: 'audio/grammar/relative-which.mp3',
            tyMessage: 'Perfect! "Which" refers to things'
        },
        {
            id: 22,
            type: 'subjunctive-mood',
            question: 'Choose the subjunctive: "I wish I _____ speak French fluently"',
            options: ['can', 'could', 'will'],
            correct: 1,
            hint: 'Subjunctive expresses hypothetical situations',
            audio: 'audio/grammar/subjunctive-could.mp3',
            tyMessage: 'Great! Subjunctive "could" expresses a wish'
        },
        {
            id: 23,
            type: 'phrasal-verbs',
            question: 'What does "put off" mean in "We had to put off the meeting"?',
            options: ['start', 'postpone', 'cancel forever'],
            correct: 1,
            hint: 'Think about delaying something to a later time',
            audio: 'audio/phrasal-verbs/put-off.mp3',
            tyMessage: 'Excellent! "Put off" means postpone or delay'
        },
        {
            id: 24,
            type: 'complex-sentence',
            question: 'Combine these ideas: "It was raining" + "We decided to stay inside"',
            options: ['It was raining, so we decided to stay inside', 'We decided to stay inside it was raining', 'It was raining we decided to stay inside'],
            correct: 0,
            hint: 'Use a conjunction to show cause and effect',
            audio: 'audio/grammar/complex-sentence.mp3',
            tyMessage: 'Perfect! "So" shows the logical result'
        },
        {
            id: 25,
            type: 'reported-speech',
            question: 'Change to reported speech: John said, "I am tired"',
            options: ['John said that he is tired', 'John said that he was tired', 'John said that I am tired'],
            correct: 1,
            hint: 'In reported speech, present tense changes to past',
            audio: 'audio/grammar/reported-speech.mp3',
            tyMessage: 'Great! Verb tenses shift back in reported speech'
        },
        {
            id: 26,
            type: 'advanced-vocabulary',
            question: 'Choose the most sophisticated synonym for "big":',
            options: ['large', 'enormous', 'colossal'],
            correct: 2,
            hint: 'Think of the most impressive word',
            audio: 'audio/vocabulary/colossal.mp3',
            tyMessage: 'Excellent! "Colossal" is more sophisticated than the others'
        },
        {
            id: 27,
            type: 'conditional-perfect',
            question: 'Third conditional: "If I _____ studied harder, I _____ passed the exam"',
            options: ['have/would have', 'had/would have', 'would/had'],
            correct: 1,
            hint: 'Third conditional: If + past perfect, would have + past participle',
            audio: 'audio/grammar/third-conditional.mp3',
            tyMessage: 'Perfect! Third conditional expresses unreal past situations'
        },
        {
            id: 28,
            type: 'idiomatic-expression',
            question: 'What does "break the ice" mean?',
            options: ['to literally break ice', 'to start a conversation', 'to be very cold'],
            correct: 1,
            hint: 'Think about social situations',
            audio: 'audio/idioms/break-the-ice.mp3',
            tyMessage: 'Great! "Break the ice" means to start a conversation in a social setting'
        },
        {
            id: 29,
            type: 'parallel-structure',
            question: 'Which sentence has correct parallel structure?',
            options: ['I like reading, writing, and to swim', 'I like reading, writing, and swimming', 'I like to read, writing, and swim'],
            correct: 1,
            hint: 'All items in a list should have the same grammatical form',
            audio: 'audio/grammar/parallel-structure.mp3',
            tyMessage: 'Excellent! All three activities use the same -ing form'
        },
        {
            id: 30,
            type: 'advanced-comprehension',
            question: 'Analyze: "Despite the overwhelming evidence against him, the defendant maintained his innocence throughout the trial." What literary device is used?',
            options: ['Metaphor', 'Irony', 'Contrast'],
            correct: 2,
            hint: 'Notice the opposing ideas in the sentence',
            audio: 'audio/literary/contrast.mp3',
            tyMessage: 'Perfect! The sentence contrasts evidence with maintained innocence. Congratulations on completing all levels!'
        }
    ]
};

// Funciones auxiliares para el manejo de datos
const GameQuestions = {
    // Obtener preguntas por nivel
    getLevel: function(level) {
        switch(level) {
            case 1: return GAME_DATA.level1;
            case 2: return GAME_DATA.level2;
            case 3: return GAME_DATA.level3;
            default: return [];
        }
    },

    // Obtener una pregunta específica
    getQuestion: function(level, questionId) {
        const levelData = this.getLevel(level);
        return levelData.find(q => q.id === questionId);
    },

    // Obtener el total de preguntas por nivel
    getTotalQuestions: function(level) {
        return this.getLevel(level).length;
    },

    // Verificar si una respuesta es correcta
    isCorrectAnswer: function(level, questionId, answerIndex) {
        const question = this.getQuestion(level, questionId);
        return question ? question.correct === answerIndex : false;
    },

    // Obtener mensaje de Ty para una respuesta
    getTyMessage: function(level, questionId, isCorrect) {
        const question = this.getQuestion(level, questionId);
        if (!question) return "¡Sigamos adelante!";
        
        if (isCorrect) {
            return question.tyMessage;
        } else {
            return "No te preocupes, ¡inténtalo de nuevo! " + (question.hint || "");
        }
    },

    // Verificar si existe un nivel siguiente
    hasNextLevel: function(currentLevel) {
        return currentLevel < 3;
    },

    // Obtener información del nivel
    getLevelInfo: function(level) {
        const levelNames = {
            1: "Exploradores (3-6 años)",
            2: "Aventureros (6-12 años)", 
            3: "Maestros (12-18 años)"
        };
        
        const levelDescriptions = {
            1: "Primeras palabras y sonidos",
            2: "Frases y gramática básica",
            3: "Gramática avanzada y comprensión"
        };

        return {
            name: levelNames[level] || "Nivel desconocido",
            description: levelDescriptions[level] || "Descripción no disponible",
            totalQuestions: this.getTotalQuestions(level)
        };
    }
}; 