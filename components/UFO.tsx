"use client"

import { Suspense, useRef, useLayoutEffect, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

const LOADING_PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  left: (i * 29) % 100,
  top: (i * 47) % 100,
  animationDelay: `${(i % 5) * 0.3}s`,
  animationDuration: `${1.8 + (i % 4) * 0.5}s`,
}))

// Warm model cache as early as possible.
useGLTF.preload("/ufo.glb")
useGLTF.preload("/server_rack.glb")

function NormalizedModel({
  url,
  targetSize = 1,
  rotation = [0, 0, 0] as [number, number, number],
  mousePosition = { x: 0, y: 0 },
  initialY = 0,
  hoverAmplitude = 0.3,
  hoverSpeed = 1.5,
  tiltStrength = 0.3,
}: {
  url: string
  targetSize?: number
  rotation?: [number, number, number]
  mousePosition?: { x: number; y: number }
  initialY?: number
  hoverAmplitude?: number
  hoverSpeed?: number
  tiltStrength?: number
}) {
  const { scene } = useGLTF(url)
  const ref = useRef<THREE.Group>(null)
  const cloned = useMemo(() => scene.clone(true), [scene])

  useLayoutEffect(() => {
    const g = ref.current
    if (!g) return

    g.position.set(0, initialY, 0)
    g.rotation.set(0, 0, 0)
    g.scale.set(1, 1, 1)

    const box = new THREE.Box3().setFromObject(g)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    g.position.sub(center)
    g.position.y += initialY

    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const scale = targetSize / maxDim
    g.scale.setScalar(scale)
  }, [cloned, targetSize, initialY])

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = initialY + Math.sin(state.clock.elapsedTime * hoverSpeed) * hoverAmplitude
      
      // Mouse interaction - tilt towards mouse
      const targetRotationX = mousePosition.y * tiltStrength
      const targetRotationY = mousePosition.x * tiltStrength
      
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        rotation[0] + targetRotationX,
        0.1
      )
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        rotation[1] + targetRotationY,
        0.1
      )
      ref.current.rotation.z = rotation[2]
    }
  })

  return (
    <group rotation={rotation}>
      <primitive ref={ref} object={cloned} />
    </group>
  )
}

function UFOModel({ 
  mousePosition,
  onPositionUpdate 
}: { 
  mousePosition: { x: number; y: number }
  onPositionUpdate?: (y: number) => void
}) {
  const ufoRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ufoRef.current && onPositionUpdate) {
      // Get the actual Y position of the UFO (including hover)
      const ufoY = Math.sin(state.clock.elapsedTime * 1.5) * 0.3
      onPositionUpdate(ufoY)
    }
  })

  return (
    <group ref={ufoRef}>
      <NormalizedModel
        url="/ufo.glb"
        targetSize={1.5}
        rotation={[0, 0, 0]}
        mousePosition={mousePosition}
        initialY={0}
        hoverAmplitude={0.3}
        hoverSpeed={1.5}
        tiltStrength={0.25}
      />
    </group>
  )
}

function ServerRackModel({ 
  mousePosition, 
  ufoYRef,
  onPositionUpdate
}: { 
  mousePosition: { x: number; y: number }
  ufoYRef: React.MutableRefObject<number>
  onPositionUpdate?: (y: number) => void
}) {
  const serverRef = useRef<THREE.Group>(null)
  const targetY = useRef(-3.2)

  useFrame((state) => {
    if (serverRef.current) {
      const ufoY = ufoYRef.current + Math.sin(state.clock.elapsedTime * 1.5) * 0.3
      const pullTarget = ufoY - 1.45
      const liftStrength = THREE.MathUtils.clamp((ufoY - targetY.current + 1.6) / 3.2, 0, 1)
      const pullSpeed = 0.022 + liftStrength * 0.03

      targetY.current = THREE.MathUtils.lerp(targetY.current, pullTarget, pullSpeed)

      const currentY = targetY.current + Math.sin(state.clock.elapsedTime * 4.2) * (0.03 + (1 - liftStrength) * 0.03)
      serverRef.current.position.y = currentY

      // Make the pull feel physical with a small drift and spin.
      serverRef.current.position.x = Math.sin(state.clock.elapsedTime * 1.8) * 0.06 * (1 - liftStrength * 0.45)
      serverRef.current.position.z = Math.cos(state.clock.elapsedTime * 1.3) * 0.045 * (1 - liftStrength * 0.4)
      
      // Update position for beam
      if (onPositionUpdate) {
        onPositionUpdate(currentY)
      }
      
      // Slight rotation from being pulled
      serverRef.current.rotation.z = mousePosition.x * 0.08 + Math.sin(state.clock.elapsedTime * 2.4) * 0.035
      serverRef.current.rotation.x = mousePosition.y * 0.04 + Math.cos(state.clock.elapsedTime * 1.9) * 0.025
      serverRef.current.rotation.y += 0.004 + liftStrength * 0.006
    }
  })

  return (
    <group ref={serverRef} position={[0, -3.2, 0]}>
      <NormalizedModel
        url="/server_rack.glb"
        targetSize={1}
        rotation={[0, 0, 0]}
        mousePosition={mousePosition}
        initialY={0}
        hoverAmplitude={0}
        hoverSpeed={0}
        tiltStrength={0.07}
      />
    </group>
  )
}

