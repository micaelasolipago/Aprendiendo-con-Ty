# 🐕 Aprendiendo Inglés con Ty

Un juego educativo interactivo para aprender inglés con Ty, un simpático Rottweiler que guía a los jugadores a través de diferentes niveles de aprendizaje.

## 📋 Descripción

"Aprendiendo Inglés con Ty" es un juego educativo diseñado para diferentes grupos de edad (3-18 años) que hace que aprender inglés sea divertido e interactivo. El juego presenta a Ty, un Rottweiler amigable, como guía y mascota que acompaña a los jugadores en su aventura de aprendizaje.

## 🎯 Características Principales

### 🎮 3 Niveles de Dificultad
- **Exploradores (3-6 años)**: Vocabulario básico con imágenes y sonidos
- **Aventureros (6-12 años)**: Gramática básica y formación de oraciones
- **Maestros (12-18 años)**: Gramática avanzada y comprensión lectora

### 🎨 Diseño Atractivo
- Interfaz colorida y vibrante
- Diseño responsive para móviles, tablets y escritorio
- Animaciones suaves y efectos visuales atractivos
- Personaje Ty expresivo y amigable

### 🔊 Sistema de Audio
- Pronunciación nativa de palabras en inglés
- Efectos de sonido para feedback
- Música de fondo relajante
- Sistema TTS como respaldo

### 📊 Sistema de Progreso
- Guardado automático del progreso
- Estadísticas detalladas de rendimiento
- Sistema de puntuación con bonificaciones
- Desbloqueo progresivo de niveles

### 🎓 Tipos de Preguntas
- Identificación de imágenes
- Preguntas de audio
- Completar oraciones
- Ordenar palabras (drag & drop)
- Comprensión lectora
- Gramática avanzada

## 🚀 Cómo Ejecutar el Juego

### Opción 1: Servidor Local Simple
```bash
# Abrir en navegador directamente
# ⚠️ Puede tener limitaciones por CORS
start index.html
```

### Opción 2: Con Node.js (Recomendado)
```bash
# Instalar http-server globalmente
npm install -g http-server

# Ejecutar servidor
npm start
# o
npx http-server . -p 3000 -o
```

### Opción 3: Con Python
```bash
# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

### Opción 4: Con Live Server (Desarrollo)
```bash
# Instalar live-server
npm install -g live-server

# Ejecutar con recarga automática
npm run dev
```

## 📁 Estructura del Proyecto

```
juego-de-ingles/
├── index.html              # Archivo principal
├── package.json            # Configuración del proyecto
├── README.md               # Esta documentación
├── styles/                 # Archivos CSS
│   ├── main.css           # Estilos principales
│   ├── components.css     # Componentes específicos
│   └── responsive.css     # Diseño responsive
├── js/                     # Archivos JavaScript
│   ├── main.js            # Controlador principal
│   ├── data/
│   │   └── questions.js   # Base de datos de preguntas
│   ├── utils/
│   │   ├── storage.js     # Sistema de almacenamiento
│   │   └── audio.js       # Gestión de audio
│   └── game/
│       ├── gameLogic.js   # Lógica del juego
│       └── questionRenderer.js # Renderizado de preguntas
├── audio/                  # Archivos de audio
│   ├── background.mp3     # Música de fondo
│   ├── correct.mp3        # Sonido correcto
│   ├── incorrect.mp3      # Sonido incorrecto
│   └── words/             # Pronunciaciones
└── images/                 # Imágenes del juego
    ├── apple.jpg          # Imagen de manzana
    ├── cat.jpg            # Imagen de gato
    └── ...               # Más imágenes
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con CSS Grid y Flexbox
- **JavaScript ES6+**: Lógica del juego
- **Web APIs**: 
  - LocalStorage para persistencia
  - Web Audio API para sonidos
  - Speech Synthesis API para TTS
- **Responsive Design**: Compatible con todos los dispositivos

## 🎯 Funcionalidades Detalladas

### Sistema de Niveles
Cada nivel tiene 30 preguntas diseñadas específicamente para el grupo de edad:

#### Nivel 1: Exploradores (3-6 años)
- ✅ 30 preguntas de vocabulario básico
- 🖼️ Identificación de objetos con imágenes
- 🔊 Preguntas de audio para números y partes del cuerpo
- 👨‍👩‍👧‍👦 Vocabulario de familia y casa
- 💡 Pistas visuales y de audio
- ⭐ Feedback positivo constante

#### Nivel 2: Aventureros (6-12 años)
- ✅ 30 preguntas de gramática básica
- 📝 Completar oraciones simples
- 🔄 Ordenar palabras para formar oraciones
- 🏃‍♂️ Vocabulario de acciones y tiempo
- 📍 Preposiciones y descripciones
- 🏆 Sistema de recompensas

#### Nivel 3: Maestros (12-18 años)
- ✅ 30 preguntas avanzadas
- ⏰ Tiempos verbales complejos
- 📚 Comprensión lectora
- 🎭 Voz pasiva y condicionales
- 📖 Vocabulario sofisticado
- 📊 Estadísticas detalladas

### Sistema de Audio
- 🎵 Música de fondo opcional
- 🔊 Pronunciación nativa de palabras
- ✅ Sonidos de éxito y error
- 🎤 TTS como respaldo si fallan los archivos de audio
- 🔇 Control de volumen

### Sistema de Progreso
- 💾 Guardado automático en localStorage
- 📈 Seguimiento de estadísticas
- 🔓 Desbloqueo progresivo de niveles
- 🏅 Sistema de puntuación con bonificaciones
- 📊 Métricas de rendimiento

## 🐛 Solución de Problemas

### El juego no carga
1. **Verificar estructura de archivos**: Asegúrate de que todos los archivos estén en su lugar
2. **Usar servidor local**: Abre con un servidor HTTP en lugar de file://
3. **Verificar consola**: Presiona F12 y revisa errores en la consola

### No se escucha audio
1. **Verificar permisos**: El navegador puede bloquear audio automático
2. **Activar audio**: Hacer clic en cualquier botón del juego primero
3. **Verificar volumen**: Usar los controles de audio del juego

### Progreso no se guarda
1. **Verificar localStorage**: Algunos navegadores lo bloquean en file://
2. **Usar servidor**: Ejecutar con http-server o similar
3. **Verificar espacio**: El navegador puede tener limitaciones de almacenamiento

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Puedes:
- 🐛 Reportar bugs
- ✨ Sugerir nuevas características
- 🎨 Mejorar el diseño
- 📝 Añadir más preguntas
- 🌍 Traducir a otros idiomas

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Créditos

- **Concepto y Diseño**: Equipo de Desarrollo
- **Programación**: JavaScript ES6+
- **Diseño UI/UX**: CSS3 y Responsive Design
- **Personaje Ty**: Diseño original amigable
- **Contenido Educativo**: Basado en estándares de enseñanza de inglés

## 📞 Soporte

Si tienes problemas o preguntas:
1. Revisa esta documentación
2. Verifica la consola del navegador (F12)
3. Asegúrate de usar un servidor HTTP local
4. Verifica que todos los archivos estén presentes

¡Diviértete aprendiendo inglés con Ty! 🐕📚✨ 