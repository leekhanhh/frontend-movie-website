import React, { SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";
interface CategoryProps {
  item: object;
  handleChooseCategory: (id: number) => void;
}
const Category = (props: CategoryProps) => {
  // const handleClick = () => {
  //     props.handleChooseCategory(item.id); // or whatever value you want to set the state to
  //   };
  const [searchParams, setSearchParams] = useSearchParams();

  function handleCheckActive() {
    if (searchParams.get("movieGenreId") === props.item.id.toString()) {
      return true;
    }
    return false;
  }
  const active = handleCheckActive();

  //   const active= parseInt(searchParams.get("movieGenreId")) // Provide the correct type for the state variable
  return (
    <div
      className={`px-2 py-1  rounded-md cursor-pointer hover:bg-red-500 hover:text-white ${
        active ? "bg-red-500 text-white" : "bg-white"
      } `}
      onClick={() => props.handleChooseCategory(props.item.id)}
    >
      <p>{props.item.name}</p>
    </div>
  );
};

export default Category;
