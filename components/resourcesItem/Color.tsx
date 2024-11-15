import React, { useState } from 'react';
import { Pipette } from 'lucide-react';
import ColorClip from './ColorClip';

// Define the structure of a single color
interface ColorProps {
  code: string;
  name: string;
}

// Define the structure of the props passed to the Color component
interface ColorComponentProps {
  data: ColorProps[]; // data is an array of ColorProps
}

const Color: React.FC<ColorComponentProps> = ({ data }) => {
  console.log("color data", data);

  const [eyeColor, setEyeColor] = useState<string>(''); // State for storing the picked color

  // Function to open the EyeDropper API and pick a color
  const eyeDropper = async () => {
    if (!('EyeDropper' in window)) {
      alert('EyeDropper API is not supported in this browser.');
      return;
    }

    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();

      setEyeColor(result.sRGBHex); // Set the selected color to eyeColor
    } catch (err) {
      console.error("Color selection was canceled or an error occurred:", err);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-4 my-3">
        {data.map((color) => (
          <div key={color.code} className="flex flex-col">
            <span className="text-sm">{color.name}</span>
            <ColorClip color={color.code} />
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
