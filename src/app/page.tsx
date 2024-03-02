"use client"

import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, GroupProps, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import blocksConfig from './blocksConfig.json'; // Adjust the path as necessary
import { randInt } from 'three/src/math/MathUtils.js';

const Block = ({ color, position }: { color: string; position: [number, number, number] }) => (
  <mesh position={position} scale={0.95}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

const BlockGroup = ({ isFirst = false, rotationAxis, rotate = false, children, ...props }: GroupProps & {
  rotationAxis?: 'x' | 'y' | 'z',
  rotate?: boolean,
  isFirst?: boolean,
}) => {
  const groupRef = useRef<THREE.Group>(null!);

  // This function will handle the rotation of the entire group
  useFrame(() => {
    const randomRotation = ([0, 1, 2, 3][randInt(0, 4)] * Math.PI / 2)

    const rotation = [
      rotationAxis === 'x' ? randomRotation : 0,
      rotationAxis === 'y' ? randomRotation : 0,
      rotationAxis === 'z' ? randomRotation : 0,
    ] as [number, number, number]

    if (rotate && groupRef.current) {
      groupRef.current.rotation.set(...rotation);
    }

    // get bounding box
    if (isFirst && groupRef.current) {
      console.log(new THREE.Box3().setFromObject(groupRef.current).max);
    }
  });

  return <group ref={groupRef} {...props}>{children}</group>;
};

const RenderBlocks = ({ isFirst = true, config, }: { isFirst: boolean, config: any }) => {
  const [setup, children] = config;
  let [type, x, y, z, rotationAxis = null] = setup.split("");
  const color = type === "B" ? "blue" : "red";

  if (type === "B") {
    return <Block position={[x, -y, z]} color={color} />;
  } else if (type === "G") {
    return (
      <BlockGroup isFirst={isFirst} position={[x, -y, z]} rotationAxis={rotationAxis}>
        <Block position={[0, 0, 0]} color={color} />;

        {children.map((childConfig: any, index: number) => (
          <RenderBlocks key={index} isFirst={false} config={childConfig} />
        ))}
      </BlockGroup>
    );
  }
  return null;
};

export default function Home() {
  return (
    <main className='bg-red-200 flex items-center justify-center h-screen'>
      <Canvas>
        <Stuff />
      </Canvas>
    </main >
  );
}

const Stuff = () => {
  useThree(({ camera }) => {
    camera.position.set(0, 0, 50);
  });

  return <>
    <ambientLight />
    <pointLight position={[10, 10, 10]} intensity={0.5} />
    <OrbitControls />
    <RenderBlocks isFirst={true} config={blocksConfig} />
  </ >
}