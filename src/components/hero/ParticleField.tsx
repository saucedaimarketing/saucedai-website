"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The particle constellation: thousands of gold-tinted points that
 * continuously flow between a scattered cloud (raw research) and an
 * organized torus-knot structure (the strategy/content system), with
 * mouse parallax. The morph runs entirely on the GPU — per-frame JS
 * cost is a handful of uniform writes.
 */

const VERT = /* glsl */ `
  attribute vec3 aTarget;
  attribute float aSeed;
  uniform float uProgress;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    vec3 pos = mix(position, aTarget, uProgress);
    // Gentle per-particle drift so the form never feels frozen
    pos.x += sin(uTime * 0.4 + aSeed * 6.2831) * 0.06;
    pos.y += cos(uTime * 0.3 + aSeed * 12.566) * 0.06;
    pos.z += sin(uTime * 0.5 + aSeed * 3.1415) * 0.06;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = 2.2 + aSeed * 2.0;
    gl_PointSize = size * (14.0 / -mv.z);
    vAlpha = 0.35 + aSeed * 0.5;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  varying float vAlpha;

  void main() {
    // Soft circular sprite
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.1, d);
    vec3 gold = vec3(0.788, 0.659, 0.298);
    gl_FragColor = vec4(gold, soft * vAlpha);
  }
`;

function buildPositions(count: number) {
  // Start state: scattered cloud
  const scattered = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 3.2 + Math.random() * 2.4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    scattered[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    scattered[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
    scattered[i * 3 + 2] = r * Math.cos(phi);
  }

  // Target state: points sampled along a torus knot
  const target = new Float32Array(count * 3);
  const p = 2, q = 3, R = 1.9, tube = 0.55;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const cx = (R + tube * Math.cos(q * t)) * Math.cos(p * t);
    const cy = (R + tube * Math.cos(q * t)) * Math.sin(p * t);
    const cz = tube * Math.sin(q * t);
    // jitter around the curve so it reads as a swarm, not a wire
    target[i * 3] = cx + (Math.random() - 0.5) * 0.3;
    target[i * 3 + 1] = cy + (Math.random() - 0.5) * 0.3;
    target[i * 3 + 2] = cz + (Math.random() - 0.5) * 0.3;
  }

  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) seeds[i] = Math.random();

  return { scattered, target, seeds };
}

function Particles({ count, animate }: { count: number; animate: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const { scattered, target, seeds } = useMemo(
    () => buildPositions(count),
    [count]
  );
  const pointer = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      uProgress: { value: animate ? 0 : 0.85 },
      uTime: { value: 0 },
    }),
    [animate]
  );

  useFrame((state) => {
    if (!animate) return;
    const t = state.clock.elapsedTime;
    if (material.current) {
      material.current.uniforms.uTime.value = t;
      // Slow breathing cycle: scattered -> organized -> scattered (~14s)
      const cycle = (Math.sin(t * 0.45 - Math.PI / 2) + 1) / 2;
      material.current.uniforms.uProgress.value = 0.12 + cycle * 0.78;
    }
    if (group.current) {
      pointer.current.x = THREE.MathUtils.lerp(
        pointer.current.x,
        state.pointer.x,
        0.04
      );
      pointer.current.y = THREE.MathUtils.lerp(
        pointer.current.y,
        state.pointer.y,
        0.04
      );
      group.current.rotation.y = t * 0.05 + pointer.current.x * 0.35;
      group.current.rotation.x = -0.35 + pointer.current.y * 0.25;
    }
  });

  return (
    <group ref={group} rotation={[-0.35, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[scattered, 3]} />
          <bufferAttribute attach="attributes-aTarget" args={[target, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  useMemo(() => {
    camera.position.set(0, 0, 7);
  }, [camera]);
  return null;
}

export default function ParticleField({
  count = 6000,
  animate = true,
}: {
  count?: number;
  animate?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      frameloop={animate ? "always" : "demand"}
      style={{ pointerEvents: "none" }}
      eventSource={
        typeof document !== "undefined" ? document.body : undefined
      }
      onCreated={() => {
        // Some embedded browsers never deliver ResizeObserver callbacks,
        // which R3F relies on for its first size measure. Deferred resize
        // events force that measure once the fallback listener is attached;
        // they're no-ops in normal browsers.
        window.setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
        window.setTimeout(() => window.dispatchEvent(new Event("resize")), 800);
      }}
    >
      <CameraRig />
      <Particles count={count} animate={animate} />
    </Canvas>
  );
}
