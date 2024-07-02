import React from "react";
import { useNavigate } from "react-router";
interface BannerItemProps {
  item: object;
}
const BannerItem = (props: BannerItemProps) => {
  const navigate = useNavigate();
  console.log(props.item.imagePath);
  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`${props.item.imagePath}`}
        alt=""
        className="object-cover object-center w-full h-full rounded-lg"
      ></img>
      <div className="absolute w-full text-white left-5 bottom-5">
        <h2 className="mb-5 text-3xl font-bold">{props.item.title}</h2>

        {/* <div className="flex items-center mb-8 gap-x-3">
          <h3 className="text-xl font-bold text-white ">Score</h3>
          <span className="px-4 py-2 border border-white rounded-md">
            {props.item.vote_average}
          </span>
        </div> */}
        <button
          onClick={() => navigate(`/movie/${props.item.id}`)}
          className="px-6 py-3 font-medium text-white rounded-lg bg-primary "
        >
          Watch now
        </button>
      </div>
    </div>
  );
};

export default BannerItem;
