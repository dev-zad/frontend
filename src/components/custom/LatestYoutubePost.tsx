import React, { useState, useEffect } from 'react';
import YouTubeCard from './YoutubeCard'; // Adjust the import path based on your file structure

const LatestYouTubePost: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>(''); // State to hold the video URL
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(''); // State to hold the thumbnail URL
  const [title, setTitle] = useState<string>(''); // State to hold the video title

  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const videoUrl = 'https://www.youtube.com/watch?v=d8ISbsB5k1Q'; // Example YouTube video URL

        // Extract video ID from the YouTube URL
        const videoId = extractVideoId(videoUrl);

        // Fetch YouTube page content to extract thumbnail and title
        const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const html = await response.text();

        // Extract thumbnail URL using regex
        const thumbnailMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
        const extractedThumbnailUrl = thumbnailMatch ? thumbnailMatch[1] : '';

        // Extract title using regex
        const titleMatch = html.match(/<title>([^<]*)<\/title>/);
        const extractedTitle = titleMatch ? titleMatch[1] : 'Untitled Video';

        setVideoUrl(videoUrl);
        setThumbnailUrl(extractedThumbnailUrl);
        setTitle(extractedTitle);
      } catch (error) {
        console.error('Error fetching video info:', error);
      }
    };

    fetchVideoInfo();
  }, []);

  // Function to extract video ID from YouTube URL
  const extractVideoId = (url: string): string => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^&\n?#]+)/);
    return match ? match[1] : '';
  };

  return (
    <div className="max-w-md mx-auto my-4 p-4 bg-white rounded shadow-md">
      <YouTubeCard
        videoUrl={videoUrl}
        thumbnailUrl={thumbnailUrl}
        title={title}
      />
    </div>
  );
};

export default LatestYouTubePost;
