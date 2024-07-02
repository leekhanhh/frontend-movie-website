import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import DoorIcon from "./icons/DoorIcon";
import UserIcon from "./icons/UserIcon";
import UseCookie from "../hooks/UseCookie";
const Header = () => {
  const navigate = useNavigate();
  const { removeToken } = UseCookie();
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData(["Accountprofile"]);

  const handleLogout = () => {
    removeToken();
    localStorage.clear();
    navigate("/");
  };
  const items = [
    {
      key: "1",
      label: (
        <div
          className="flex flex-row items-center gap-2 px-2 py-1"
          onClick={() => navigate(`/profile/${data?.account?.id}`)}
        >
          <UserIcon />
          <p className="text-base ">Profile</p>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="flex flex-row items-center gap-2 px-2 py-1"
          onClick={() => handleLogout()}
        >
          <DoorIcon />
          <p className="text-base ">Logout</p>
        </div>
      ),
    },
  ];
  return (
    <header className="relative flex items-center justify-center py-10 mb-5 text-white header gap-x-5">
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Movies
      </NavLink>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
        arrow
      >
        <div className="absolute right-0 w-10 h-10 rounded-full cursor-pointer hover:opacity-50 ">
          <img
            src={data?.account?.avatarPath}
            alt=""
            className="object-scale-down w-full h-full rounded-full "
          />
        </div>
      </Dropdown>
    </header>
  );
};

export default Header;
