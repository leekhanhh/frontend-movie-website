import React from "react";
import { fetcher } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import BannerItem from "./BannerItem";
import useSWR from "swr";
import { useQuery } from "@tanstack/react-query";
import { getListMovieClientApi } from "../apis/movie";

const Banner = () => {
  const { data: listMovie } = useQuery({
    queryKey: ["listMovieClient", "all"],
    queryFn: () =>
      getListMovieClientApi("all").then((res) => {
        return res.data.content;
      }),
  });

  return (
    <section className="banner h-[700px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor={true} slidesPerView={"auto"}>
        {listMovie?.length > 0 &&
          listMovie?.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Banner;
