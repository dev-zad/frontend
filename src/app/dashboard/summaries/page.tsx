"use client";
import React, { useState } from 'react';
import PostList from "@/components/posts/PostList";
import PostForm from '@/components/posts/PostForm';

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

export default async function AccountRoute() {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (content: string, image: string, poll: string[], schedule: Date | null, location: string) => {
    const newPost: Post = {
      avatar: '/assets/avatar.png',
      name: 'John Doe',
      username: 'johndoe',
      content,
      image,
      poll,
      schedule,
      location,
      timestamp: new Date(),
    };
    setPosts([newPost, ...posts]);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
      {/* <PostForm addPost={addPost} />
      <PostList posts={posts} /> */}
    </div>
  );
}