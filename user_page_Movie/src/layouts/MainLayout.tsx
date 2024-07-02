import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Header from "../shared/Header";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfileApi } from "../apis/userprofile";
import { getListFavoriteMovieByAccountIdApi } from "../apis/movie";

const MainLayout = (props) => {
  const { data: accountProfile } = useQuery({
    queryKey: ["Accountprofile"],
    queryFn: () =>
      getProfileApi().then((res) => {
        localStorage.setItem("AccountProfile", JSON.stringify(res.data));
        return res.data;
      }),
  });
  // const { data: listFavouriteMovie } = useQuery({
  //   queryKey: ["listMyFavouriteMovie"],
  //   queryFn: () =>
  //     getListFavoriteMovieByAccountIdApi({
  //       accountId: accountProfile.account.id,
  //     }).then((res) => {
  //       console.log(res.data);
  //       if (res.data.totalElements > 0) {
  //         return res.data.content;
  //       } else {
  //         return [];
  //       }
  //     }),
  // });
  // console.log(listFavouriteMovie);
  return (
    <div className="px-5 mainLayout bg-slate-900 font-body">
      <Header />
      <Outlet />
    </div>
  );
};

MainLayout.propTypes = {};

export default MainLayout;
