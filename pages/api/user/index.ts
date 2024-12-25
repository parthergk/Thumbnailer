import { NextApiRequest, NextApiResponse } from "next";

export default function user (req: NextApiRequest, res: NextApiResponse){
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    return res.status(201).json({ success: true, message: "Hello i am gaurav " });
}