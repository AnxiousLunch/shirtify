
// import { useRef, useEffect } from 'react'
// import { useGLTF } from '@react-three/drei'
// import * as THREE from 'three'

// const GLTFShirt = ({ color }: { color: string }) => {
//   const { scene } = useGLTF('/t_shirt.glb')
//   const modelRef = useRef(null)

//   useEffect(() => {
//     if (scene && modelRef.current) {
//       // Clone the scene to avoid modifying the original
//       const clonedScene = scene.clone()
      
//       // Bounding box logic
//       const box = new THREE.Box3().setFromObject(clonedScene)
//       const size = new THREE.Vector3()
//       const center = new THREE.Vector3()
//       box.getSize(size)
//       box.getCenter(center)

//       // Center model at origin
//       clonedScene.position.set(-center.x, -center.y, -center.z)

//       // Normalize scale - make it reasonably sized
//       const maxDim = Math.max(size.x, size.y, size.z)
//       const scale = 2.5 / maxDim // Increased scale for better visibility
//       clonedScene.scale.setScalar(scale)
      
//       // Position the model slightly forward and centered
//       clonedScene.position.y -= 3 // Slight upward adjustment
      
//       // Clear current children and add the cloned scene
//       while (modelRef.current.children.length > 0) {
//         modelRef.current.remove(modelRef.current.children[0])
//       }
//       modelRef.current.add(clonedScene)
//     }
//   }, [scene])

//   // Apply color to mesh materials
//   useEffect(() => {
//     if (modelRef.current) {
//       modelRef.current.traverse((child) => {
//         if (child.isMesh && child.material) {
//           if (Array.isArray(child.material)) {
//             child.material.forEach((mat) => {
//               mat.color.set(color)
//               mat.needsUpdate = true
//             })
//           } else {
//             child.material.color.set(color)
//             child.material.needsUpdate = true
//           }
//         }
//       })
//     }
//   }, [color])

//   return <group ref={modelRef} />
// }

// export default GLTFShirt

import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Group } from 'three';

const GLTFShirt = ({ color }: { color: string }) => {
  // Load GLB file
  const { scene } = useGLTF('/t_shirt.glb');

  // Strongly typed ref
  const modelRef = useRef<Group | null>(null);

  // Load model into the scene
  useEffect(() => {
    if (scene && modelRef.current) {
      const clonedScene = scene.clone();

      const box = new THREE.Box3().setFromObject(clonedScene);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      clonedScene.position.set(-center.x, -center.y, -center.z);

      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.5 / maxDim;
      clonedScene.scale.setScalar(scale);

      clonedScene.position.y -= 3;

      // TypeScript now knows children and remove are valid
      while (modelRef.current.children.length > 0) {
        modelRef.current.remove(modelRef.current.children[0]);
      }
      modelRef.current.add(clonedScene);
    }
  }, [scene]);

  // Apply color to model
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
          const mesh = child as THREE.Mesh;

          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat: THREE.Material) => {
              if ((mat as THREE.MeshStandardMaterial).color) {
                (mat as THREE.MeshStandardMaterial).color.set(color);
                mat.needsUpdate = true;
              }
            });
          } else {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.color.set(color);
            mat.needsUpdate = true;
          }
        }
      });
    }
  }, [color]);

  return <group ref={modelRef} />;
};

export default GLTFShirt;
