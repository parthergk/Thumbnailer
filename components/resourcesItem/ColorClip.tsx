
import { Input } from '../ui/input';
import CopyClip from './CopyClip';


interface ColorClipProps {
    color: string;
}

const ColorClip: React.FC<ColorClipProps> = ({ color }) => {

    return (
        <div className="flex gap-2 mt-1">
            <div
                className="w-10 h-10  border"
                style={{ backgroundColor: color || '#ffffff' }}
            />
            <Input
                value={color || ''}
                readOnly
                className="flex-1"
            />
            <CopyClip copyClip={color}/>
        </div>
    );
};

export default ColorClip;
