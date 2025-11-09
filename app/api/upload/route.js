import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Post from "@/models/Post";
import { connectDB } from "../../../lib/mongodb";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
// const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const getVulnerabilityStatus = async (data) => {
  const prompt = `
    You are a security analyzer. Analyze the following post for any potential
    vulnerabilities, phishing, malware, or unsafe links.

    Post details:
    - URL: ${data.link || "none"}
    - Text: ${data.description || "none"}

    Respond strictly in JSON:
    {
      "status": "safe" | "suspicious" | "vulnerable" | "dangerous",
      "reason": "one short paragraph explanation"
    }
  `;



  try {
    const result = await model.generateContent(prompt);

    if (!result?.response) throw new Error("No response from Gemini API");

    const text = result.response.text();
    console.log("🧠 Gemini raw output:", text);

    // Extract only JSON portion if Gemini adds extra text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in Gemini output");

    const parsed = JSON.parse(jsonMatch[0]);
    console.log("✅ Parsed Gemini output:", parsed);
    return parsed;
  } catch (err) {
    

    console.error("❌ Gemini parsing error:", err.message);
    return { status: "unknown", reason: err.message };
  }
};

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

      if (!fs.existsSync(uploadDir))
        fs.mkdirSync(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, image.name);
      fs.writeFileSync(filePath, buffer);
      imagePath = `/uploads/${image.name}`;
    }

    // Save post in MongoDB

    let analysis;
    try {
      analysis = await getVulnerabilityStatus({
        link: link,
        description: description,
      });
      console.log(analysis);
    } catch {
      analysis = { status: "unknown", reason: "none" };
    }

    // newPost.status = analysis.status;
    // newPost.analysis = analysis.reason;

    const newPost = await Post.create({
      name,
      description,
      link,
      image: imagePath,
      status: analysis.status,
      analysis: analysis.reason,
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
