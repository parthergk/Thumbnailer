
export const FONT_AND_BACKGROUND_PROMPT = `
    Analyze the image and detect the title font and background of image used. Please provide the following details in JSON format:  
    1. Font Color: The hexadecimal color values of the fonts.
    2. Background Color: The hexadecimal color values of the background.

    Return the output in JSON format as shown below:

    {
        "colors": [ 
            {
                "name": "Text color", 
                "code": "#HexColorCode" 
            },
            ...
        ]
    }
`;

export const DETAILED_FONT_PROMPT = `
    Analyze the image and detect the fonts used. Please provide the following details in JSON format:
    1. Font Family: The primary font family detected in the image.
    2. Font Size: The approximate font size for each major text element.
    3. Font Weight: The font weight (e.g., regular, bold).
    4. Font Colors: The hexadecimal color values of the fonts.

    Return the output in JSON format as shown below:

    {
        "fonts": [
            {
                "text": "Sample Text",
                "Family": "Font Family Name",
                "Color": "#HexColorCode"
                "Size": "Font Size in px or pt",
                "Weight": "Font Weight",
            },
            ...
        ]
    }
`;
