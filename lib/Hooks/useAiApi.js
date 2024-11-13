import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";


export const useAiApi = ({prompt, img})=>{
    const fileManager = new GoogleAIFileManager('AIzaSyCCD5kogGM5hjTON-PXlhVZdfPuejWp2bU');

    const fileUploadHandel = async(filePath)=>{
        const uploadResult = await fileManager.uploadFile(filePath,{
            mimeType: 'image/jpeg',
            displayName: "Uploaded Image",
        })
        return uploadResult.file.uri;
    }


    const analyzeImage = async ()=>{
        const genAI = new GoogleGenerativeAI('AIzaSyCCD5kogGM5hjTON-PXlhVZdfPuejWp2bU');
        const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

        const result = await model.generateContent([prompt,{
            fileData: {
                fileUri: imageUri,
                mimeType: "image/jpeg",
            }
        }])

        return result.response.text();
    }

    const main = async ()=>{
        const imageUri = await fileUploadHandel(img);
        const data = await analyzeImage(imageUri);
        return data
    }

    return main();
}

