import User from "@/database/models/userModel";
import connectDB from "@/lib/connection";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';

export default async function registerUser(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    } 

    const { name, username, email, password } = req.body;

    // Basic validation
    if (!name || !username || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    await connectDB();

    try {
        // Check if the username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        // Check if the email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: "User already exists with this Email" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({ name, username, email, password: hashPassword });
        await newUser.save();

        console.log("User registered successfully");
        return res.status(201).json({ success: true, message: "User registered successfully", user: newUser });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ success: false, message: "An error occurred registering the user" });
    }
}
