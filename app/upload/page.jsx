"use client";
import { useState } from "react";

export default function UploadPage() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!link) {
      setMessage("⚠️ Redirection link is required.");
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
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-5 text-center">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Optional Post Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
          rows="3"
        ></textarea>

        <input
          type="url"
          placeholder="Redirection Link (required)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border border-gray-300 rounded-md p-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold p-2 rounded-md hover:bg-blue-700"
        >
          Upload Post
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
}
