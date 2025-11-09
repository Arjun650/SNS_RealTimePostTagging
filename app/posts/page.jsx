// import { connectDB } from "@/lib/mongodb";
// import Post from "@/models/Post";
// import Image from "next/image";
// import Link from "next/link";

// // Helper component for the icons
// const ShieldCheckIcon = () => (
//   <svg
//     className="w-4 h-4"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12 12 0 0012 21.655a12 12 0 008.618-15.671z"
//     />
//   </svg>
// );

// const WarningIcon = () => (
//   <svg
//     className="w-4 h-4"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//     />
//   </svg>
// );

// const DangerIcon = () => (
//   <svg
//     className="w-4 h-4"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//     />
//   </svg>
// );

// const PendingIcon = () => (
//   <svg
//     className="w-4 h-4"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//     />
//   </svg>
// );

// // New component to render the status tag
// function StatusTag({ status, reason }) {
//   let styles = {
//     bgColor: "bg-gray-100",
//     textColor: "text-gray-800",
//     icon: <PendingIcon />,
//     text: "Unknown",
//   };

//   switch (status) {
//     case "safe":
//       styles = {
//         bgColor: "bg-green-100",
//         textColor: "text-green-800",
//         icon: <ShieldCheckIcon />,
//         text: "Safe",
//       };
//       break;
//     case "suspicious":
//       styles = {
//         bgColor: "bg-yellow-100",
//         textColor: "text-yellow-800",
//         icon: <WarningIcon />,
//         text: "Suspicious",
//       };
//       break;
//     case "vulnerable":
//       styles = {
//         bgColor: "bg-orange-100",
//         textColor: "text-orange-800",
//         icon: <WarningIcon />,
//         text: "Vulnerable",
//       };
//       break;
//     case "dangerous":
//       styles = {
//         bgColor: "bg-red-100",
//         textColor: "text-red-800",
//         icon: <DangerIcon />,
//         text: "Dangerous",
//       };
//       break;
//     case "pending":
//       styles = {
//         bgColor: "bg-blue-100",
//         textColor: "text-blue-800",
//         icon: <PendingIcon />,
//         text: "Pending",
//       };
//       break;
//     default:
//       styles.text = status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown";
//       break;
//   }

//   return (
//     // 'group' is used to trigger the tooltip on hover
//     <div className="relative group">
//       <div
//         className={`flex items-center space-x-1.5 px-3 py-1 rounded-full ${styles.bgColor} ${styles.textColor} text-xs font-medium`}
//       >
//         {styles.icon}
//         <span>{styles.text}</span>
//       </div>
      
//       {/* Tooltip (visible on group-hover) */}
//       {reason && (
//         <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60
//                         bg-gray-800 text-white text-xs rounded-md p-2
//                         opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 
//                         transition-all duration-150 z-10 pointer-events-none">
//           {reason}
//           <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
//                           border-x-4 border-x-transparent
//                           border-t-4 border-t-gray-800" />
//         </div>
//       )}
//     </div>
//   );
// }

// export const dynamic = "force-dynamic";

// export default async function PostsPage() {
//   await connectDB();
//   const posts = await Post.find().sort({ createdAt: -1 }).lean();

//   if (!posts.length) {
//     return <p className="text-center mt-10 text-gray-600">No posts yet.</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto mt-6 space-y-6">
//       <h1 className="text-3xl font-bold text-center mb-4">All Posts</h1>
//       {posts.map((post) => (
//         <div
//           // Updated: Added a key and hover effect
//           key={post._id.toString()} // Use .toString() for keys
//           className="bg-white shadow-md rounded-xl p-5 border border-gray-100
//                      transition-shadow duration-200 hover:shadow-lg" // UI Enhancement
//         >
//           {/* Updated: Flex container for title and tag */}
//           <div className="flex justify-between items-start mb-2">
//             <h2 className="text-xl font-semibold">{post.name}</h2>
//             {/* New: StatusTag component */}
//             <StatusTag status={post.status} reason={post.analysis} />
//           </div>

//           {post.image && (
//             <div className="relative w-full h-auto mb-3">
//               <Image
//                 src={post.image}
//                 alt={post.name}
//                 width={600}
//                 height={400}
//                 className="rounded-md w-full h-auto object-cover" // Updated: Added object-cover
//               />
//             </div>
//           )}
//           <p className="text-gray-700 mb-3">{post.description}</p>
//           <Link
//             href={post.link}
//             target="_blank"
//             className="text-blue-600 hover:underline font-medium"
//           >
//             Visit Link →
//           </Link>
//           <p className="text-sm text-gray-400 mt-2">
//             Posted on {new Date(post.createdAt).toLocaleString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }


import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import Image from "next/image";
import Link from "next/link";

