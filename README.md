# 🐶 Aprendiendo con Ty: Aventura Bilingüe

## 📖 Descripción

**Aprendiendo con Ty: Aventura Bilingüe** es un juego educativo interactivo diseñado para niños de habla hispana que quieren aprender inglés de forma divertida y efectiva. El juego presenta a Ty, un amigable rottweiler negro que guía a los jugadores a través de tres niveles de aprendizaje progresivo.

## 🎮 Características Principales

### 🌟 **Sistema de Niveles por Edad**
- **Nivel 1 (3-6 años) - Exploradores de Sonidos**: Aprendizaje auditivo y visual
- **Nivel 2 (6-12 años) - Constructores de Palabras**: Formación de palabras y frases
- **Nivel 3 (12-18 años) - Creadores de Historias**: Comprensión lectora y gramática avanzada

### 🎯 **Funcionalidades Únicas**
- **Botón de Huella 3D**: Toggle de modo oscuro/claro con animación única
- **Text-to-Speech**: Pronunciación automática en inglés para todas las preguntas
- **Sistema de Audio Completo**: Efectos de sonido y música generados programáticamente
- **Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- **90 Preguntas**: 30 preguntas por nivel con opciones mezcladas aleatoriamente

### 🎨 **Experiencia Visual**
- **Temas Dinámicos**: Modo claro y oscuro con transiciones suaves
- **Animaciones Fluidas**: Partículas, confeti y efectos visuales
- **Personaje Ty**: Rottweiler negro con animaciones de emoción
- **Huellas Decorativas**: Elementos visuales temáticos en toda la interfaz

## 🚀 Instalación y Uso

### 📋 Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para fuentes y recursos externos)
- Altavoces o auriculares (para audio)

### ⚡ Instalación Rápida
1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/DeevTy/Juego-devty.git
   cd Juego-devty
   ```

2. **Abre el juego:**
   - Abre `index.html` en tu navegador
   - O usa un servidor local: `python -m http.server 8000`

3. **¡Juega!**
   - Selecciona tu edad
   - Elige un nivel
   - Responde las preguntas en español → inglés

## 🎯 Cómo Jugar

### 📱 **Navegación**
- **Inicio**: Pantalla principal con selección de edad
- **Niveles**: Vista de los tres niveles disponibles
- **Progreso**: Estadísticas de tu aprendizaje
- **Configuración**: Ajustes de audio y animaciones

### 🎮 **Mecánicas del Juego**
1. **Selecciona tu edad** (3-6, 6-12, o 12-18 años)
2. **Elige un nivel** de aprendizaje
3. **Escucha la pregunta** haciendo clic en "🔊 Reproducir"
4. **Selecciona la respuesta correcta** en inglés
5. **Recibe feedback inmediato** con animaciones y sonidos
6. **Continúa** hasta completar el nivel

### 🏆 **Sistema de Puntuación**
- **Respuesta correcta**: +10 puntos + racha
- **Respuesta incorrecta**: 0 puntos, racha se reinicia
- **Racha**: Bonificación por respuestas consecutivas correctas

## 🛠️ Tecnologías Utilizadas

### 💻 **Frontend**
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Variables CSS, Grid, Flexbox, animaciones avanzadas
- **JavaScript ES6+**: Clases, módulos, async/await
- **Web Audio API**: Generación programática de sonidos
- **Web Speech API**: Text-to-Speech para pronunciación

### 🎨 **Diseño**
- **Responsive Design**: Mobile-first con breakpoints completos
- **CSS Variables**: Sistema de temas dinámico
- **Glassmorphism**: Efectos de transparencia y blur
- **Animaciones CSS**: Keyframes y transiciones suaves

### 🔧 **Arquitectura**
- **Modular**: Separación clara de responsabilidades
- **Orientado a Objetos**: Clases bien estructuradas
- **Event-Driven**: Sistema de eventos optimizado
- **LocalStorage**: Persistencia de progreso local

## 📁 Estructura del Proyecto

```
juego/
├── index.html              # Página principal
├── README.md              # Documentación
├── styles/
│   ├── main.css           # Variables y estilos base
│   ├── components.css     # Componentes UI
│   └── animations.css     # Animaciones CSS
├── js/
│   ├── app.js            # Aplicación principal
│   ├── game.js           # Lógica del juego
│   ├── audio.js          # Sistema de audio
│   └── animations.js     # Animaciones avanzadas
└── assets/
    ├── sounds/           # Efectos de sonido
    └── images/           # Imágenes del juego
