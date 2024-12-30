import User from "@/database/models/userModel";
import connectDB from "@/lib/connection";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

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

        //hashing password
        const hashPassword = await bcrypt.hash(password, 10);

        //generating Verify code 
        let verifyCode = Math.floor(1000 + Math.random() * 9000).toString();

        // Create and save the new user
        const newUser = new User({ name, username, email, password: hashPassword, verifyCode, isVerified:false });
        await newUser.save();

        //sending verificationEmail
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);        

        if (!emailResponse.success) {
            return res.status(500).json({success: false, message: emailResponse.message});
        }

        return res.status(201).json({ success: true, message: "User registered successfully. Please verify your account.", username: newUser.username });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ success: false, message: "An error occurred registering the user" });
    }
}
