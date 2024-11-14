'use server'
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

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
    throw error;
  }
}

// Helper to download image and save it as a temporary file
async function downloadAndSaveImage(imageUri: string): Promise<string> {
  const response = await axios.get(imageUri, { responseType: 'arraybuffer' });
  const imgBuffer = Buffer.from(response.data);

  const tempFilePath = path.join(__dirname, `temp-img.jpg`);
  await writeFile(tempFilePath, imgBuffer);

  return tempFilePath;
}

// Helper to upload image from file path
async function uploadImage(filePath: string): Promise<string> {
  const fileManager = new GoogleAIFileManager(process.env.GOOGLE_AI_API_KEY);
  const uploadResult = await fileManager.uploadFile(filePath, {
    mimeType: "image/jpeg",
    displayName: "Uploaded Image",
  });
  console.log(`Uploaded file as: ${uploadResult.file.uri}`);
  return uploadResult.file.uri;
}

// Helper to analyze image with generative model
async function analyzeImage(prompt: string, imageUri: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent([
    prompt,
    { fileData: { fileUri: imageUri, mimeType: "image/jpeg" } },
  ]);
  console.log("Analysis Result:", result.response.text());
  return result.response.text();
}
