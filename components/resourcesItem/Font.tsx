import React, { useState, ChangeEvent } from 'react';
import { Input } from '../ui/input';
import CopyClip from './CopyClip';
// import { textData } from '@/lib/constant/data';

interface FontItem {
  text: string;
  [key: string]: string;
}

interface FontProps {
  data: FontItem[];
}

const Font: React.FC<FontProps> = ({ textData }) => {

  const [selectedText, setSelectedText] = useState<string>("BACKEND");
  const selectedTextDetail = textData.find((item) => item.text === selectedText) as FontItem;

  const handleSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedText(e.target.value);
  };

  return (
    <div className="w-full flex flex-col gap-2 my-1">
      <select
        className="text-center border py-2 rounded-md outline-none"
        onChange={handleSelection}
        value={selectedText}
      >
        {textData.map((item) => (
          <option key={item.text} value={item.text}>
            {item.text}
          </option>
        ))}
      </select>
      {selectedTextDetail &&
        Object.entries(selectedTextDetail)
          .filter(([key]) => key !== "text")
          .map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className="text-sm">{key}</span>
              <div className="flex gap-2">
                <Input value={value} readOnly className="h-8 text-center" />
                {/* Render CopyClip only for "Family" */}
                {key === "Family" && <CopyClip copyClip={value} />}
              </div>
            </div>
          ))}
    </div>
  );
};

export default Font;
