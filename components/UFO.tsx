"use client"

import { Suspense, useRef, useLayoutEffect, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment } from "@react-three/drei"
import * as THREE from "three"

function NormalizedModel({
  url,
  targetSize = 1,
  rotation = [0, 0, 0] as [number, number, number],
  mousePosition = { x: 0, y: 0 },
  initialY = 0,
}: {
  url: string
  targetSize?: number
  rotation?: [number, number, number]
  mousePosition?: { x: number; y: number }
  initialY?: number
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
      // Hover animation
      ref.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 1.5) * 0.3
      
      // Mouse interaction - tilt towards mouse
      const targetRotationX = mousePosition.y * 0.3
      const targetRotationY = mousePosition.x * 0.3
      
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
      />
    </group>
  )
}

function ServerRackModel({ 
  mousePosition, 
  ufoYPosition,
  onPositionUpdate
}: { 
  mousePosition: { x: number; y: number }
  ufoYPosition: number
  onPositionUpdate?: (y: number) => void
}) {
  const serverRef = useRef<THREE.Group>(null)
  const targetY = useRef(-2.5) // Starting position below

  useFrame((state) => {
    if (serverRef.current) {
      // Gradually pull server up towards UFO (but keep it below)
      const ufoY = ufoYPosition + Math.sin(state.clock.elapsedTime * 1.5) * 0.3
      const pullTarget = ufoY - 1.8 // Keep server 1.8 units below UFO
      
      // Smoothly move towards target
      targetY.current = THREE.MathUtils.lerp(targetY.current, pullTarget, 0.02)
      
      // Add slight hover effect
      const currentY = targetY.current + Math.sin(state.clock.elapsedTime * 2) * 0.1
      serverRef.current.position.y = currentY
      
      // Update position for beam
      if (onPositionUpdate) {
        onPositionUpdate(currentY)
      }
      
      // Slight rotation from being pulled
      serverRef.current.rotation.z = mousePosition.x * 0.1
      serverRef.current.rotation.x = mousePosition.y * 0.05
    }
  })

  return (
    <group ref={serverRef} position={[0, -2.5, 0]}>
      <NormalizedModel
        url="/server_rack.glb"
        targetSize={0.8}
        rotation={[0, 0, 0]}
        mousePosition={mousePosition}
        initialY={0}
      />
    </group>
  )
}

// Energy beam connecting UFO to server (dynamic version)
function EnergyBeamDynamic({ 
  ufoYRef, 
  serverYRef 
}: { 
  ufoYRef: React.MutableRefObject<number>
  serverYRef: React.MutableRefObject<number>
}) {
  const beamRef = useRef<THREE.Mesh>(null)
  const outerBeamRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Create particles for the beam
  const particles = useMemo(() => {
    const count = 100
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 0.1
      positions[i3 + 1] = -2.5 + (i / count) * 2
      positions[i3 + 2] = (Math.random() - 0.5) * 0.1
    }
    return positions
  }, [])

  useFrame(() => {
    const ufoY = ufoYRef.current
    const serverY = serverYRef.current
    
    // Beam starts from center of UFO's underside
    // UFO center is at ufoY, so bottom is approximately ufoY - 0.5 (half the UFO height)
    const beamStartY = ufoY - 0.5 // Start from center of UFO's bottom
    // Extend beam past the server to fully contain it (grab it)
    const beamEndY = serverY - 0.6 // End below the server to fully grab it
    const distance = Math.max(0.1, beamStartY - beamEndY)

    if (beamRef.current) {
      // Cone tip is at origin, extends downward
      // Position so tip is at UFO bottom, base reaches server
      beamRef.current.position.y = beamStartY
      // Scale height to match distance
      beamRef.current.scale.set(1, distance, 1)
    }

    if (outerBeamRef.current) {
      outerBeamRef.current.position.y = beamStartY
      outerBeamRef.current.scale.set(1, distance, 1)
    }

    // Animate particles moving up
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.02
        if (positions[i + 1] > beamStartY) {
          positions[i + 1] = beamEndY
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      {/* Main beam - cone shape (narrow tip at UFO, wider base extending past server) */}
      {/* ConeGeometry: tip at top (y=0), base at bottom (y=-height) */}
      <mesh ref={beamRef} position={[0, 0, 0]}>
        <coneGeometry args={[0.25, 1, 16, 1, true]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={2}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Outer glow - wider cone */}
      <mesh ref={outerBeamRef} position={[0, 0, 0]}>
        <coneGeometry args={[0.5, 1, 16, 1, true]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={1}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
            count={100}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00ffff"
          size={0.05}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
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
    // Notify parent that scene is ready
    if (onReady) {
      const timer = setTimeout(() => {
        onReady()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [onReady])

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 4]} intensity={1.2} />
      <pointLight position={[0, 3, 2]} intensity={1} color="#00ffff" />
      <pointLight position={[0, -2, 2]} intensity={0.5} color="#00ffff" />

      <Environment preset="city" />

      {/* UFO */}
      <UFOModel 
        mousePosition={mousePosition}
        onPositionUpdate={handleUfoPositionUpdate}
      />
      
      {/* Server rack being pulled up */}
      <ServerRackModel 
        mousePosition={mousePosition} 
        ufoYPosition={ufoYRef.current}
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
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function UFO({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Preload the models for faster loading
    useGLTF.preload("/ufo.glb")
    useGLTF.preload("/server_rack.glb")
  }, [])

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
          camera={{ position: [0, 0.5, 4], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <SceneContent mousePosition={mousePosition} onReady={handleSceneReady} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}
