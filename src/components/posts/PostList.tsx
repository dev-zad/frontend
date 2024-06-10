import React from 'react';

interface Post {
  avatar: string;
  name: string;
  username: string;
  content: string;
  image: string;
  poll: string[];
  schedule: Date | null;
  location: string;
  timestamp: Date;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <div key={index} className="p-4 mb-4 bg-white shadow rounded">
          <div className="flex items-center mb-2">
            <img src={post.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
            <div>
              <p className="font-semibold">{post.name}</p>
              <p className="text-gray-500">@{post.username}</p>
            </div>
          </div>
          <p>{post.content}</p>
          {post.image && <img src={post.image} alt="Post" className="mt-2 mb-2" />}
          {post.schedule && <p>Scheduled for: {new Date(post.schedule).toLocaleString()}</p>}
          {post.location && <p>Location: {post.location}</p>}
          <p className="text-gray-500 text-sm">Posted on: {new Date(post.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
