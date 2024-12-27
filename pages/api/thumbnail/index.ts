import Thumbnail from "@/database/models/dataModel";
import User from "@/database/models/userModel";
import connectDB from "@/lib/connection";
import { NextApiRequest, NextApiResponse } from "next";

export default async function saveThumbnail (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    } 
    const { userId, imgUrl } = req.body;

    await connectDB();
    try {
        // Await the user query to ensure the user is found before proceeding
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Update or create the Thumbnail document
        const result = await Thumbnail.findOneAndUpdate(
            { img: imgUrl, user: userId }, // Corrected the userId condition
            { img: imgUrl, user: user._id }, // Ensure user._id is used
            { upsert: true, new: true }
        );

        return res.status(200).json({ success: true, message: "Image stored", data: result });
    } catch (error) {
        console.error("Error in thumbnail route:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
