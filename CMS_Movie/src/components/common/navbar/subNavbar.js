import React, { useState } from "react";
import { Button, Input } from "antd";
import { LeftOutlined } from "@ant-design/icons";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const SubNavBar = (props) => {
  const [size, setSize] = useState("default");
  

  return (
    <div className=" border-b-[1px] border-gray-400 w-full flex pb-2  justify-between items-end font font-MonaSans ">
      <div className="flex flex-row items-center w-1/3 ">
        <LeftOutlined style={{width:25, height:25, fontSize: 28}} onClick={() => {

        props.toggleBack();
        
      }}/>
        <p className="ml-2 font-bold text-lg">{props.searchTitle}</p>

      </div>
      <div className="flex gap-4">
        <Button size={size} onClick={props.onReset}>
          Init
        </Button>
        <Button size={size} onClick={props.toggleNew}>
          New
        </Button>

        {props.activeItem ? (
          <Button size={size}  onClick={props.toggleEdit}>
            Edit
          </Button>
        ) : (
          <Button size={size} disabled onClick={props.toggleEdit}>
            Edit
          </Button>
        )}

        {props.activeItem ? (
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

export default SubNavBar;