```

## 🎵 Sistema de Audio

### 🔊 **Características**
- **Text-to-Speech**: Pronunciación automática en inglés
- **Efectos de Sonido**: Generados programáticamente
- **Música de Fondo**: Diferentes temas por nivel
- **Control de Volumen**: Independiente para música y efectos
- **Modo Silencioso**: Toggle completo de audio

### 🎼 **Tipos de Audio**
- **Sonidos de UI**: Clicks, hovers, transiciones
- **Feedback de Juego**: Correcto, incorrecto, éxito
- **Sonidos de Ty**: Ladridos, felicidad, ánimo
- **Música Ambiental**: Temas relajantes y motivadores

## 🎨 Sistema de Temas

### 🌞 **Modo Claro**
- Colores vibrantes y saturados
- Fondos luminosos
- Contraste alto para legibilidad

### 🌙 **Modo Oscuro**
- Tonos suaves y relajantes
- Fondos oscuros
- Colores adaptados para visión nocturna

### 🔄 **Transiciones**
- Cambio suave entre temas
- Animaciones de partículas
- Efectos visuales únicos

## 📱 Diseño Responsivo

### 📱 **Móviles (320px - 480px)**
- Botones de 44px mínimo para touch
- Navegación optimizada
- Texto escalado apropiadamente

### 📱 **Móviles Grandes (481px - 767px)**
- Layout adaptado
- Elementos redimensionados
- Mejor aprovechamiento del espacio

### 📱 **Tablets (768px - 1023px)**
- Grid de 2 columnas
- Elementos más grandes
- Navegación mejorada

### 💻 **Desktop (1024px+)**
- Layout completo
- Elementos de tamaño normal
- Navegación completa

## ♿ Accesibilidad

### 🎯 **Características**
- **Navegación por Teclado**: Soporte completo
- **Focus Visible**: Indicadores claros
- **Contraste Adecuado**: En ambos temas
- **Reduced Motion**: Respeto por preferencias del usuario
- **Semántica HTML**: Estructura accesible

### 🔧 **Compatibilidad**
- **Navegadores Modernos**: Chrome, Firefox, Safari, Edge
- **Dispositivos Móviles**: iOS, Android
- **Screen Readers**: Compatible con lectores de pantalla

## 🚀 Despliegue

### 🌐 **GitHub Pages**
1. Sube el código a GitHub
2. Ve a Settings > Pages
3. Selecciona la rama main
4. El juego estará disponible en `https://username.github.io/repository-name`

### 📦 **Servidor Local**
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## 🔧 Personalización

### 🎨 **Cambiar Colores**
Edita las variables CSS en `styles/main.css`:
```css
:root {
    --primary-blue: #2563eb;
    --accent-yellow: #fbbf24;
    /* ... más variables */
}
```

### 🎵 **Agregar Preguntas**
Edita el array de preguntas en `js/game.js`:
```javascript
questions: [
    {
        type: "translation",
        question: "¿Cómo se dice 'palabra' en inglés?",
        options: ["Word", "Book", "Letter", "Text"],
        correct: 0,
        spanish: "palabra",
        english: "word"
    }
]
```

### 🎭 **Cambiar Personaje**
Modifica el emoji y estilos en los archivos CSS:
```css
.ty-character {
    font-size: 3rem;
    filter: brightness(0.7) contrast(1.2);
}
```

## 🤝 Contribuciones

### 📝 **Cómo Contribuir**
1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

### 🐛 **Reportar Bugs**
- Usa el sistema de Issues de GitHub
- Incluye pasos para reproducir el problema
- Especifica tu navegador y sistema operativo

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**DeevTy** - Desarrollado con ❤️ para el aprendizaje bilingüe

## 🙏 Agradecimientos

- **Ty**: Nuestro amigable rottweiler que inspira el aprendizaje
- **Comunidad**: Todos los que contribuyen al proyecto
- **Educadores**: Por su valiosa retroalimentación

---

## 🎯 **Próximas Características**

- [ ] **Modo Multijugador**: Competencia entre amigos
- [ ] **Más Idiomas**: Soporte para otros idiomas
- [ ] **Modo Offline**: Juego sin conexión
- [ ] **Logros**: Sistema de badges y recompensas
- [ ] **Progreso en la Nube**: Sincronización entre dispositivos

---

**¡Disfruta aprendiendo inglés con Ty! 🐶✨**


