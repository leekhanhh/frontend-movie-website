import React, { useState } from "react";

import { SwiperSlide, Swiper } from "swiper/react";

import MovieCard from "./MovieCard";
import { useQuery } from "@tanstack/react-query";
import { getListMovieClientApi } from "../../apis/movie";
interface MovieListProps {
  type: string;
}
const MovieList = (props: MovieListProps) => {
  const [listMovieState, setListMovieState] = useState<object[]>([]); // Provide the correct type for the state variable
  const { data: listMovie } = useQuery({
    queryKey: ["listMovie", props.type],
    queryFn: () =>
      getListMovieClientApi(props.type).then((res) => {
        return res.data.content;
      }),
  });
  console.log(listMovie);
  return (
    <div className="movie-list ">
      <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
        {listMovie?.length > 0 &&
          listMovie?.map((item) => (
            // console.log(item)
            <SwiperSlide key={item.id}>
              <MovieCard item={item} key={item.id}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
