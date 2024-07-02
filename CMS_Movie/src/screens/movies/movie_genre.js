import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/navbar/navbar";
import TableComp from "../../components/common/table/table";
import ModalComp from "../../components/common/modal/modal";
import MovieForm from "../../components/common/form/movie-form";
import ConfirmModal from "../../components/common/modal/confirm-modal";

import { useDispatch, useSelector } from "react-redux";
import {
  listAllCategoryAndGenre,
  listDetailCategory,
  deleteCategory
} from "../../actions/categoryAction";
import GenreRegisterForm from "../../components/common/form/genre-register-form";
import { Empty, Spin } from "antd";
import ModalEdit from "../../components/common/modal/edit-modal";
import CategoryEditForm from "../../components/common/form/category-edit-form";

const MovieGenre = () => {
  const genreTitle = "Genre Register";
  const genreEditTitle = "Genre Update"
  const genreSearchTitle = "Genre";
  const [modalNew, setModalNew] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [genreID, setGenreID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const GenreList = useSelector(
    (state) => state.categoryGenreList?.categories
  );

  const GenreDetailList = useSelector(
    (state) => state.categoryDetail?.category
  )

  let totalGenre ;
  
  try{
    totalGenre = GenreList?.filter((item) => item.kind === 1).length ;
  }catch(error){
    totalGenre = 0;
  }



  

  // Toggle modal

  const showUpModalNew = async () => {
    setModalNew(!modalNew);
  };

  const showUpModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const showUpModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  // Generate custom Table

  const columns = [
    {
      title: "Genre Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    }
  ];

  // Logic Code

  useEffect(() => {
    dispatch(listAllCategoryAndGenre());
  }, []);

  useEffect(() => {
    if (isLoading) {
      
      const timer = setTimeout(() => {
        dispatch(listAllCategoryAndGenre());
        setIsLoading(false);
      }, 1000);
      

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const updateGenreID = (id) => {
    setGenreID(id);
    dispatch(listDetailCategory(id))
  };

  const loadingPage = () =>{
    setIsLoading(true);
    setGenreID(null);
  }

  const deleteGenreByID = (id)=>{
    dispatch(deleteCategory(id));
    setIsLoading(true);
    setModalDelete(false);
    setGenreID(null)
  }

  const onReset = () =>{
    setModalNew(false);
    setModalEdit(false);
    setModalDelete(false);
    setIsLoading(true);
    setGenreID(null);
  }






  return (
    <>
      <Navbar
        searchTitle={genreSearchTitle}
        toggleNew={showUpModalNew}
        toggleEdit={showUpModalEdit}
        toggleDelete={showUpModalDelete}
        onReset={onReset}
        activeItem={genreID}
      />

      {/* Modal New */}
      <ModalComp
        title={genreTitle}
        isModal={modalNew}
        toggleNew={showUpModalNew}
        form={<GenreRegisterForm toggleNew={showUpModalNew} onLoading={loadingPage} />}
      />


      {/* Modal Delete */}
      <ConfirmModal isModal={modalDelete} toggleModal={showUpModalDelete} onDelete={() => deleteGenreByID(genreID)}  />.


      <ModalEdit title={genreEditTitle} isModal={modalEdit} toggleEdit={showUpModalEdit} form={<CategoryEditForm isModal={modalEdit} toggleEdit={showUpModalEdit} onLoading={loadingPage} data={GenreDetailList} />}/>

      <div className="mt-8">
        
      {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Spin size="large" />
            </div>
          ) : GenreList ? (
            <TableComp
            data={GenreList?.filter((item) => item.kind === 1)?.map(
              (item, index) => ({
                ...item,
                key: `category-${index}`,
              })
            )}
            columns={columns}
            selectedRow={updateGenreID}
            totalItem={totalGenre}
          />
          ) : (<Empty/>) }
      </div>
    </>
  );
};

export default MovieGenre;
