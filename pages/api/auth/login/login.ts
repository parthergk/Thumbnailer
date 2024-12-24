import User from "@/database/models/userModel";
import connectDB from "@/lib/connection";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'

export async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    } 

    const {email, username, password} = req.body;

    if (!password || (!email && !username)) {
        return res.status(400).json({ success: false, message: "Email/Username and Password are required" });
    }

    await connectDB();

    try {
         const user = await User.findOne(email ? { email } : { username });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or username" });
        }

        // Validate the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: { name: user.name, username: user.username, email: user.email }, // Exclude password
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}