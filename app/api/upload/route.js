import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Post from "@/models/Post";
import { connectDB } from "../../../lib/mongodb";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const link = formData.get("link");
    const name = formData.get("name") || "Untitled Post";
    const description = formData.get("description") || "";
    const image = formData.get("image");

    if (!link) {
      return NextResponse.json(
        { error: "Redirection link is required" },
        { status: 400 }
      );
    }

    // Handle image upload if provided
    let imagePath = null;
    if (image && image.name) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, image.name);
      fs.writeFileSync(filePath, buffer);
      imagePath = `/uploads/${image.name}`;
    }

    // Save post in MongoDB
    const newPost = await Post.create({
      name,
      description,
      link,
      image: imagePath,
    });

    return NextResponse.json({
      message: "✅ Upload successful",
      post: newPost,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
