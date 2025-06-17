// // src/components/FallbackShirt.jsx
// import { useFrame } from "@react-three/fiber"
// import { useRef } from "react"
// import * as THREE from 'three'

// const FallbackShirt = ({ color }: { color: string }) => {
//   const meshRef = useRef()
  
//   useFrame((state) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
//     }
//   })

//   // Create a basic shirt-like shape using geometry
//   return (
//     <group ref={meshRef}>
//       {/* Main body */}
//       <mesh position={[0, 0, 0]}>
//         <boxGeometry args={[1.5, 2, 0.3]} />
//         <meshStandardMaterial color={color} />
//       </mesh>
      
//       {/* Left sleeve */}
//       <mesh position={[-1.2, 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
//         <cylinderGeometry args={[0.25, 0.3, 1.2, 8]} />
//         <meshStandardMaterial color={color} />
//       </mesh>
      
//       {/* Right sleeve */}
//       <mesh position={[1.2, 0.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
//         <cylinderGeometry args={[0.25, 0.3, 1.2, 8]} />
//         <meshStandardMaterial color={color} />
//       </mesh>
      
//       {/* Collar */}
//       <mesh position={[0, 0.9, 0.05]}>
//         <torusGeometry args={[0.4, 0.1, 8, 16]} />
//         <meshStandardMaterial color={new THREE.Color(color).multiplyScalar(0.8)} />
//       </mesh>
//     </group>
//   )
// }

// export default FallbackShirt

import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from 'three'

const FallbackShirt = ({ color }: { color: string }) => {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  // Create a basic shirt-like shape using geometry
  return (
    <group ref={meshRef}>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Left sleeve */}
      <mesh position={[-1.2, 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.25, 0.3, 1.2, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Right sleeve */}
      <mesh position={[1.2, 0.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.25, 0.3, 1.2, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Collar */}
      <mesh position={[0, 0.9, 0.05]}>
        <torusGeometry args={[0.4, 0.1, 8, 16]} />
        <meshStandardMaterial color={new THREE.Color(color).multiplyScalar(0.8)} />
      </mesh>
    </group>
  )
}

export default FallbackShirt
