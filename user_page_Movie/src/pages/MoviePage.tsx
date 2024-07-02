import React, { useEffect, useMemo, useState } from "react";
import MovieCard from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { listAllMovieApi } from "../apis/movie";
import { useSearchParams } from "react-router-dom";
import { listAllCategoryApi } from "../apis/category";
import Category from "../components/category/Category";
const MoviePage = () => {
  const [nextPage, setNextPage] = useState(1);
  const [active, setActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryType, setCategoryType] = useState(
    searchParams.get("movieGenreId") || ""
  );
  const [filter, setFilter] = useState(searchParams.get("title") || "");
  const queryParam = useMemo(() => {
    return { title: filter, movieGenreId: categoryType };
  }, [filter, categoryType]);
  const { data: listMovie } = useQuery({
    queryKey: ["listMovie", queryParam],
    queryFn: () =>
      listAllMovieApi(queryParam).then((res) => {
        if (res.data.totalElements > 0) {
          return res.data.content;
        } else {
          return [];
        }
      }),
  });
  const { data: listCategory } = useQuery({
    queryKey: ["listCategory"],
    queryFn: () =>
      listAllCategoryApi({ kind: 1 }).then((res) => {
        return res.data.content;
      }),
  });
  const handleCheckActive = () => {
    setCategoryType("");
  };
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setFilter(e.target.value);
      // setSearchParams({ title: e.target.value });
    }
  };
  const loadpage = (operator: string) => {
    if (operator === "prev") {
      setNextPage(nextPage - 1);
    } else if (operator === "next") {
      setNextPage(nextPage + 1);
    }
  };
  useEffect(() => {
    setSearchParams(queryParam);
    categoryType === "" ? setActive(true) : setActive(false);
  }, [queryParam]);
  return (
    <div className="py-10 page-container">
      <div className="flex flex-row gap-4">
        {listCategory?.length > 0 &&
          listCategory.map((item) => {
            return (
              <Category
                key={item.id}
                item={item}
                handleChooseCategory={(id) => {
                  setCategoryType(id.toString());
                }}
              />
            );
          })}
        <div
          className={`px-2 py-1  rounded-md cursor-pointer hover:bg-red-500 hover:text-white ${
            active ? "bg-red-500 text-white" : "bg-white"
          } `}
          onClick={() => handleCheckActive()}
        >
          <p>all</p>
        </div>
      </div>
      <div className="flex mt-5 mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 text-white outline-none bg-slate-800"
            placeholder="Type here to search..."
            // onChange={handleFilterChange}
            onKeyDown={(e) => handleSearch(e)}
          />
        </div>
        <button className="p-4 text-white bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {/* {loading && (
        <div className="w-10 h-10 mx-auto text-white border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin"></div>
      )} */}

      <div className="">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-4">
          {listMovie?.length > 0 &&
            listMovie?.map((item: object) => (
              <MovieCard key={item.id} item={item} kind="default"></MovieCard>
            ))}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center w-full gap-2 mt-10 xl:gap-4">
        <button
          className={`${
            nextPage === 1 ? "bg-pink-700 " : "bg-primary"
          } w-24 text-white p-2 rounded-lg`}
          onClick={() => loadpage("prev")}
          disabled={nextPage === 1}
        >
          Previous
        </button>
        <button
          className="w-24 p-2 text-white rounded-lg bg-primary"
          onClick={() => loadpage("next")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MoviePage;
