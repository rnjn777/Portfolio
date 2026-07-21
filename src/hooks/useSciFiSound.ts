"use client";

import { useEffect, useRef, useCallback } from "react";

export function useSciFiSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientOscillatorRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    // Resume context if suspended (common browser policy)
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playHover = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }, [getAudioContext]);

  const playClick = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  }, [getAudioContext]);

  const playType = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    // Create a very brief burst of white noise for a mechanical/glitchy keystroke sound
    const bufferSize = ctx.sampleRate * 0.02; // 20ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1000 + Math.random() * 1000;
    
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
    
    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    noiseSource.start(ctx.currentTime);
  }, [getAudioContext]);

  const toggleAmbient = useCallback((play: boolean) => {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    if (play) {
      if (!ambientOscillatorRef.current) {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        // Deep low hum
        osc.type = "sine";
        osc.frequency.setValueAtTime(40, ctx.currentTime);
        
        // Add subtle LFO to the frequency to make it "breathe"
        const lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(2, ctx.currentTime);
        
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 2); // Fade in over 2s
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start();
        
        ambientOscillatorRef.current = osc;
        ambientGainRef.current = gainNode;
      }
    } else {
      if (ambientOscillatorRef.current && ambientGainRef.current) {
        // Fade out
        ambientGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
        ambientOscillatorRef.current.stop(ctx.currentTime + 1);
        ambientOscillatorRef.current = null;
        ambientGainRef.current = null;
      }
    }
  }, [getAudioContext]);

  return { playHover, playClick, playType, toggleAmbient, getAudioContext };
}
