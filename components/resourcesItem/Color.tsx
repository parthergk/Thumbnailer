import React, { useState } from 'react';
import { Pipette } from 'lucide-react';
import ColorClip from './ColorClip';

const Color: React.FC = () => {
  const [eyeColor, setEyeColor] = useState<string>('');

  const colors = ["Text color", "Background color"];

  const eyeDropper = async () => {
    if (!window.EyeDropper) {
      alert('EyeDropper API is not supported in this browser.');
      return;
    }
    const eyeDropper = new window.EyeDropper();
    try {
      const result = await eyeDropper.open();
      setEyeColor(result.sRGBHex);
    } catch (err) {
      console.error("Color selection was canceled or an error occurred:", err);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-4 my-3">
        {colors.map((color) => (
          <div key={color} className="flex flex-col">
            <span className="text-sm">{color}</span>
            <ColorClip color="#212121" />
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex justify-between">
          <label className="text-sm font-medium">Custom Color</label>
          <button onClick={eyeDropper}>
            <Pipette className="h-4 w-4" />
          </button>
        </div>
        <ColorClip color={eyeColor} />
      </div>
    </>
  );
};

export default Color;
