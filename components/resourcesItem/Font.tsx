import React from 'react';
import { Input } from '../ui/input';
import CopyClip from './CopyClip';

interface FontItem {
    [key: string]: string;
}

const Font: React.FC = () => {
    const fonts: FontItem[] = [
        { Family: 'Arial' },
        { Size: '96px' },
        { Weight: 'Bold' },
    ];

    return (
        <div className="w-full flex flex-col gap-4 my-3">
            {fonts.map((font) => {
                const key = Object.keys(font)[0] as keyof FontItem;
                const value = font[key];

                return (
                    <div key={key} className="flex flex-col gap-1">
                        <span className="text-sm">{key}</span>
                        <div className="flex gap-2">
                            <Input
                                value={value}
                                readOnly
                                className="h-8 text-center"
                            />
                            {/* Render CopyClip only for "Family" */}
                            {key === "Family" && <CopyClip copyClip={value} />}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Font;
