# 🔧 Guía de Solución de Problemas

## ❌ Problema: "El juego no funciona"

### 🎯 Solución Principal: Usar un Servidor HTTP

El problema más común es abrir el archivo `index.html` directamente desde el explorador de archivos. Esto causa problemas de CORS (Cross-Origin Resource Sharing).

#### ✅ Solución Rápida (Recomendada):

1. **Abrir PowerShell/Terminal** en la carpeta del juego
2. **Ejecutar uno de estos comandos:**

```bash
# Opción 1: Con Node.js (más fácil)
npx http-server . -p 3000 -o

# Opción 2: Con Python 3
python -m http.server 3000

# Opción 3: Con Python 2
python -m SimpleHTTPServer 3000
```

3. **El juego se abrirá automáticamente** en `http://localhost:3000`

#### 🔍 Página de Diagnóstico

1. Abre `test.html` en tu navegador
2. Haz clic en "Ejecutar Todas las Pruebas"
3. Revisa los resultados para identificar problemas específicos

---

## 🐛 Problemas Específicos y Soluciones

### 1. 🚫 "TypeError: Cannot read properties of null"

**Causa:** Archivos JavaScript no se cargan correctamente
**Solución:**
- Usar servidor HTTP (ver arriba)
- Verificar que todos los archivos estén presentes

### 2. 🔇 "No se escucha audio"

**Causa:** Políticas de audio del navegador
**Solución:**
- Hacer clic en cualquier botón del juego primero
- Verificar volumen del sistema
- Verificar que el botón de audio del juego esté activado

### 3. 💾 "El progreso no se guarda"

**Causa:** localStorage bloqueado en file://
**Solución:**
- Usar servidor HTTP obligatoriamente
- Verificar que no estés en modo incógnito

### 4. 🎨 "El diseño se ve mal"

**Causa:** CSS no se carga
**Solución:**
- Usar servidor HTTP
- Verificar que los archivos CSS estén presentes
- Limpiar caché del navegador (Ctrl+F5)

### 5. 📱 "No funciona en móvil"

**Causa:** Problemas de responsive o JavaScript
**Solución:**
- Asegúrate de usar un servidor HTTP
- Verificar que JavaScript esté habilitado
- Probar en diferentes navegadores

---

## 🔍 Cómo Diagnosticar Problemas

### Paso 1: Abrir Herramientas de Desarrollador
- **Windows/Linux:** Presiona `F12`
- **Mac:** Presiona `Cmd + Option + I`
- **Alternativa:** Clic derecho → "Inspeccionar" → "Console"

### Paso 2: Buscar Errores
En la pestaña "Console", busca mensajes en rojo que indican errores.

### Errores Comunes:
```
❌ "Access to script at 'file://...' has been blocked by CORS policy"
✅ Solución: Usar servidor HTTP

❌ "Failed to load resource: net::ERR_FILE_NOT_FOUND"
✅ Solución: Verificar que todos los archivos estén presentes

❌ "ReferenceError: GameStorage is not defined"
✅ Solución: Problema de carga de scripts, usar servidor HTTP
```

---

## 🖥️ Métodos para Ejecutar el Servidor

### Método 1: Con Node.js (Recomendado)
```bash
# Si no tienes Node.js, descárgalo de nodejs.org

# En la carpeta del juego:
npx http-server . -p 3000 -o
```

### Método 2: Con Python (Pre-instalado en muchos sistemas)
```bash
# Python 3 (más común)
python -m http.server 3000

# Python 2 (más antiguo)
python -m SimpleHTTPServer 3000
```

### Método 3: Con Live Server (Visual Studio Code)
1. Instalar extensión "Live Server" en VS Code
2. Clic derecho en `index.html`
3. Seleccionar "Open with Live Server"

### Método 4: Con XAMPP/WAMP (Para usuarios avanzados)
1. Copiar carpeta del juego a `htdocs` (XAMPP) o `www` (WAMP)
2. Iniciar Apache
3. Ir a `http://localhost/juego-de-ingles`

---

## 📋 Lista de Verificación

### ✅ Archivos Necesarios:
- [ ] `index.html` - Archivo principal
- [ ] `styles/main.css` - Estilos principales
- [ ] `styles/components.css` - Componentes
- [ ] `styles/responsive.css` - Responsive
- [ ] `js/main.js` - JavaScript principal
- [ ] `js/data/questions.js` - Preguntas
- [ ] `js/utils/storage.js` - Almacenamiento
- [ ] `js/utils/audio.js` - Sistema de audio
- [ ] `js/game/gameLogic.js` - Lógica del juego
- [ ] `js/game/questionRenderer.js` - Renderizado

### ✅ Estructura de Carpetas:
```
juego-de-ingles/
├── index.html
├── test.html (diagnóstico)
├── styles/ (3 archivos CSS)
├── js/
│   ├── main.js
│   ├── data/ (questions.js)
│   ├── utils/ (storage.js, audio.js)
│   └── game/ (gameLogic.js, questionRenderer.js)
├── audio/ (opcional, para sonidos)
└── images/ (opcional, para imágenes)
```

---

## 🆘 Si Nada Funciona

### 1. Verificación Completa:
- Abre `test.html` para diagnóstico completo
- Ejecuta "Todas las Pruebas"
- Revisa la consola del navegador (F12)

### 2. Reinicio Completo:
- Cierra todas las ventanas del navegador
- Reinicia el servidor HTTP
- Abre el juego nuevamente

### 3. Prueba en Otro Navegador:
- Chrome, Firefox, Edge, Safari
- Asegúrate de que JavaScript esté habilitado

### 4. Verifica la URL:
✅ **Correcto:** `http://localhost:3000` o `http://127.0.0.1:3000`
❌ **Incorrecto:** `file:///C:/Users/.../index.html`

---

## 💡 Consejos Adicionales

1. **Siempre usar servidor HTTP** - No abrir archivos directamente
2. **Mantener archivos organizados** - No mover archivos de sus carpetas
3. **Limpiar caché** regularmente (Ctrl+F5)
4. **Verificar JavaScript habilitado** en configuración del navegador
5. **No usar modo incógnito** - Puede bloquear localStorage

---

## 📞 Última Solución

Si después de seguir todos estos pasos el juego sigue sin funcionar:

1. **Abre la consola del navegador** (F12)
2. **Copia todos los errores** en rojo
3. **Verifica que la estructura de archivos** sea exacta
4. **Prueba en un navegador diferente**
5. **Asegúrate de estar usando un servidor HTTP**

¡El juego debería funcionar perfectamente con un servidor HTTP! 🎮✨ 