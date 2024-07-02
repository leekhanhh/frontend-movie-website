import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

interface MovieVideosProps {
  linkvideo?: string;
}
const MovieVideos = (props: MovieVideosProps) => {
  const { id } = useParams();
  const [linkVideoState, setLinkVideoState] = useState<string>("");
  // console.log("linkvideo", props.linkvideo);

  // console.log("link video", props.linkvideo);
  // const videoRef = useRef(null);
  // const [blobUrl, setBlobUrl] = useState(null);

  // useEffect(() => {
  //   if (props.linkvideo) {
  //     fetchVideoData();
  //   }
  // }, [props.linkvideo]);

  // const fetchVideoData = async () => {
  //   try {
  //     const response = await axios.get(props.linkvideo, {
  //       responseType: "arraybuffer",
  //     });

  //     const blob = new Blob([response.data], { type: "video/mp4" });
  //     const url = URL.createObjectURL(blob);
  //     setBlobUrl(url);
  //     console.log("Video fetched", url);
  //   } catch (error) {
  //     console.error("Error fetching video", error);
  //   }
  // };
  useEffect(() => {
    setLinkVideoState(props.linkvideo as string);
  }, [props.linkvideo]);

  return (
    <div className="flex flex-col gap-3">
      <p className="mb-10 text-3xl font-bold text-center text-white ">Films</p>
      <video controls src={linkVideoState}>
        <source src={linkVideoState} type="video/mp4" />
        <source src={linkVideoState} type="video/mkv" />
        {/* <source
          src={
            "https://movies-website-tlcn-project.s3.ap-southeast-1.amazonaws.com/Video/1080p/fast_and_furious.mp4"
          }
          type="video/mp4"
        /> */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default MovieVideos;
