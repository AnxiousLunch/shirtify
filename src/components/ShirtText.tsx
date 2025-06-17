// import React, { useMemo, useRef, useState, useEffect } from 'react'
// import * as THREE from 'three'
// import { useDrag, useWheel } from '@use-gesture/react'
// import { useThree } from '@react-three/fiber'

// interface ShirtTextProps {
//   text: string;
//   color: string;
//   size: number;
//   position: [number, number, number];
//   font: string;
//   style: 'normal' | 'bold' | 'italic';
//   onPositionChange: (pos: [number, number, number]) => void;
//   onDragStart?: () => void;
//   onDragEnd?: () => void;
//   onDepthChange?: () => void;
//   rotation: [number, number, number]; 
// }

// const ShirtText: React.FC<ShirtTextProps> = ({ 
//   text, 
//   color, 
//   size, 
//   position, 
//   font,
//   style,
//   onPositionChange,
//   onDragStart,
//   onDragEnd,
//   onDepthChange,
//   rotation,
// }) => {
//   const meshRef = useRef<THREE.Mesh>(null)
//   const { camera } = useThree()
//   const [isDragging, setIsDragging] = useState(false)
//   const raycaster = useMemo(() => new THREE.Raycaster(), [])
//   const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1)), [])
//   const initialPosition = useRef(new THREE.Vector3(...position))

//   // Set plane constant to shirt front depth
//   useEffect(() => {
//     plane.constant = -position[2]
//   }, [position, plane])

//   // Handle drag positioning
//   const bindDrag = useDrag(({ event, first, last }) => {
//     if (!event) return
    
//     if (first) {
//       setIsDragging(true)
//       if (onDragStart) onDragStart()
//       initialPosition.current.copy(meshRef.current!.position)
//     }
//     if (last) {
//       setIsDragging(false)
//       if (onDragEnd) onDragEnd()
//     }
    
//     const canvas = event.target as HTMLCanvasElement
//     const rect = canvas.getBoundingClientRect()
    
//     // Calculate normalized device coordinates
//     const pointer = {
//       x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
//       y: -((event.clientY - rect.top) / rect.height) * 2 + 1
//     }
    
//     raycaster.setFromCamera(pointer, camera)
    
//     // Find intersection point with the shirt plane
//     const intersection = new THREE.Vector3()
//     raycaster.ray.intersectPlane(plane, intersection)
    
//     // Apply shirt offset to Y position
//     const newPosition: [number, number, number] = [
//       intersection.x,
//       intersection.y - 3, // Account for shirt offset
//       position[2]  // Maintain current z-depth
//     ]
    
//     onPositionChange(newPosition)
//   }, { event: true })

//   // Handle Z-axis manipulation with mouse wheel
//   const bindWheel = useWheel(({ delta: [_, dy] }) => {
//     if (!isDragging) return
    
//     // Adjust depth based on wheel movement
//     const depthChange = dy * 0.001
//     const newDepth = Math.min(Math.max(position[2] + depthChange, 0.1), 0.3)
    
//     onPositionChange([position[0], position[1], newDepth])
//     if (onDepthChange) onDepthChange()
//   })

//   const textTexture = useMemo(() => {
//     if (!text) return null
    
//     const canvas = document.createElement('canvas')
//     const context = canvas.getContext('2d')
//     if (!context) throw new Error('Could not get canvas context')
    
//     canvas.width = 2048
//     canvas.height = 1024
//     context.clearRect(0, 0, canvas.width, canvas.height)
    
//     const fontSize = Math.max(96, size * 600)
//     const fontStyle = style === 'italic' ? 'italic' : 'normal'
//     const fontWeight = style === 'bold' ? 'bold' : 'normal'
//     context.font = `${fontStyle} ${fontWeight} ${fontSize}px "${font}", Arial, sans-serif`
//     context.textAlign = 'center'
//     context.textBaseline = 'middle'
    
//     // Add text outline for better visibility
//     context.strokeStyle = '#000000';
//     context.lineWidth = 6;
//     context.strokeText(text, canvas.width / 2, canvas.height / 2);
    
//     // Create gradient for text
//     const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
//     gradient.addColorStop(0, color)
//     gradient.addColorStop(1, new THREE.Color(color).multiplyScalar(0.8).getStyle())
//     context.fillStyle = gradient
    
//     context.fillText(text, canvas.width / 2, canvas.height / 2)
    
//     const texture = new THREE.CanvasTexture(canvas)
//     texture.anisotropy = 16
//     texture.minFilter = THREE.LinearFilter
//     texture.magFilter = THREE.LinearFilter
    
//     return texture
//   }, [text, color, size, font, style])