// Energy beam connecting UFO to server (dynamic version)
function EnergyBeamDynamic({
  ufoYRef,
  serverYRef,
}: {
  ufoYRef: React.MutableRefObject<number>
  serverYRef: React.MutableRefObject<number>
}) {
  const coreBeamRef = useRef<THREE.Mesh>(null)
  const midBeamRef = useRef<THREE.Mesh>(null)
  const hazeBeamRef = useRef<THREE.Mesh>(null)
  const captureRingRef = useRef<THREE.Mesh>(null)
  const captureGlowRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const beamLightRef = useRef<THREE.PointLight>(null)
  const captureLightRef = useRef<THREE.PointLight>(null)
  const particleCount = 120

  const { particlePositions, particlePhases } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const phases = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const phase = i * 0.42
      const radius = 0.045 + (i % 6) * 0.005

      phases[i] = phase
      positions[i3] = Math.sin(phase) * radius
      positions[i3 + 1] = -2.4 + (i / particleCount) * 2.4
      positions[i3 + 2] = Math.cos(phase) * radius
    }

    return { particlePositions: positions, particlePhases: phases }
  }, [particleCount])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const ufoY = ufoYRef.current
    const serverY = serverYRef.current

    const beamStartY = ufoY - 0.48
    const beamEndY = serverY - 0.58
    const distance = Math.max(0.35, beamStartY - beamEndY)
    const pulse = 1 + Math.sin(time * 8) * 0.05
    const captureY = beamEndY + 0.15

    if (coreBeamRef.current) {
      coreBeamRef.current.position.y = beamStartY
      coreBeamRef.current.scale.set(0.85 * pulse, distance, 0.85 * pulse)
    }

    if (midBeamRef.current) {
      midBeamRef.current.position.y = beamStartY
      midBeamRef.current.scale.set(1.12 * pulse, distance, 1.12 * pulse)
    }

    if (hazeBeamRef.current) {
      hazeBeamRef.current.position.y = beamStartY
      hazeBeamRef.current.scale.set(1.45 * pulse, distance, 1.45 * pulse)
    }

    if (captureRingRef.current) {
      const ringPulse = 0.92 + Math.sin(time * 6.5) * 0.08
      captureRingRef.current.position.y = captureY
      captureRingRef.current.scale.set(ringPulse, ringPulse, ringPulse)
    }

    if (captureGlowRef.current) {
      const glowPulse = 0.9 + Math.sin(time * 5.2) * 0.1
      captureGlowRef.current.position.y = captureY - 0.02
      captureGlowRef.current.scale.set(glowPulse, glowPulse, glowPulse)
    }

    if (beamLightRef.current) {
      beamLightRef.current.position.set(0, beamStartY - 0.15, 0)
      beamLightRef.current.intensity = 2.1 + Math.sin(time * 10) * 0.28
    }

    if (captureLightRef.current) {
      captureLightRef.current.position.set(0, captureY, 0)
      captureLightRef.current.intensity = 1.45 + Math.sin(time * 7.2) * 0.24
    }

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const swirl = time * 5.4

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const localRadius = (0.035 + ((i % 7) / 7) * 0.07) * pulse
        const spin = swirl + particlePhases[i]

        positions[i3] = Math.sin(spin) * localRadius
        positions[i3 + 2] = Math.cos(spin) * localRadius
        positions[i3 + 1] += 0.03 + (i % 4) * 0.004

        if (positions[i3 + 1] > beamStartY - 0.06) {
          positions[i3 + 1] = beamEndY + (i % 11) * 0.05
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      <mesh ref={coreBeamRef} position={[0, 0, 0]}>
        <coneGeometry args={[0.24, 1, 24, 1, true]} />
        <meshStandardMaterial
          color="#b5ffff"
          emissive="#9efbff"
          emissiveIntensity={2.8}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={midBeamRef} position={[0, 0, 0]}>
        <coneGeometry args={[0.38, 1, 24, 1, true]} />
        <meshStandardMaterial
          color="#8fefff"
          emissive="#8fefff"
          emissiveIntensity={1.9}
          transparent
          opacity={0.26}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={hazeBeamRef} position={[0, 0, 0]}>
        <coneGeometry args={[0.58, 1, 24, 1, true]} />
        <meshStandardMaterial
          color="#6bd5ff"
          emissive="#6bd5ff"
          emissiveIntensity={1.1}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={captureRingRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.44, 40]} />
        <meshBasicMaterial
          color="#b6ffff"
          transparent
          opacity={0.52}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={captureGlowRef} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.29, 40]} />
        <meshBasicMaterial
          color="#95eeff"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#d5ffff"
          size={0.032}
          transparent
          opacity={0.86}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <pointLight ref={beamLightRef} color="#9deeff" intensity={2.1} distance={3.8} decay={2} />
      <pointLight ref={captureLightRef} color="#7fe9ff" intensity={1.45} distance={2.6} decay={2} />
    </group>
  )
}

