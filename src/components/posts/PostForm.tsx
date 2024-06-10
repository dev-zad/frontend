import React, { useState } from 'react';
import { Input, Form } from 'antd';
import { Button } from '../ui/button';
import dynamic from 'next/dynamic';

const { TextArea } = Input;
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface PostFormProps {
  addPost: (content: string, image: string) => void
}

const PostForm: React.FC<PostFormProps> = ({ addPost }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);


  const onFinish = () => {
    addPost(content, image);
    setContent('');
    setImage('');

  };



  return (
    <Form onFinish={onFinish} className="mb-4">
      <Form.Item>
        <TextArea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
        />
      </Form.Item>
      <div className='flex flex-row'>
        <Form.Item className='px-4'>
          <Button variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
            Upload Image
          </Button>
        </Form.Item>
        <Form.Item>
          <Button variant="outline" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            Emoji
          </Button>
          {showEmojiPicker && (
            <EmojiPicker onEmojiClick={(emojiObject) => setContent(content + emojiObject.emoji)} />
          )}
        </Form.Item>
      </div>

      <Form.Item>
        <Button variant="default" type="submit" className="w-full">
          Post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
