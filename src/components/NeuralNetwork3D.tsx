"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Points, PointMaterial } from "@react-three/drei";

function ParticleNetwork({ count = 150 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  // Create random positions and velocities for particles
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = [];
    
    for (let i = 0; i < count; i++) {
      // Spread them in a wide volume
      positions[i * 3] = (Math.random() - 0.5) * 15; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
      
      // Random velocity vector
      velocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.015,
      });
    }
    return [positions, velocities];
  }, [count]);

  // Pre-allocate a large array for lines to avoid GC spikes in useFrame
  const maxLines = 1500;
  const linePositions = useMemo(() => new Float32Array(maxLines * 2 * 3), []);

  const mouse = useRef(new THREE.Vector2());

  // Track mouse for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;
    
    const posAttr = pointsRef.current.geometry.attributes.position;
    const currentPositions = posAttr.array as Float32Array;
    
    // 1. Update particle positions
    for (let i = 0; i < count; i++) {
      currentPositions[i * 3] += velocities[i].x;
      currentPositions[i * 3 + 1] += velocities[i].y;
      currentPositions[i * 3 + 2] += velocities[i].z;
      
      // Soft bounds checking
      if (Math.abs(currentPositions[i * 3]) > 8) velocities[i].x *= -1;
      if (Math.abs(currentPositions[i * 3 + 1]) > 8) velocities[i].y *= -1;
      if (Math.abs(currentPositions[i * 3 + 2]) > 8) velocities[i].z *= -1;
    }
    
    posAttr.needsUpdate = true;
    
    // 2. Calculate connections (lines)
    let lineIndex = 0;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = currentPositions[i * 3] - currentPositions[j * 3];
        const dy = currentPositions[i * 3 + 1] - currentPositions[j * 3 + 1];
        const dz = currentPositions[i * 3 + 2] - currentPositions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;
        
        // Connect if close enough (distSq < threshold)
        if (distSq < 4.5 && lineIndex < maxLines * 2 * 3) {
          linePositions[lineIndex++] = currentPositions[i * 3];
          linePositions[lineIndex++] = currentPositions[i * 3 + 1];
          linePositions[lineIndex++] = currentPositions[i * 3 + 2];
          linePositions[lineIndex++] = currentPositions[j * 3];
          linePositions[lineIndex++] = currentPositions[j * 3 + 1];
          linePositions[lineIndex++] = currentPositions[j * 3 + 2];
        }
      }
    }
    
    // 3. Update line geometry
    const lineAttr = linesRef.current.geometry.attributes.position;
    lineAttr.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIndex / 3);
    
    // 4. Subtle camera parallax based on mouse
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.current.x * 1.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mouse.current.y * 1.5, 0.05);
    state.camera.lookAt(0, 0, 0);
    
    // 5. Slowly rotate the whole network
    pointsRef.current.rotation.y += 0.001;
    linesRef.current.rotation.y += 0.001;
    pointsRef.current.rotation.x += 0.0005;
    linesRef.current.rotation.x += 0.0005;
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions}>
        <PointMaterial 
          transparent 
          color="#00f3ff" 
          size={0.06} 
          sizeAttenuation={true} 
          depthWrite={false} 
        />
      </Points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position" 
            args={[linePositions, 3]}
            count={linePositions.length / 3} 
            array={linePositions} 
            itemSize={3} 
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color="#bc13fe" 
          transparent 
          opacity={0.15} 
          depthWrite={false} 
        />
      </lineSegments>
    </group>
  );
}

export default function NeuralNetwork3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none w-full h-full opacity-60 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}>
        <ParticleNetwork count={130} />
      </Canvas>
    </div>
  );
}
