// ===== SISTEMA DE AUDIO COMPLETO =====
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.musicVolume = 0.5;
        this.sfxVolume = 0.7;
        this.isMuted = false;
        this.currentMusic = null;
        this.audioCache = new Map();
        
        this.init();
    }
    
    init() {
        this.loadSettings();
        this.createAudioContext();
        this.preloadAudio();
        console.log('🎵 Sistema de audio iniciado');
    }
    
    // ===== INICIALIZACIÓN DEL CONTEXTO DE AUDIO =====
    createAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('AudioContext no disponible:', error);
        }
    }
    
    // ===== CARGA DE CONFIGURACIÓN =====
    loadSettings() {
        this.musicVolume = parseFloat(localStorage.getItem('musicVolume') || '0.5');
        this.sfxVolume = parseFloat(localStorage.getItem('sfxVolume') || '0.7');
        this.isMuted = localStorage.getItem('audioMuted') === 'true';
    }
    
    // ===== PRE-CARGA DE AUDIO =====
    preloadAudio() {
        // Efectos de sonido básicos
        this.preloadSound('correct', this.generateCorrectSound());
        this.preloadSound('incorrect', this.generateIncorrectSound());
        this.preloadSound('click', this.generateClickSound());
        this.preloadSound('hover', this.generateHoverSound());
        this.preloadSound('success', this.generateSuccessSound());
        this.preloadSound('confetti', this.generateConfettiSound());
        
        // Sonidos de Ty
        this.preloadSound('ty_bark', this.generateTyBarkSound());
        this.preloadSound('ty_happy', this.generateTyHappySound());
        this.preloadSound('ty_encouragement', this.generateTyEncouragementSound());
        
        // Música de fondo
        this.preloadMusic('background_playful', this.generatePlayfulMusic());
        this.preloadMusic('background_calm', this.generateCalmMusic());
        this.preloadMusic('background_exciting', this.generateExcitingMusic());
    }
    
    // ===== GENERACIÓN DE SONIDOS =====
    generateCorrectSound() {
        const audioBuffer = this.audioContext.createBuffer(1, 44100 * 0.3, 44100);
        const channelData = audioBuffer.getChannelData(0);
        
        for (let i = 0; i < channelData.length; i++) {
            const t = i / 44100;
            const frequency = 800 + 400 * Math.sin(t * 10);
            channelData[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 3) * 0.3;
        }
        
        return audioBuffer;
    }
    
    generateIncorrectSound() {
        const audioBuffer = this.audioContext.createBuffer(1, 44100 * 0.2, 44100);
        const channelData = audioBuffer.getChannelData(0);
        
        for (let i = 0; i < channelData.length; i++) {
            const t = i / 44100;
            const frequency = 200 + 100 * Math.sin(t * 5);
            channelData[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 5) * 0.2;
        }
        
        return audioBuffer;
    }
    
    generateClickSound() {
        const audioBuffer = this.audioContext.createBuffer(1, 44100 * 0.1, 44100);
        const channelData = audioBuffer.getChannelData(0);
        
        for (let i = 0; i < channelData.length; i++) {
            const t = i / 44100;
            const frequency = 1000;
            channelData[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 20) * 0.1;
        }
        
        return audioBuffer;
    }
    
    generateHoverSound() {
        const audioBuffer = this.audioContext.createBuffer(1, 44100 * 0.05, 44100);
        const channelData = audioBuffer.getChannelData(0);
        
        for (let i = 0; i < channelData.length; i++) {
            const t = i / 44100;
            const frequency = 1200;
            channelData[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 30) * 0.05;
        }
        
        return audioBuffer;
    }
    
    generateSuccessSound() {
        const audioBuffer = this.audioContext.createBuffer(1, 44100 * 0.5, 44100);
        const channelData = audioBuffer.getChannelData(0);
        
        for (let i = 0; i < channelData.length; i++) {
            const t = i / 44100;
            const frequency = 523.25 + 659.25 * Math.sin(t * 2) + 783.99 * Math.sin(t * 4);
            channelData[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 2) * 0.2;
        }
        
        return audioBuffer;
    }
    
    generateConfettiSound() {
        const audioBuffer = this.audioContext.createBuffer(1, 44100 * 0.8, 44100);
        const channelData = audioBuffer.getChannelData(0);
        
        for (let i = 0; i < channelData.length; i++) {
            const t = i / 44100;
            const frequency = 800 + 400 * Math.random();
            channelData[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 1.5) * 0.1;
        }
        
        return audioBuffer;
    }
    
    generateTyBarkSound() {
        const audioBuffer = this.audioContext.createBuffer(1, 44100 * 0.4, 44100);
        const channelData = audioBuffer.getChannelData(0);
        
        for (let i = 0; i < channelData.length; i++) {
            const t = i / 44100;
            const frequency = 300 + 200 * Math.sin(t * 8);
            channelData[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 2) * 0.25;
        }
        
        return audioBuffer;
    }
    
    generateTyHappySound() {
        const audioBuffer = this.audioContext.createBuffer(1, 44100 * 0.6, 44100);
        const channelData = audioBuffer.getChannelData(0);
        
        for (let i = 0; i < channelData.length; i++) {
            const t = i / 44100;
            const frequency = 400 + 300 * Math.sin(t * 3);
            channelData[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 1.5) * 0.2;
        }
        
        return audioBuffer;
    }
    
    generateTyEncouragementSound() {
        const audioBuffer = this.audioContext.createBuffer(1, 44100 * 0.7, 44100);
        const channelData = audioBuffer.getChannelData(0);
        
        for (let i = 0; i < channelData.length; i++) {
            const t = i / 44100;
            const frequency = 350 + 250 * Math.sin(t * 2);
            channelData[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 1.2) * 0.15;
        }
        
        return audioBuffer;
    }
    
    // ===== GENERACIÓN DE MÚSICA =====
    generatePlayfulMusic() {
        const audioBuffer = this.audioContext.createBuffer(1, 44100 * 10, 44100);
        const channelData = audioBuffer.getChannelData(0);
        
        const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
        let noteIndex = 0;
        
        for (let i = 0; i < channelData.length; i++) {
            const t = i / 44100;
            const noteTime = Math.floor(t * 2) % 8;
            const frequency = notes[noteTime];
            channelData[i] = Math.sin(2 * Math.PI * frequency * t) * 0.1;
        }
        
        return audioBuffer;
    }
    
    generateCalmMusic() {
        const audioBuffer = this.audioContext.createBuffer(1, 44100 * 8, 44100);
        const channelData = audioBuffer.getChannelData(0);
        
        for (let i = 0; i < channelData.length; i++) {
            const t = i / 44100;
            const frequency = 220 + 110 * Math.sin(t * 0.5);
            channelData[i] = Math.sin(2 * Math.PI * frequency * t) * 0.08;
        }
        
        return audioBuffer;
    }
    
    generateExcitingMusic() {
        const audioBuffer = this.audioContext.createBuffer(1, 44100 * 12, 44100);
        const channelData = audioBuffer.getChannelData(0);
        
        for (let i = 0; i < channelData.length; i++) {
            const t = i / 44100;
            const frequency = 440 + 220 * Math.sin(t * 1.5);
            channelData[i] = Math.sin(2 * Math.PI * frequency * t) * 0.12;
        }
        
        return audioBuffer;
    }
    
    // ===== PRE-CARGA DE AUDIO =====
    preloadSound(name, audioBuffer) {
        this.audioCache.set(name, audioBuffer);
    }
    
    preloadMusic(name, audioBuffer) {
        this.audioCache.set(name, audioBuffer);
    }
    
    // ===== REPRODUCCIÓN DE SONIDOS =====
    playSound(soundName) {
        if (this.isMuted || !this.audioContext) return;
        
        const audioBuffer = this.audioCache.get(soundName);
        if (!audioBuffer) {
            console.warn(`Sonido no encontrado: ${soundName}`);
            return;
        }
        
        try {
            const source = this.audioContext.createBufferSource();
            const gainNode = this.audioContext.createGain();
            
            source.buffer = audioBuffer;
            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            gainNode.gain.value = this.sfxVolume;
            
            source.start();
            console.log(`🎵 Reproduciendo sonido: ${soundName}`);
        } catch (error) {
            console.error('Error reproduciendo sonido:', error);
        }
    }
    
    // ===== REPRODUCCIÓN DE MÚSICA =====
    playMusic(musicName, loop = true) {
        if (this.isMuted || !this.audioContext) return;
        
        this.stopMusic();
        
        const audioBuffer = this.audioCache.get(musicName);
        if (!audioBuffer) {
            console.warn(`Música no encontrada: ${musicName}`);
            return;
        }
        
        try {
            const source = this.audioContext.createBufferSource();
            const gainNode = this.audioContext.createGain();
            
            source.buffer = audioBuffer;
            source.loop = loop;
            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            gainNode.gain.value = this.musicVolume;
            
            source.start();
            this.currentMusic = { source, gainNode };
            console.log(`🎵 Reproduciendo música: ${musicName}`);
        } catch (error) {
            console.error('Error reproduciendo música:', error);
        }
    }
    
    stopMusic() {
        if (this.currentMusic) {
            try {
                this.currentMusic.source.stop();
            } catch (error) {
                // Ignorar errores al detener música
            }
            this.currentMusic = null;
        }
    }
    
    // ===== CONTROL DE VOLUMEN =====
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        localStorage.setItem('musicVolume', this.musicVolume.toString());
        
        if (this.currentMusic) {
            this.currentMusic.gainNode.gain.value = this.musicVolume;
        }
    }
    
    setSFXVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
        localStorage.setItem('sfxVolume', this.sfxVolume.toString());
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('audioMuted', this.isMuted.toString());
        
        if (this.isMuted) {
            this.stopMusic();
        }
        
        console.log(`🔇 Audio ${this.isMuted ? 'silenciado' : 'activado'}`);
    }
    
    // ===== MÉTODOS DE CONVENIENCIA =====
    playCorrect() {
        this.playSound('correct');
    }
    
    playIncorrect() {
        this.playSound('incorrect');
    }
    
    playClick() {
        this.playSound('click');
    }
    
    playHover() {
        this.playSound('hover');
    }
    
    playSuccess() {
        this.playSound('success');
    }
    
    playConfetti() {
        this.playSound('confetti');
    }
    
    playTyBark() {
        this.playSound('ty_bark');
    }
    
    playTyHappy() {
        this.playSound('ty_happy');
    }
    
    playTyEncouragement() {
        this.playSound('ty_encouragement');
    }
    
    // ===== ACTIVACIÓN DEL AUDIO CONTEXT =====
    resumeAudioContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
    
    // ===== LIMPIEZA =====
    destroy() {
        this.stopMusic();
        if (this.audioContext) {
            this.audioContext.close();
        }
        this.audioCache.clear();
    }
}

// ===== INICIALIZACIÓN GLOBAL =====
let audioManager;

document.addEventListener('DOMContentLoaded', () => {
    try {
        audioManager = new AudioManager();
        window.audioManager = audioManager;
        
        // Activar audio context con interacción del usuario
        document.addEventListener('click', () => {
            audioManager.resumeAudioContext();
        }, { once: true });
        
    } catch (error) {
        console.error('Error al inicializar el sistema de audio:', error);
    }
});

// ===== EXPORTACIÓN PARA MÓDULOS =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioManager;
}

