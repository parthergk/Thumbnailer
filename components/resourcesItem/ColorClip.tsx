import CopyClip from './CopyClip';

interface ColorClipProps {
    color: string;
}

const ColorClip: React.FC<ColorClipProps> = ({ color }) => {
    return (
        <div className="flex gap-2 mt-1">
            <div
                className="w-10 h-10 border"
                style={{ backgroundColor: color || '#ffffff' }}
            />
            <input
                value={color || ''}
                readOnly
                className="flex-1 text-center text-neutral-800 dark:text-neutral-300 border rounded-sm w-full outline-none shadow-lg"
            />
            <CopyClip copyClip={color} />
        </div>
    );
};

export default ColorClip;
