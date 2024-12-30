import User from "@/database/models/userModel";
import connectDB from "@/lib/connection";
import { NextApiRequest, NextApiResponse } from "next";

export default async function verifyEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { code, username } = req.body;

  // Validate required fields
  if (!username || !code) {
    return res.status(400).json({ success: false, message: "Username and verification code are required." });
  }

  await connectDB();

  try {
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist with this username." });
    }

    // Check if the verification code matches
    if (user.verifyCode === code) {
      // Optional: Update user's status to verified
      user.isVerified = true;
      await user.save();

      return res.status(200).json({ success: true, message: "Email verification successful." });
    } else {
      return res.status(400).json({ success: false, message: "Incorrect verification code." });
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
}
