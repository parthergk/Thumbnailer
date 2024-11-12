import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { CircleCheck, Copy } from 'lucide-react';

const CopyClip = ({copyClip}) => {
    const [copy, setCopy] = useState(true);
    let timeoutId: NodeJS.Timeout;

    const copyToClipboard = (value: string) => {
        if (value) {
            navigator.clipboard.writeText(value);
        }
        setCopy(false)
        // Clear existing timeout if present
        clearTimeout(timeoutId);

        // Reset the icon after 5 seconds
        timeoutId = setTimeout(() => {
            setCopy(true);
        }, 3000);
    };

    useEffect(() => {
        return () => clearTimeout(timeoutId);
    }, [])

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => copyToClipboard(copyClip)}
        >
            {
                copy ? <Copy className="h-4 w-4" /> : <CircleCheck />
            }


        </Button>
    )
}

export default CopyClip