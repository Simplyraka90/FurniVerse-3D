
'use client';

import { Canvas } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  OrbitControls,
} from '@react-three/drei';

import { Sofa } from './Sofa';

type FurnitureSceneProps = {
  interactive?: boolean;
  color?: string;
};

export default function FurnitureScene({
  interactive = false,
  color = '#b8896a',
}: FurnitureSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{
        position: [5.3, 2.9, 6.7],
        fov: 37,
      }}
      shadows
      gl={{
        antialias: true,
        alpha: false,
      }}
      fallback={
        <div className="scene-fallback">
          3D preview unavailable
        </div>
      }
    >
      {/* Warm studio background */}
      <color
        attach="background"
        args={['#eee4d8']}
      />

      {/* Ambient lighting */}
      <ambientLight intensity={1.55} />

      <hemisphereLight
        args={['#ffffff', '#a48a72', 1.25]}
      />

      {/* Main studio light */}
      <directionalLight
        position={[4.5, 8, 6]}
        intensity={2.7}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Soft secondary light */}
      <directionalLight
        position={[-5, 3, -4]}
        intensity={0.85}
        color="#d3deec"
      />

      {/* Environment reflections */}
      <Environment preset="apartment" />

      {/* Luxury 3D sofa */}
      <Sofa color={color} />

      {/* Floor contact shadow */}
      <ContactShadows
        position={[0, -0.77, 0]}
        opacity={0.38}
        scale={8}
        blur={2.9}
        far={4}
      />

      {/* Interactive showroom controls */}
      {interactive && (
        <OrbitControls
          enablePan={false}
          minDistance={4.5}
          maxDistance={11}
          maxPolarAngle={Math.PI / 2.1}
        />
      )}
    </Canvas>
  );
}
