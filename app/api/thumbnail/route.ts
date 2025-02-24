import Thumbnail from "@/database/models/dataModel";
import User from "@/database/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
  }

  const requiredBody = z.object({
    userId: z.string(),
    imgUrl: z.string(),
  });

  const parsedBody = requiredBody.safeParse(await req.json());

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        success: false,
        message: "User Id and Image Url are required.",
      },
      { status: 400 }
    );
  }

  try {
    const user = await User.findById({userId: parsedBody.data.userId});

    if (!user) {
        return NextResponse.json({ success: false, message: "User not found" }, {status: 400});
    }

    const result = await Thumbnail.findOneAndUpdate(
        {img: parsedBody.data.imgUrl, user: parsedBody.data.userId},
        {img: parsedBody.data.imgUrl, user: user._id},
        { upsert: true, new: true }
    )

    return NextResponse.json({success: true, message: "Image stored", data: result}, {status: 200});
  } catch (error) {
    console.error("Error in thumbnail route:", error);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}
