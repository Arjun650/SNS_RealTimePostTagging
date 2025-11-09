import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  name: { type: String, default: "Untitled Post" },
  description: { type: String, default: "" },
  link: { type: String, required: true },
  image: { type: String, default: null },
  status: {type: String, default: "pending"},
  analysis: {type: String, default: ""}, 
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
