import React from "react";
import { useSearchParams } from "react-router-dom";
interface EpisodeProps {
  number: number;
  url: string;
  handleChooseEpisode: (id: number) => void;
  handleChooseLinkvideo: (url: string) => void;
}
const Episode = (props: EpisodeProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleCheckActive() {
    if (searchParams.get("episode") === props.number.toString()) {
      return true;
    }
    return false;
  }
  const active = handleCheckActive();
  const handleChooseEpisode = () => {
    props.handleChooseEpisode(props.number);
    props.handleChooseLinkvideo(props.url);
  };
  return (
    <div
      className={`flex items-center justify-center w-6 h-6  rounded-full cursor-pointer hover:bg-red-400 hover:text-white ${
        active ? " bg-red-400 text-white" : "bg-white"
      }`}
      onClick={() => handleChooseEpisode()}
    >
      <p>{props.number}</p>
    </div>
  );
};

export default Episode;
