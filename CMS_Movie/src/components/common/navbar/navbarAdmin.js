import React, { useState } from "react";
import { Button, Input } from "antd";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const NavbarAdmin = (props) => {
  const [size, setSize] = useState("default");
  const isAdmin = props.activeRole === 0;

  return (
    <div className=" border-b-[1px] border-gray-400 w-full flex pb-2  justify-between items-end font font-MonaSans ">
      <div className="flex flex-col w-1/3 ">
        <p className="font-bold text">{props.searchTitle}</p>
         
      </div>
      <div className="flex gap-4">
        <Button size={size} onClick={props.onReset}>
          Init
        </Button>
        <Button size={size} onClick={props.toggleNew}>
          New
        </Button>

        {(props.activeItem && isAdmin) ? (
          <Button size={size}  onClick={props.toggleEdit}>
            Edit
          </Button>
        ) : (
          <Button size={size} disabled onClick={props.toggleEdit}>
            Edit
          </Button>
        )}

        {(props.activeItem && isAdmin)? (
          <Button size={size} onClick={props.toggleDelete} >
            Delete
          </Button>
        ) : (
          <Button size={size} disabled >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavbarAdmin;
