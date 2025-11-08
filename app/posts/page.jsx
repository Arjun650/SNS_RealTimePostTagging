import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic"; // ensures SSR data refresh

export default async function PostsPage() {
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();

  if (!posts.length) {
    return <p className="text-center mt-10 text-gray-600">No posts yet.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-4">All Posts</h1>
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white shadow-md rounded-xl p-5 border border-gray-100"
        >
          <h2 className="text-xl font-semibold mb-2">{post.name}</h2>
          {post.image && (
            <Image
              src={post.image}
              alt={post.name}
              width={600}
              height={400}
              className="rounded-md mb-3"
            />
          )}
          <p className="text-gray-700 mb-3">{post.description}</p>
          <Link
            href={post.link}
            target="_blank"
            className="text-blue-600 hover:underline font-medium"
          >
            Visit Link →
          </Link>
          <p className="text-sm text-gray-400 mt-2">
            Posted on {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
