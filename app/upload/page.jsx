"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, Link as LinkIcon, FileText } from "lucide-react";

export default function UploadPage() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!link) {
      setMessage("⚠️ Redirection link is required.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("link", link);
    if (name) formData.append("name", name);
    if (description) formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Post uploaded successfully!");
        setName("");
        setLink("");
        setDescription("");
        setImage(null);
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Error uploading post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Create a New Post
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
              <FileText size={16} /> Post Name (optional)
            </label>
            <input
              type="text"
              placeholder="Enter a catchy title..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-2 transition-all"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
              <FileText size={16} /> Description (optional)
            </label>
            <textarea
              placeholder="Write a short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-2 transition-all"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
              <LinkIcon size={16} /> Redirection Link <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-2 transition-all"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
              <ImageIcon size={16} /> Upload Image
            </label>
            <div className="flex items-center justify-between border border-gray-300 rounded-lg p-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="text-sm text-gray-600 cursor-pointer w-full"
              />
              {image && (
                <span className="text-xs text-blue-600 font-medium truncate max-w-[100px]">
                  {image.name}
                </span>
              )}
            </div>
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className={`flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            <Upload size={18} />
            {loading ? "Uploading..." : "Upload Post"}
          </motion.button>
        </form>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-5 text-center text-sm font-medium ${
              message.includes("✅")
                ? "text-green-600"
                : message.includes("⚠️")
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