//   return (
//     <mesh 
//       position={position}
//       rotation={rotation}
//       ref={meshRef}
//       {...bindDrag()}
//       {...bindWheel()}
//     >
//       <planeGeometry args={[size * 3, size * 1.5]} />
//       <meshPhysicalMaterial 
//         map={textTexture}
//         transparent={true}
//         alphaTest={0.5}
//         side={THREE.DoubleSide}
//         roughness={0.2}
//         metalness={0.0}
//         clearcoat={0.1}
//         clearcoatRoughness={0.2}
//         depthWrite={false}
//         polygonOffset={true}
//         polygonOffsetFactor={1}
//         polygonOffsetUnits={1}
//         emissive={isDragging ? '#ffffff' : '#000000'}
//         emissiveIntensity={isDragging ? 0.5 : 0}
//         opacity={isDragging ? 0.9 : 1}
//       />
//     </mesh>
//   )
// }

// export default ShirtText



import React, { useMemo, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useDrag, useWheel } from '@use-gesture/react'
import { useThree } from '@react-three/fiber'

interface ShirtTextProps {
  text: string;
  color: string;
  size: number;
  position: [number, number, number];
  font: string;
  style: 'normal' | 'bold' | 'italic';
  onPositionChange: (pos: [number, number, number]) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDepthChange?: () => void;
  rotation: [number, number, number]; 
}

const ShirtText: React.FC<ShirtTextProps> = ({ 
  text, 
  color, 
  size, 
  position, 
  font,
  style,
  onPositionChange,
  onDragStart,
  onDragEnd,
  onDepthChange,
  rotation,
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()
  const [isDragging, setIsDragging] = useState(false)
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1)), [])
  const initialPosition = useRef(new THREE.Vector3(...position))

  // Set plane constant to shirt front depth
  useEffect(() => {
    plane.constant = -position[2]
  }, [position, plane])

  // Handle drag positioning
  const bindDrag = useDrag(({ event, first, last }) => {
    if (!event || !('clientX' in event)) return; // Ensure the event has clientX/clientY

    if (first) {
      setIsDragging(true)
      if (onDragStart) onDragStart()
      initialPosition.current.copy(meshRef.current!.position)
    }
    if (last) {
      setIsDragging(false)
      if (onDragEnd) onDragEnd()
    }

    const canvas = event.target as HTMLCanvasElement
    const rect = canvas.getBoundingClientRect()

    // Calculate normalized device coordinates using THREE.Vector2
    const pointer = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    )

    raycaster.setFromCamera(pointer, camera)

    // Find intersection point with the shirt plane
    const intersection = new THREE.Vector3()
    raycaster.ray.intersectPlane(plane, intersection)

    // Apply shirt offset to Y position
    const newPosition: [number, number, number] = [
      intersection.x,
      intersection.y - 3, // Account for shirt offset
      position[2]  // Maintain current z-depth
    ]

    onPositionChange(newPosition)
  })

  // Handle Z-axis manipulation with mouse wheel
  const bindWheel = useWheel(({ delta: [_, dy] }) => {
    if (!isDragging) return

    // Adjust depth based on wheel movement
    const depthChange = dy * 0.001
    const newDepth = Math.min(Math.max(position[2] + depthChange, 0.1), 0.3)

    onPositionChange([position[0], position[1], newDepth])
    if (onDepthChange) onDepthChange()
  })

  const textTexture = useMemo(() => {
    if (!text) return null

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Could not get canvas context')

    canvas.width = 2048
    canvas.height = 1024
    context.clearRect(0, 0, canvas.width, canvas.height)

    const fontSize = Math.max(96, size * 600)
    const fontStyle = style === 'italic' ? 'italic' : 'normal'
    const fontWeight = style === 'bold' ? 'bold' : 'normal'
    context.font = `${fontStyle} ${fontWeight} ${fontSize}px "${font}", Arial, sans-serif`
    context.textAlign = 'center'
    context.textBaseline = 'middle'

    // Add text outline for better visibility
    context.strokeStyle = '#000000'
    context.lineWidth = 6
    context.strokeText(text, canvas.width / 2, canvas.height / 2)

    // Create gradient for text
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, new THREE.Color(color).multiplyScalar(0.8).getStyle())
    context.fillStyle = gradient

    context.fillText(text, canvas.width / 2, canvas.height / 2)

    const texture = new THREE.CanvasTexture(canvas)
    texture.anisotropy = 16
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter

    return texture
  }, [text, color, size, font, style])

  return (
    <mesh 
      position={position}
      rotation={rotation}
      ref={meshRef}
      {...bindDrag()}
      {...bindWheel()}
    >
      <planeGeometry args={[size * 3, size * 1.5]} />
      <meshPhysicalMaterial 
        map={textTexture}
        transparent={true}
        alphaTest={0.5}
        side={THREE.DoubleSide}
        roughness={0.2}
        metalness={0.0}
        clearcoat={0.1}
        clearcoatRoughness={0.2}
        depthWrite={false}
        polygonOffset={true}
        polygonOffsetFactor={1}
        polygonOffsetUnits={1}
        emissive={isDragging ? '#ffffff' : '#000000'}
        emissiveIntensity={isDragging ? 0.5 : 0}
        opacity={isDragging ? 0.9 : 1}
      />
    </mesh>
  )
}

export default ShirtText
