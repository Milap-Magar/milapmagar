"use client";

import { Float, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { Suspense } from "react";
import * as THREE from "three";

const MandalaLayer = ({ textureUrl, z }: { textureUrl: string; z: number }) => {
  const texture = new THREE.TextureLoader().load(textureUrl);
  return (
    <mesh position={[0, 0, z]}>
      <planeGeometry args={[3, 3]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

export const MandalaCanvas = () => {
  return (
    <Canvas orthographic camera={{ zoom: 100, position: [0, 0, 100] }}>
      <Suspense fallback={null}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
          {/* Replace these with your own slices */}
          <MandalaLayer textureUrl="/mandala/layer1.png" z={0.05} />
          <MandalaLayer textureUrl="/mandala/layer2.png" z={0.04} />
          <MandalaLayer textureUrl="/mandala/layer3.png" z={0.03} />
          <MandalaLayer textureUrl="/mandala/layer4.png" z={0.02} />
        </Float>
      </Suspense>
      <OrbitControls enableZoom={false} enableRotate={false} />
    </Canvas>
  );
};