function SceneContent({ 
  mousePosition, 
  onReady 
}: { 
  mousePosition: { x: number; y: number }
  onReady?: () => void
}) {
  const ufoYRef = useRef(0)
  const serverYRef = useRef(-2.5)

  const handleUfoPositionUpdate = (y: number) => {
    ufoYRef.current = y
  }

  const handleServerPositionUpdate = (y: number) => {
    serverYRef.current = y
  }

  useEffect(() => {
    if (!onReady) return

    const frame = requestAnimationFrame(() => {
      onReady()
    })
    return () => cancelAnimationFrame(frame)
  }, [onReady])

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 4]} intensity={1.15} />
      <pointLight position={[0, 2.1, 1.4]} intensity={1.25} color="#8af8ff" />
      <pointLight position={[0, -1.6, 0.8]} intensity={0.85} color="#8ce7ff" />
      <pointLight position={[-1.8, 1.4, 1.5]} intensity={0.65} color="#c0f7ff" />

      {/* UFO */}
      <UFOModel 
        mousePosition={mousePosition}
        onPositionUpdate={handleUfoPositionUpdate}
      />
      
      {/* Server rack being pulled up */}
      <ServerRackModel 
        mousePosition={mousePosition} 
        ufoYRef={ufoYRef}
        onPositionUpdate={handleServerPositionUpdate}
      />
      
      {/* Energy beam - starts from UFO bottom */}
      <EnergyBeamDynamic ufoYRef={ufoYRef} serverYRef={serverYRef} />
    </>
  )
}

// Loading component with glitch effect
function UFOLoading() {
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full w-full flex items-center justify-center bg-zinc-950/50 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Glitch scan line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-1 bg-cyan-400/30 animate-glitch-scan" />
      </div>

      {/* Loading content */}
      <div className="relative z-10 text-center space-y-4">
        {/* UFO icon placeholder with glitch */}
        <div className={`relative inline-block ${glitchActive ? "animate-glitch" : ""}`}>
          <div className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-cyan-400 bg-cyan-400/10 relative">
            {/* UFO shape */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-8 sm:w-20 sm:h-10 border-2 border-cyan-400 bg-cyan-400/20 rounded-full relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 border-2 border-cyan-400 bg-cyan-400/30 rounded-full" />
              </div>
            </div>
            {/* Glitch overlay */}
            {glitchActive && (
              <>
                <div className="absolute inset-0 border-2 border-red-400 opacity-50 translate-x-1" />
                <div className="absolute inset-0 border-2 border-green-400 opacity-50 -translate-x-1" />
              </>
            )}
          </div>
        </div>

        {/* Loading text with glitch effect */}
        <div className="space-y-2">
          <h3 className={`text-xl sm:text-2xl font-pixel text-cyan-400 ${glitchActive ? "animate-glitch-text" : ""}`}>
            LOADING...
          </h3>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0s" }} />
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {LOADING_PARTICLES.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function UFO({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const [isLoading, setIsLoading] = useState(true)

  const handleSceneReady = () => {
    // Hide loading once scene is ready
    setIsLoading(false)
  }
  
  return (
    <div className="h-full w-full relative">
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <UFOLoading />
        </div>
      )}
      <div className={`h-full w-full ${isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-700"}`}>
        <Canvas
          camera={{ position: [0, 0.45, 3.6], fov: 48 }}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <SceneContent mousePosition={mousePosition} onReady={handleSceneReady} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}
