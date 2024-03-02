"use client";
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements, GroupProps } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

// Block component
const Block = React.forwardRef(({ position, color = 'orange' }: {
  position: [number, number, number], color?: string
}, ref: React.Ref<THREE.Mesh>) => {
  return (
    <mesh position={position} ref={ref} scale={0.95}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
});

// Group component
const BlockGroup = ({ rotationAxis, rotate = false, children, ...props }: GroupProps & {
  rotationAxis?: 'x' | 'y' | 'z',
  rotate?: boolean
}) => {
  const groupRef = useRef<THREE.Group>(null!);

  // This function will handle the rotation of the entire group
  useFrame(() => {
    if (rotate && groupRef.current) {
      groupRef.current.rotation.x += rotationAxis === 'x' ? 0.01 : 0;
      groupRef.current.rotation.y += rotationAxis === 'y' ? 0.01 : 0;
      groupRef.current.rotation.z += rotationAxis === 'z' ? 0.01 : 0;
    }
  });

  return <group ref={groupRef} {...props}>{children}</group>;
};


export default function Home() {

  return (
    <main className='bg-red-200 flex items-center justify-center h-screen'>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} intensity={0.5} />

        <OrbitControls />

        <BlockGroup>
          <Block color={'red'} position={[0, 0, 0]} />
          <Block color={'red'} position={[0, -1, 0]} />
          <BlockGroup position={[0, -2, 0]} rotationAxis={'y'}>
            <Block color={'red'} position={[0, 0, 0]} />
            <BlockGroup position={[1, 0, 0]} rotationAxis={'x'}>
              <Block color={'blue'} position={[0, 0, 0]} />
              <Block color={'blue'} position={[0, -1, 0]} />
              <BlockGroup position={[0, -2, 0]} rotationAxis={'y'}>
                <Block color={'blue'} position={[0, 0, 0]} />
                <BlockGroup position={[1, 0, 0]} rotationAxis={'x'}>
                  <Block color={'yellow'} position={[0, 0, 0]} />
                  <BlockGroup position={[0, -1, 0]} rotationAxis={'y'}>
                    <Block color={'yellow'} position={[0, 0, 0]} />
                    <BlockGroup position={[1, 0, 0]} rotationAxis={'x'}>
                      <Block color={'green'} position={[0, 0, 0]} />
                      <Block color={'green'} position={[1, 0, 0]} />
                      <BlockGroup position={[2, 0, 0]} rotationAxis={'x'}>
                        <Block color={'green'} position={[0, 0, 0]} />
                        <BlockGroup position={[0, -1, 0]} rotationAxis={'y'}>
                          <Block color={'red'} position={[0, 0, 0]} />
                          <Block color={'red'} position={[1, 0, 0]} />
                          <BlockGroup position={[2, 0, 0]} rotationAxis={'x'}>
                            <Block color={'red'} position={[0, 0, 0]} />
                            <BlockGroup position={[0, -1, 0]} rotationAxis={'y'}>
                              <Block color={'blue'} position={[0, 0, 0]} />
                              <BlockGroup position={[1, 0, 0]} rotationAxis={'x'}>
                                <Block color={'blue'} position={[0, 0, 0]} />
                                <Block color={'blue'} position={[1, 0, 0]} />
                                <BlockGroup position={[1, -1, 0]} rotationAxis={'y'} rotate>
                                  <Block color={'yellow'} position={[0, 0, 0]} />

                                </BlockGroup>
                              </BlockGroup>
                            </BlockGroup>
                          </BlockGroup>
                        </BlockGroup>
                      </BlockGroup>
                    </BlockGroup>
                  </BlockGroup>
                </BlockGroup>
              </BlockGroup>
            </BlockGroup>
          </BlockGroup>
        </BlockGroup>
      </Canvas>

    </main >
  );
}
