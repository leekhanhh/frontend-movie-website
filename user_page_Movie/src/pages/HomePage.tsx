import React, { Fragment } from "react";
import Banner from "../shared/Banner";
import MovieList from "../components/movie/MovieList";

interface HomePageProps {}
const HomePage = (props: HomePageProps) => {
  const accountProfile = JSON.parse(
    localStorage.getItem("AccountProfile") as string
  );
  console.log(accountProfile);

  return (
    <div className="">
      <Banner />
      <Fragment>
        {/* <section className="pb-20 movies-layout page-container">
          <h2 className="mb-10 text-3xl font-bold text-white capitalize">
            Now playing
          </h2>
          <MovieList type="now_playing"></MovieList>
        </section> */}

        <section className="pb-20 movies-layout page-container">
          <h2 className="mb-10 text-3xl font-bold text-white capitalize">
            Top rated
          </h2>
          <MovieList type="top_rated"></MovieList>
        </section>
        <section className="pb-20 movies-layout page-container">
          <h2 className="mb-10 text-3xl font-bold text-white capitalize">
            Trending
          </h2>
          <MovieList type="trending"></MovieList>
        </section>
      </Fragment>
    </div>
  );
};

export default HomePage;
