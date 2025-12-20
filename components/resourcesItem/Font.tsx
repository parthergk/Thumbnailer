import React, { useState, ChangeEvent } from "react";
import { Input } from "../ui/input";
import CopyClip from "./CopyClip";
import { useEffect } from "react";

interface FontItem {
  text: string;
  [key: string]: string;
}

interface FontProps {
  data: FontItem[];
}

const Font: React.FC<FontProps> = ({ data }) => {
  const [selectedText, setSelectedText] = useState<string>("");
  // Set the initial selected text to the first item when data is loaded
  useEffect(() => {
    if (data.length > 0) {
      setSelectedText(data[0].text);
    }
  }, [data]);

  const selectedTextDetail = data.find(
    (item) => item.text === selectedText
  ) as FontItem;

  const handleSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedText(e.target.value);
  };

  return (
    <>
      {data.length === 0 ? (
        <div className="w-full flex flex-col gap-3 my-1">
          <div className="text-center border py-1 rounded-sm h-9 text-neutral-600 font-medium">
            ANALYZING...
          </div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col">
              <span className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-sm w-10"></span>
              <div className="flex gap-2 bg-neutral-100 dark:bg-neutral-900 mt-1 rounded-sm h-8">
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2 my-1 p-1">
          <select
            className="text-center border py-2 rounded-md outline-none"
            onChange={handleSelection}
            value={selectedText}
          >
            {data.map((item) => (
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
                    {(key === "Family" && <CopyClip copyClip={value} />) ||
                      (key === "Color" && <CopyClip copyClip={value} />)}
                  </div>
                </div>
              ))}
        </div>
      )}
    </>
  );
};

export default React.memo(Font);
