'use server'
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import fs from "fs";
import path from "path";

const { writeFile, unlink } = fs.promises;

interface ImageInterface {
  prompt: string;
  img: string;
}

// Main AI API function
export async function aiApi({ prompt, img }: ImageInterface): Promise<string> {
  try {
    // Step 1: Download image and save to temporary file
    const tempFilePath = await downloadAndSaveImage(img);

    // Step 2: Upload the image and get its URI
    const imageUri = await uploadImage(tempFilePath);

    // Step 3: Analyze the image with the prompt
    const analysisResult = await analyzeImage(prompt, imageUri);

    // Clean up the temporary file
    await unlink(tempFilePath);

    return analysisResult;
  } catch (error) {
    console.error("Error in aiApi:", error);
    throw new Error('Failed to process image and generate content');
  }
}

// Helper to download image and save it as a temporary file
async function downloadAndSaveImage(imageUri: string): Promise<string> {
  try {
    const response = await axios.get(imageUri, { responseType: 'arraybuffer' });
    const imgBuffer = Buffer.from(response.data);

    // Use the writable temp directory
    // const tempFilePath = path.join('/tmp', 'temp-img.jpg');
    const tempFilePath = path.join(__dirname, `temp-img.jpg`);
    await writeFile(tempFilePath, imgBuffer);

    return tempFilePath;
  } catch (error) {
    console.error("Error downloading the image:", error);
    throw new Error('Failed to download image');
  }
}

// Helper to upload image from file path
async function uploadImage(filePath: string): Promise<string> {
  try {
    if (!process.env.GOOGLE_AI_API_KEY) {
      throw new Error('GOOGLE_AI_API_KEY is not defined');
    }
    
    const fileManager = new GoogleAIFileManager(process.env.GOOGLE_AI_API_KEY);
    const uploadResult = await fileManager.uploadFile(filePath, {
      mimeType: "image/jpeg",
      displayName: "Uploaded Image",
    });
    console.log(`Uploaded file as: ${uploadResult.file.uri}`);
    return uploadResult.file.uri;
  } catch (error) {
    console.error("Error uploading the image:", error);
    throw new Error('Failed to upload image');
  }
}

// Helper to analyze image with generative model
async function analyzeImage(prompt: string, imageUri: string): Promise<string> {
  try {
    if (!process.env.GOOGLE_AI_API_KEY) {
      throw new Error('GOOGLE_AI_API_KEY is not defined');
    }
    
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log("Prompt", prompt);
    
    const result = await model.generateContent([
      prompt,
      { fileData: { fileUri: imageUri, mimeType: "image/jpeg" } },
    ]);

    console.log("Result", result);
    

    console.log("Analysis Result:", result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("Error analyzing the image:", error);
    throw new Error('Failed to analyze image');
  }
}
