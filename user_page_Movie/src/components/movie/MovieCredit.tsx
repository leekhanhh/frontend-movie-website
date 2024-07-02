import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import { getlistCastApi } from "../../apis/cast";

const MovieCredit = () => {
  const { id } = useParams();

  const { data: listCast } = useQuery({
    queryKey: ["movieCasts", id],
    queryFn: () =>
      getlistCastApi().then((res) => {
        const tempData = res.data.content.filter((item: object) => {
          return item.movie.id === parseInt(id);
        });
        return tempData;
      }),
  });

  return (
    <div>
      <h2 className="mb-10 text-3xl font-bold text-center text-white">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {listCast &&
          listCast.map((item: object) => (
            <div className="cast-item " key={item.id}>
              <img
                src={item?.image}
                className="w-full h-[350px] rounded-lg object-cover mb-3"
                alt=""
              />
              <h2 className="text-xl font-medium text-center text-white">
                {item?.filmCharacter}
              </h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieCredit;
