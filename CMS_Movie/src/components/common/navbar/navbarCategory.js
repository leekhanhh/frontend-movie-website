import React, { useState } from "react";
import { Button, Input } from "antd";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const NavbarCategory = (props) => {
  const [size, setSize] = useState("default");
  

  return (
    <div className=" border-b-[1px] border-gray-400 w-full flex pb-2  justify-between items-end font font-MonaSans ">
      <div className="flex flex-col w-1/3 ">
        <p className="font-bold text">{props.searchTitle}</p>
      </div>
      <div className="flex gap-4">
        <Button size={size} onClick={props.onReset}>
          Init
        </Button>
      </div>
    </div>
  );
};

export default NavbarCategory;
