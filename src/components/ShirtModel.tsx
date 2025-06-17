import React from 'react'
import GLTFShirt from "./GLTFShirt"
import FallbackShirt from "./FallbackShirt"
import ShirtText from "./ShirtText"

interface ShirtModelProps {
  color: string;
  text: string;
  textColor: string;
  textSize: number;
  textPosition: [number, number, number];
  font?: string;
  style?: 'normal' | 'bold' | 'italic';
  onPositionChange?: (pos: [number, number, number]) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDepthChange: () => void;
  textRotation: [number, number, number];
}

const ShirtModel: React.FC<ShirtModelProps> = ({ 
  color, 
  text, 
  textColor, 
  textSize, 
  textPosition,
  font = 'Arial',
  style = 'normal',
  onPositionChange = () => {},
  onDragStart = () => {},
  onDragEnd = () => {},
  textRotation
}) => {
  return (
    <group>
      <React.Suspense fallback={<FallbackShirt color={color} />}>
        <GLTFShirt color={color} />
      </React.Suspense>
      
      {text && text.trim() !== '' && (
        <ShirtText 
          text={text} 
          color={textColor} 
          size={textSize}
          position={textPosition}
          font={font}
          style={style}
          onPositionChange={onPositionChange}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          rotation={textRotation}
        />
      )}
    </group>
  )
}

export default ShirtModel