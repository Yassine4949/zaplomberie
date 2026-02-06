'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import { useEffect, useRef, useState } from 'react';

function SpinningRing() {
  const ref = useRef<Mesh | null>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 1.2;
    ref.current.rotation.y += delta * 1.5;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.1, 0.3, 24, 48]} />
      <meshStandardMaterial
        color="#38bdf8"
        metalness={0.9}
        roughness={0.25}
        emissive="#0ea5e9"
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}

export default function Loader3DOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // On garde le loader ~2 secondes, juste pour l'effet
    const t = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[4, 4, 4]}
          intensity={1.3}
          color={'#38bdf8'}
        />
        <directionalLight
          position={[-4, -4, -4]}
          intensity={0.4}
          color={'#22c55e'}
        />
        <SpinningRing />
      </Canvas>
      <div className="pointer-events-none absolute bottom-16 text-sm text-slate-300">
        Chargement de <span className="font-semibold text-sky-400">Zai Plomberie</span>...
      </div>
    </div>
  );
}
