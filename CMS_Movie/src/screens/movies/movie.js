import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/navbar/navbar";
import TableComp from "../../components/common/table/table";
import ModalComp from "../../components/common/modal/modal";
import MovieForm from "../../components/common/form/movie-form";
import ConfirmModal from "../../components/common/modal/confirm-modal";
import { listMovie, deleteMovie } from "../../actions/movieAction";
import { useDispatch, useSelector } from "react-redux";
import { listCategories, listGenre } from "../../actions/categoryAction";
import { Spin,Button,Rate,Empty } from "antd";
import ModalEdit from "../../components/common/modal/edit-modal";
import MovieEditForm from "../../components/common/form/movie-edit-form";
import { listMovieDetail } from "../../actions/movieAction";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import NavbarMovie from "../../components/common/navbar/navbarMovie";
import Actor from "../actor/actor";
import Episode from "../episode/Episode";

const Movie = () => {
  const movieSearchTitle = "Movie";
  const movieEditTitle = "Movie Edit";
  const movieTitle = "Movie Register";
  const [modalNew, setModalNew] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [movieID, setMovieID] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isActorPage, setIsActorPage] = useState(false);
  const [isEpisodePage,setIsEpisodePage] = useState(false);

  const [position, setPosition] = useState('end');

  const dispatch = useDispatch();
  const MovieList = useSelector((state) => state.movieList?.movieList);
  let totalMovie;
  try{
    totalMovie = MovieList.length;
  }catch(error){
    totalMovie = 0;
  }
  const MovieDetailList = useSelector(
    (state) => state.movieDetail?.movie
  )
  

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

  const showUpActorPage = () =>{
    setIsActorPage(!isActorPage);
  }

  const showUpEpisodePage = () =>{
    setIsEpisodePage(!isEpisodePage);
  }

  const loadingPage = () =>{
    setIsLoading(true);
    setMovieID(null);
  }

  // Generate custom Table

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Category",
      render: (_, record) => <CategoryName record={record} />,
    },
    {
      title: "Genres",
      render: (_, record) => <GenreCategories record={record} />,
    },
    {
      title: "Modified Date",
      dataIndex: "modifiedDate",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
    },
    {
      title: "Rating",
      render: (_, record) => <Rate disabled defaultValue={record.ratingAverage} />, 
    }
  ];

  const CategoryName = ({ record }) => {
    return record.category.name;
  };
  const GenreCategories = ({ record }) => {
    return (
      <div>
        {record.genres.map((genre, index) => (
          <span key={index}>
            {genre.categoryName}
            {index < record.genres.length - 1 && ", "}
          </span>
        ))}
      </div>
    );
  };

  // Logic Code

  useEffect(() => {
    dispatch(listMovie());
    // dispatch(listCategories());
    dispatch(listGenre());
  }, []);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        dispatch(listMovie());
        dispatch(listGenre());

        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const updateMovieID = (id) => {
    setMovieID(id);
    dispatch(listMovieDetail(id));
  };
  const updateCategoryName = (name) =>{
    setCategoryName(name);
    console.log(name)
  }

  const deleteMovieByID = (id) => {
    dispatch(deleteMovie(id));
    setIsLoading(true);
    setModalDelete(false);
    setMovieID(null)
  }

  const onReset = () =>{
    setModalNew(false);
    setModalDelete(false);
    setModalEdit(false);
    setIsActorPage(false);
    setMovieID(null);
    setIsLoading(true);
  }



  return (
    <>
    {(!isEpisodePage && !isActorPage) && (<>
      <NavbarMovie
        searchTitle={movieSearchTitle}
        toggleNew={showUpModalNew}
        toggleEdit={showUpModalEdit}
        toggleDelete={showUpModalDelete}
        toggleActor={showUpActorPage}
        toggleEpisode={showUpEpisodePage}
        onReset={onReset}
        activeItem={movieID}
        activeCategory={categoryName}
      />

      {/* Modal New */}
      <ModalComp
        title={movieTitle}
        isModal={modalNew}
        toggleNew={showUpModalNew}
        form={<MovieForm toggleNew={showUpModalNew} onLoading={loadingPage} />}
      />

      {/* Modal Delete */}

      <ConfirmModal isModal={modalDelete} toggleModal={showUpModalDelete} onDelete={() => deleteMovieByID(movieID)} />

      {/* <ModalEdit title={genreEditTitle} isModal={modalEdit} toggleEdit={showUpModalEdit} form={<CategoryEditForm isModal={modalEdit} toggleEdit={showUpModalEdit} onLoading={loadingPage} data={GenreDetailList} />}/> */}

      <ModalEdit title={movieEditTitle} isModal={modalEdit} toggleEdit={showUpModalEdit} form={<MovieEditForm isModal={modalEdit} toggleEdit={showUpModalEdit} onLoading={loadingPage} data={MovieDetailList} id={movieID} />}/>

      <div className="mt-8">

      {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Spin size="large" />
            </div>
          ) : MovieList ? (
            <TableComp
          data={MovieList?.map((item, index) => ({
            ...item,
            key: `movie-${index}`,
          }))}
          columns={columns}
          selectedRow={updateMovieID}
          selectedCategory={updateCategoryName}
          totalItem={totalMovie}
        />
          ) : (
            <Empty/>
          )}
        
      </div>
    </>)}

    {isActorPage &&  (<Actor movieID={movieID} toggleActor={showUpActorPage} handleReset={onReset}/>)}
    {isEpisodePage && (<Episode movieID={movieID} toggleEpisode={showUpEpisodePage} handleReset={onReset}/>)}
      
    </>
  );
};

export default Movie;