// --- ICONS FOR STATUS TAG (From your code) ---
const ShieldCheckIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12 12 0 0012 21.655a12 12 0 008.618-15.671z"
    />
  </svg>
);
const WarningIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);
const DangerIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const PendingIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
// --- END ICONS FOR STATUS TAG ---

// --- NEW DUMMY ICONS FOR SOCIAL FEED ---
const UserAvatarIcon = () => (
  <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0">
    <svg
      className="w-full h-full text-gray-400"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  </div>
);

const HeartIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
    />
  </svg>
);

const ChatBubbleIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.542 15.266 3 13.684 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const ShareIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4-4 4m4-4v12"
    />
  </svg>
);

const BookmarkIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
    />
  </svg>
);
// --- END NEW DUMMY ICONS ---

// --- STATUS TAG COMPONENT (From your code) ---
function StatusTag({ status, reason }) {
  let styles = {
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
    icon: <PendingIcon />,
    text: "Unknown",
  };

  switch (status) {
    case "safe":
      styles = {
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        icon: <ShieldCheckIcon />,
        text: "Safe",
      };
      break;
    case "suspicious":
      styles = {
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800",
        icon: <WarningIcon />,
        text: "Suspicious",
      };
      break;
    case "vulnerable":
      styles = {
        bgColor: "bg-orange-100",
        textColor: "text-orange-800",
        icon: <WarningIcon />,
        text: "Vulnerable",
      };
      break;
    case "dangerous":
      styles = {
        bgColor: "bg-red-100",
        textColor: "text-red-800",
        icon: <DangerIcon />,
        text: "Dangerous",
      };
      break;
    case "pending":
      styles = {
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
        icon: <PendingIcon />,
        text: "Pending",
      };
      break;
    default:
      styles.text = status
        ? status.charAt(0).toUpperCase() + status.slice(1)
        : "Unknown";
      break;
  }

  return (
    <div className="relative group flex-shrink-0">
      <div
        className={`flex items-center space-x-1.5 px-3 py-1 rounded-full ${styles.bgColor} ${styles.textColor} text-xs font-medium`}
      >
        {styles.icon}
        <span>{styles.text}</span>
      </div>

      {/* Tooltip (visible on group-hover) */}
      {reason && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60
                     bg-gray-800 text-white text-xs rounded-md p-2
                     opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 
                     transition-all duration-150 z-10 pointer-events-none"
        >
          {reason}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
                       border-x-4 border-x-transparent
                       border-t-4 border-t-gray-800"
          />
        </div>
      )}
    </div>
  );
}
// --- END STATUS TAG COMPONENT ---

// Helper for the new action bar
function ActionButton({ icon, text, hoverColor = "hover:text-blue-600" }) {
  return (
    <button
      className={`flex items-center space-x-1.5 text-sm text-gray-500 ${hoverColor} transition-colors duration-150 group`}
    >
      <div className="p-1.5 rounded-full group-hover:bg-gray-100">
        {icon}
      </div>
      {text && <span>{text}</span>}
    </button>
  );
}

export const dynamic = "force-dynamic";

// --- UPDATED POSTS PAGE COMPONENT ---
export default async function PostsPage() {
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();

  if (!posts.length) {
    return <p className="text-center mt-10 text-gray-600">No posts yet.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-4">
      <h1 className="text-3xl font-bold text-center mb-4">All Posts</h1>
      
      {posts.map((post) => (
        <div
          key={post._id.toString()}
          className="bg-white shadow-md rounded-xl p-4 border border-gray-100"
        >
          {/* Post Header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-3">
              <UserAvatarIcon />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">Dummy User</span>
                <span className="text-xs text-gray-500">
                  @dummyuser ·{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <StatusTag status={post.status} reason={post.analysis} />
          </div>

          {/* Post Body */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{post.name}</h2>
            
            {post.description && (
              <p className="text-gray-700">{post.description}</p>
            )}
            
            {post.image && (
              <div className="relative w-full h-auto border rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.name}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            
            {post.link && (
              <Link
                href={post.link}
                target="_blank"
                className="text-blue-600 hover:underline font-medium block pt-1"
              >
                Visit Link →
              </Link>
            )}
          </div>

          {/* Post Footer (Action Bar) */}
          <div className="flex justify-around items-center pt-3 mt-4 border-t border-gray-100">
            <ActionButton
              icon={<ChatBubbleIcon />}
              text="12" // Dummy count
              hoverColor="hover:text-blue-600"
            />
            <ActionButton
              icon={<ShareIcon />}
              text="5" // Dummy count
              hoverColor="hover:text-green-600"
            />
            <ActionButton
              icon={<HeartIcon />}
              text="34" // Dummy count
              hoverColor="hover:text-pink-600"
            />
            <ActionButton
              icon={<BookmarkIcon />}
              hoverColor="hover:text-yellow-600"
            />
          </div>
        </div>
      ))}
    </div>
  );
}