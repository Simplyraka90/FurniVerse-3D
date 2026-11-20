
'use client';

import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

type SofaProps = {
  color?: string;
};

export function Sofa({ color = '#b8896a' }: SofaProps) {
  const group = useRef<THREE.Group>(null);

  const shades = useMemo(() => {
    const base = new THREE.Color(color);

    const shade = (amount: number) =>
      base.clone().offsetHSL(0, 0, amount);

    return {
      fabric: base,
      light: shade(0.085),
      soft: shade(0.045),
      seam: shade(-0.085),
      shadow: shade(-0.11),
    };
  }, [color]);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;

    const t = clock.elapsedTime;

    // Gentle automatic 3D rotation
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      -0.27 + Math.sin(t * 0.25) * 0.16,
      1.5,
      delta
    );

    // Smooth floating animation
    group.current.position.y =
      Math.sin(t * 0.7) * 0.035;
  });

  const cushionXs = [-1.12, 0, 1.12];

  const material = (shade: THREE.Color) => (
    <meshStandardMaterial
      color={shade}
      roughness={0.96}
      metalness={0}
    />
  );

  return (
    <group
      ref={group}
      position={[0, -0.08, 0]}
      rotation={[0, -0.27, 0]}
    >
      {/* Wooden base frame */}
      <RoundedBox
        args={[3.95, 0.23, 1.78]}
        radius={0.10}
        smoothness={5}
        position={[0, -0.22, 0.02]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#604331"
          roughness={0.63}
          metalness={0.02}
        />
      </RoundedBox>

      {/* Wooden trim */}
      <RoundedBox
        args={[3.82, 0.10, 1.68]}
        radius={0.05}
        smoothness={5}
        position={[0, -0.07, 0.02]}
        castShadow
      >
        <meshStandardMaterial
          color="#ae8660"
          roughness={0.69}
        />
      </RoundedBox>

      {/* Four premium metallic legs */}
      {[-1.60, 1.60].flatMap((x) =>
        [-0.56, 0.65].map((z) => (
          <group
            key={`${x}-${z}`}
            position={[x, -0.50, z]}
          >
            <mesh castShadow>
              <cylinderGeometry
                args={[0.085, 0.055, 0.36, 12]}
              />
              <meshStandardMaterial
                color="#30302d"
                roughness={0.35}
                metalness={0.7}
              />
            </mesh>

            <mesh position={[0, -0.18, 0]}>
              <cylinderGeometry
                args={[0.064, 0.064, 0.027, 12]}
              />
              <meshStandardMaterial
                color="#b69b77"
                roughness={0.35}
                metalness={0.65}
              />
            </mesh>
          </group>
        ))
      )}

      {/* Main sofa structure */}
      <RoundedBox
        args={[3.91, 0.57, 1.73]}
        radius={0.24}
        smoothness={6}
        position={[0, 0.12, 0]}
        castShadow
        receiveShadow
      >
        {material(shades.shadow)}
      </RoundedBox>

      {/* Curved backrest */}
      <RoundedBox
        args={[3.79, 1.18, 0.55]}
        radius={0.26}
        smoothness={6}
        position={[0, 0.83, -0.57]}
        rotation={[-0.09, 0, 0]}
        castShadow
      >
        {material(shades.fabric)}
      </RoundedBox>

      {/* Three plush back cushions */}
      {cushionXs.map((x) => (
        <group
          key={`back-${x}`}
          position={[x, 0.91, -0.33]}
          rotation={[-0.09, 0, 0]}
        >
          <RoundedBox
            args={[1.04, 0.96, 0.28]}
            radius={0.18}
            smoothness={6}
            castShadow
          >
            {material(shades.soft)}
          </RoundedBox>

          {/* Cushion piping */}
          <mesh
            position={[0, 0.467, 0.045]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry
              args={[0.012, 0.012, 0.88, 8]}
            />
            {material(shades.seam)}
          </mesh>
        </group>
      ))}

      {/* Three soft seat cushions */}
      {cushionXs.map((x) => (
        <group
          key={`seat-${x}`}
          position={[x, 0.51, 0.25]}
        >
          <RoundedBox
            args={[1.045, 0.35, 1.20]}
            radius={0.15}
            smoothness={6}
            castShadow
            receiveShadow
          >
            {material(shades.light)}
          </RoundedBox>

          <RoundedBox
            args={[0.96, 0.052, 1.10]}
            radius={0.025}
            smoothness={4}
            position={[0, -0.13, 0]}
          >
            {material(shades.seam)}
          </RoundedBox>
        </group>
      ))}

      {/* Rounded sofa arms */}
      {[-1.73, 1.73].map((x) => (
        <group
          key={`arm-${x}`}
          position={[x, 0.54, 0.04]}
        >
          <RoundedBox
            args={[0.52, 0.91, 1.74]}
            radius={0.255}
            smoothness={7}
            castShadow
          >
            {material(shades.fabric)}
          </RoundedBox>

          <RoundedBox
            args={[0.46, 0.15, 1.51]}
            radius={0.07}
            smoothness={5}
            position={[0, 0.42, 0]}
            castShadow
          >
            {material(shades.light)}
          </RoundedBox>
        </group>
      ))}

      {/* Left decorative cushion */}
      <group
        position={[-1.22, 0.88, 0.37]}
        rotation={[0.11, -0.1, -0.22]}
      >
        <RoundedBox
          args={[0.65, 0.67, 0.19]}
          radius={0.17}
          smoothness={6}
          castShadow
        >
          <meshStandardMaterial
            color="#e8dac9"
            roughness={0.95}
          />
        </RoundedBox>

        <RoundedBox
          args={[0.53, 0.52, 0.20]}
          radius={0.12}
          smoothness={5}
          position={[0.05, -0.05, 0.08]}
          castShadow
        >
          <meshStandardMaterial
            color="#d5bca2"
            roughness={0.98}
          />
        </RoundedBox>
      </group>

      {/* Right decorative cushion */}
      <group
        position={[1.22, 0.90, 0.33]}
        rotation={[0.08, 0.2, 0.22]}
      >
        <RoundedBox
          args={[0.64, 0.67, 0.22]}
          radius={0.16}
          smoothness={6}
          castShadow
        >
          <meshStandardMaterial
            color="#647363"
            roughness={0.92}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.13]}>
          <sphereGeometry args={[0.06, 16, 12]} />
          <meshStandardMaterial
            color="#d9cbb5"
            roughness={0.98}
          />
        </mesh>
      </group>

      {/* Folded decorative throw */}
      <RoundedBox
        args={[0.59, 0.035, 0.72]}
        radius={0.012}
        smoothness={4}
        position={[0.83, 0.706, 0.38]}
        rotation={[0, 0.10, 0.05]}
        castShadow
      >
        <meshStandardMaterial
          color="#d6c9b8"
          roughness={0.99}
        />
      </RoundedBox>
    </group>
  );
}
