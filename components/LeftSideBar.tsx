import { AlignJustify, Book, Brush, Image, Palette } from 'lucide-react';
import React, { useState } from 'react';
import { useDetailItem } from '@/context/DetailItelmProvider';
interface SidebarItem {
    name: string;
    icon: React.ReactNode;
}

const LeftSideBar: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string>('Font');
    const itemContext = useDetailItem();
    const items: SidebarItem[] = [
        { name: 'Font', icon: <Book className="w-5 h-5" /> },
        { name: 'Color', icon: <Brush className="w-5 h-5" /> },
        { name: 'Image', icon: <Image className="w-5 h-5" /> },
        { name: 'Background', icon: <Palette className="w-5 h-5" /> },
        { name: 'Detail', icon: <AlignJustify className="w-5 h-5" /> },
    ];

    const handleClick = (itemName: string): void => {
        setActiveItem(itemName);
        itemContext.setDetailItem(itemName);
    };

    return (
        <div className="w-full h-screen max-w-xs p-6 border-r">
            <div className="flex flex-col gap-2">
                {items.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => handleClick(item.name)}
                        className={`flex items-center gap-3 p-2 rounded-lg text-left text-black font-medium
                            ${activeItem === item.name ? 'bg-gray-200 ' : 'hover:bg-gray-100'}
                        `}
                    >
                        {item.icon}
                        <span className='text-sm'>{item.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LeftSideBar;
