// src/App.tsx
import  { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ShirtModel from '../components/ShirtModel'

export default function Customization () {
  const [shirtColor, setShirtColor] = useState('#3b82f6')
  const [text, setText] = useState('Your Text')
  const [textColor, setTextColor] = useState('#ffffff')
  const [textSize, setTextSize] = useState(0.15)
  const [textPosition, setTextPosition] = useState<[number, number, number]>([0, -0.5, 0.26])
  const [font, setFont] = useState('Arial')
  const [textStyle, setTextStyle] = useState<'normal' | 'bold' | 'italic'>('normal')
  const [showSymbols, setShowSymbols] = useState(false)
  const [isDraggingText, setIsDraggingText] = useState(false)
  const [isChangingDepth, setIsChangingDepth] = useState(false)
  const [textRotation, setTextRotation] = useState<[number, number, number]>([0, 0, 0]);

  const presetColors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
    '#8b5cf6', '#06b6d4', '#f97316', '#ec4899', 
    '#ffffff', '#000000'
  ]

  const textPresetColors = [
    '#ffffff', '#000000', '#ef4444', '#10b981', 
    '#3b82f6', '#f59e0b', '#8b5cf6', '#06b6d4'
  ]

  const fontOptions = [
    'Arial', 'Helvetica', 'Times New Roman', 'Courier New',
    'Georgia', 'Verdana', 'Brush Script MT', 'Impact', 'Comic Sans MS'
  ]

  const symbolCategories = {
    "Stars": ["★", "☆", "✪", "✦", "✧", "✩", "✫", "✬", "✭", "✮", "✯", "✰"],
    "Hearts": ["❤", "♥", "❥", "❣", "♡", "💕", "💖", "💗", "💘", "💝"],
    "Other": ["☀", "☁", "☂", "☃", "☎", "☘", "☮", "☯", "☠", "☢", "☣", "☤"]
  }

  const handlePositionChange = (newPos: [number, number, number]) => {
    setTextPosition(newPos);
  };

  const resetTextPosition = () => {
    setTextPosition([0, -3, 0.16])
  }

  const handleDragStart = () => {
    setIsDraggingText(true)
  }

  const handleDragEnd = () => {
    setIsDraggingText(false)
    setIsChangingDepth(false)
  }

  const handleDepthChange = () => {
    setIsChangingDepth(true)
  }

  const resetTextRotation = () => {
    setTextRotation([0, 0, 0]);
  };

  // Helper function to convert degrees to radians
  const degToRad = (degrees: number) => degrees * (Math.PI / 180);

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Controls Panel */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 10,
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '25px',
        marginTop:'60px',
        borderRadius: '15px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        maxWidth: '320px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', color: '#333', fontWeight: 'bold' }}>
          🎨 Customize Your Shirt
        </h3>

        {/* Text Design Section */}
        <div style={{ marginBottom: '25px' }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#333' }}>✏️ Text Design</h4>
          
          <div style={{ marginBottom: '15px'}}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text..."
              style={{ width: '100%', padding: '10px', marginBottom: '10px' , border:'2px solid black'}}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Text Size: {Math.round(textSize * 100)}%</label>
            <input
              type="range"
              min="0.05"
              max="0.3"
              step="0.01"
              value={textSize}
              onChange={(e) => setTextSize(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '15px'}}>
            <label>Text Color:</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              style={{ width: '50px', height: '35px', marginBottom: '10px'}}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {textPresetColors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setTextColor(color)}
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: color,
                    border: textColor === color ? '3px solid #333' : '2px solid #ddd'
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Font:</label>
            <select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            >
              {fontOptions.map((fontOption) => (
                <option key={fontOption} value={fontOption}>{fontOption}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Style:</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setTextStyle('normal')}
                style={{ padding: '8px 12px', background: textStyle === 'normal' ? '#3b82f6' : '#f3f4f6' }}
              >
                Normal
              </button>
              <button
                onClick={() => setTextStyle('bold')}
                style={{ padding: '8px 12px', background: textStyle === 'bold' ? '#3b82f6' : '#f3f4f6' }}
              >
                Bold
              </button>
              <button
                onClick={() => setTextStyle('italic')}
                style={{ padding: '8px 12px', background: textStyle === 'italic' ? '#3b82f6' : '#f3f4f6' }}
              >
                Italic
              </button>
            </div>
          </div>


          <div style={{ marginBottom: '15px' }}>
            <button
              onClick={() => setShowSymbols(!showSymbols)}
              style={{ width: '100%', padding: '10px' }}
            >
              {showSymbols ? 'Hide Symbols' : 'Show Symbols'}
            </button>
            {showSymbols && (
              <div style={{ marginTop: '10px' }}>
                {Object.entries(symbolCategories).map(([category, symbols]) => (
                  <div key={category} style={{ marginBottom: '10px' }}>
                    <div style={{ fontWeight: 'bold' }}>{category}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {symbols.map((symbol) => (
                        <button
                          key={symbol}
                          onClick={() => setText(text + symbol)}
                          style={{ padding: '8px' }}
                        >
                          {symbol}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#333' }}>
            📍 Text Position
          </h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            marginBottom: '10px'
          }}>
            <div>
              <label>X: {textPosition[0].toFixed(2)}</label>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.01"
                value={textPosition[0]}
                onChange={(e) => setTextPosition([parseFloat(e.target.value), textPosition[1], textPosition[2]])}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label>Y: {textPosition[1].toFixed(2)}</label>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.01"
                value={textPosition[1]}
                onChange={(e) => setTextPosition([textPosition[0], parseFloat(e.target.value), textPosition[2]])}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label>Depth: {textPosition[2].toFixed(2)}</label>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                value={textPosition[2]}
                onChange={(e) => setTextPosition([textPosition[0], textPosition[1], parseFloat(e.target.value)])}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#333' }}>
              🔄 Text Rotation (Degrees)
            </h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              marginBottom: '10px'
            }}>
              <div>
                <label>Tilt X: {Math.round(textRotation[0] * (180/Math.PI))}°</label>
                <input
                  type="range"
                  min="-90"
                  max="90"
                  step="1"
                  value={Math.round(textRotation[0] * (180/Math.PI))}
                  onChange={(e) => setTextRotation([degToRad(parseFloat(e.target.value)), textRotation[1], textRotation[2]])}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label>Tilt Y: {Math.round(textRotation[1] * (180/Math.PI))}°</label>
                <input
                  type="range"
                  min="-90"
                  max="90"
                  step="1"
                  value={Math.round(textRotation[1] * (180/Math.PI))}
                  onChange={(e) => setTextRotation([textRotation[0], degToRad(parseFloat(e.target.value)), textRotation[2]])}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label>Rotate: {Math.round(textRotation[2] * (180/Math.PI))}°</label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  value={Math.round(textRotation[2] * (180/Math.PI))}
                  onChange={(e) => setTextRotation([textRotation[0], textRotation[1], degToRad(parseFloat(e.target.value))])}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            
            {/* Quick rotation presets */}
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Quick Presets:</div>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setTextRotation([0, 0, degToRad(-15)])}
                  style={{
                    padding: '5px 8px',
                    fontSize: '12px',
                    background: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  -15°
                </button>
                <button
                  onClick={() => setTextRotation([0, 0, degToRad(-5)])}
                  style={{
                    padding: '5px 8px',
                    fontSize: '12px',
                    background: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  -5°
                </button>
                <button
                  onClick={() => setTextRotation([0, 0, degToRad(5)])}
                  style={{
                    padding: '5px 8px',
                    fontSize: '12px',
                    background: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  +5°
                </button>
                <button
                  onClick={() => setTextRotation([0, 0, degToRad(15)])}
                  style={{
                    padding: '5px 8px',
                    fontSize: '12px',
                    background: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  +15°
                </button>
              </div>
            </div>
            
            <button
              onClick={resetTextRotation}
              style={{
                width: '100%',
                padding: '10px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Reset Rotation
            </button>
          </div>

          <button
            onClick={resetTextPosition}
            style={{
              width: '100%',
              padding: '10px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            Reset Position
          </button>
          <div style={{ 
            padding: '10px', 
            background: isDraggingText ? '#f0f9ff' : 'transparent',
            borderRadius: '8px',
            border: isDraggingText ? '1px solid #3b82f6' : 'none'
          }}>
            {isDraggingText ? (
              <div>
                <div style={{ color: '#3b82f6', fontWeight: 'bold', marginBottom: '5px' }}>
                  🖱️ Dragging text - release to place
                </div>
                <div style={{ color: '#666', fontSize: '14px' }}>
                  {isChangingDepth 
                    ? 'Scroll wheel: Adjusting depth' 
                    : 'Scroll wheel: Adjust depth (Z-axis)'}
                </div>
              </div>
            ) : (
              <div style={{ color: '#666' }}>
                Tip: Click and drag the text to position it. Use scroll wheel to adjust depth.
              </div>
            )}
          </div>
        </div>


         {/* Shirt Color Section */}
        <div style={{ marginBottom: '25px' }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#333' }}>👔 Shirt Color</h4>
          <input
            type="color"
            value={shirtColor}
            onChange={(e) => setShirtColor(e.target.value)}
            style={{ width: '60px', height: '40px', marginBottom: '10px' }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {presetColors.map((color, index) => (
              <button
                key={index}
                onClick={() => setShirtColor(color)}
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: color,
                  border: shirtColor === color ? '3px solid #333' : '2px solid #ddd',
                  borderRadius: '8px'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />
        <pointLight position={[0, 0, 5]} intensity={1.2} />
        <spotLight position={[0, 10, 0]} intensity={0.8} />

        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={1.5}
          maxDistance={8}
        />

        <ShirtModel 
          color={shirtColor} 
          text={text}
          textColor={textColor}
          textSize={textSize}
          textPosition={textPosition}
          font={font}
          style={textStyle}
          onPositionChange={handlePositionChange}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDepthChange={handleDepthChange}
          textRotation={textRotation}
        />
      </Canvas>
    </div>
  )
}