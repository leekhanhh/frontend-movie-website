import React, { useState } from "react";
import { Button, Input } from "antd";
const { Search } = Input;
import { BookOutlined, UserOutlined } from "@ant-design/icons";

const onSearch = (value, _e, info) => console.log(info?.source, value);

const NavbarMovie = (props) => {
  const [size, setSize] = useState("default");
  const [position, setPosition] = useState("end");

  return (
    <div className=" border-b-[1px] border-gray-400 w-full flex pb-2  justify-between items-end font font-MonaSans ">
      <div className="flex flex-col w-1/3 ">
        <p className="font-bold text">{props.searchTitle}</p>
        
      </div>
      <div className="flex gap-4">

      {props.activeItem ? (
          <Button
            icon={<UserOutlined />}
            iconPosition={position}
            onClick={props.toggleActor}
          >
            Actor
          </Button>
        ) : (
          <Button icon={<UserOutlined />} iconPosition={position} disabled>
            Actor
          </Button>
        )}

        {props.activeItem && props.activeCategory == "Series" ? (
          <Button icon={<BookOutlined />} iconPosition={position} onClick={props.toggleEpisode}>
            Episode
          </Button>
        ) : (
          <Button icon={<BookOutlined />} iconPosition={position} disabled>
            Episode
          </Button>
        )}
        
        <Button size={size} onClick={props.onReset}>
          Init
        </Button>
        <Button size={size} onClick={props.toggleNew}>
          New
        </Button>

        

        {props.activeItem ? (
          <Button size={size} onClick={props.toggleEdit}>
            Edit
          </Button>
        ) : (
          <Button size={size} disabled onClick={props.toggleEdit}>
            Edit
          </Button>
        )}

        {props.activeItem ? (
          <Button size={size} onClick={props.toggleDelete}>
            Delete
          </Button>
        ) : (
          <Button size={size} disabled>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavbarMovie;
