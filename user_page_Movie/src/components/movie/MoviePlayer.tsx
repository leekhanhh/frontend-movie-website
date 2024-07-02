import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const MoviePlayer = ({ videoKey }) => {
  const [videoUrl, setVideoUrl] = useState(null);
    const videoExample = "https://www.youtube.com/watch?v=EHUunMoY1Ks";
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // Gọi API để lấy dữ liệu video dưới dạng byte
        const response = await fetch(`http://localhost:8080/v1/video/stream?key=${videoKey}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        });

        // Chuyển đổi dữ liệu byte thành URL
        const videoBytes = await response.arrayBuffer();
        const blob = new Blob([videoBytes], { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);

        setVideoUrl(url);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, [videoKey]);

  return (
    <div>
      {videoUrl && (
        <ReactPlayer
          url={videoExample}
          controls
          width="100%"
          height="auto"
        />
      )}
    </div>
  );
};

export default MoviePlayer;
