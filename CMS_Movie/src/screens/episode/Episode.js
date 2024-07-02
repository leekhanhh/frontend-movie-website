import React, { useState, useEffect } from "react";

import TableComp from "../../components/common/table/table";
import ModalComp from "../../components/common/modal/modal";
import ConfirmModal from "../../components/common/modal/confirm-modal";
import ModalEdit from "../../components/common/modal/edit-modal";
import { Spin, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";

import SubNavBar from "../../components/common/navbar/subNavbar";
import {
  listEpisodesByMovieID,
  listEpisodeDetail,
  deleteEpisode,
} from "../../actions/episodeAction";
import EpisodeRegisterForm from "../../components/common/form/episode-register-form";
import EpisodeEditForm from "../../components/common/form/episode-edit-form";

const Episode = (props) => {
  const dispatch = useDispatch();
  const EpisodeSearchTitle = "Episode";
  const EpisodeEditTitle = "Episode Edit";
  const EpisodeTitle = "Episode Register";
  const [modalNew, setModalNew] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [episodeID, setEpisodeID] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const EpisodeList = useSelector((state) => state.episodeList?.episodes);
  const EpisodeDetail = useSelector((state) => state.episodeDetail?.episode);

  let totalEpisode;

  try {
    totalEpisode = EpisodeList.length;
  } catch (error) {
    console.error("Error calculating total episodes:", error);
    totalEpisode = 0;
  }

  const columns = [
    {
      title: "Episode Number",
      dataIndex: "episodeNumber",
    },
    {
      title: "Episode Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Link Movie",
      dataIndex: "url",
    },
  ];

  //   Toggle Modal
  const showUpModalNew = async () => {
    setModalNew(!modalNew);
  };

  const showUpModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const showUpModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const loadingPage = () => {
    setIsLoading(true);
    setEpisodeID(null);
  };
  //  Logic Code

  useEffect(() => {
    dispatch(listEpisodesByMovieID(props.movieID));
  }, []);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        dispatch(listEpisodesByMovieID(props.movieID));

        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const onReset = () => {
    setModalNew(false);
    setModalDelete(false);
    setModalEdit(false);
    setEpisodeID(null);
    setIsLoading(true);
  };

  const updateEpisodeID = (id) => {
    setEpisodeID(id);
    dispatch(listEpisodeDetail(id));
  };

  const deleteEpisodeByID = (id) => {
    dispatch(deleteEpisode(id));
    setIsLoading(true);
    setModalDelete(false);
    setEpisodeID(null);
  };

  const handleBack = () => {
    props.toggleEpisode();
    props.handleReset();
  };

  return (
    <>
      <SubNavBar
        searchTitle={EpisodeSearchTitle}
        toggleNew={showUpModalNew}
        toggleEdit={showUpModalEdit}
        toggleDelete={showUpModalDelete}
        toggleBack={handleBack}
        onReset={onReset}
        activeItem={episodeID}
      />
      <ModalComp
        title={EpisodeTitle}
        isModal={modalNew}
        toggleNew={showUpModalNew}
        form={
          <EpisodeRegisterForm
            toggleNew={showUpModalNew}
            onLoading={loadingPage}
            movieID={props.movieID}
          />
        }
      />
      <ConfirmModal
        isModal={modalDelete}
        toggleModal={showUpModalDelete}
        onDelete={() => deleteEpisodeByID(episodeID)}
      />

      {/* <ConfirmModal
        isModal={modalDelete}
        toggleModal={showUpModalDelete}
        onDelete={() => deleteActorByID(actorID)}
      /> */}
      <ModalEdit
        title={EpisodeEditTitle}
        isModal={modalEdit}
        toggleEdit={showUpModalEdit}
        form={
          <EpisodeEditForm
            isModal={modalEdit}
            toggleEdit={showUpModalEdit}
            onLoading={loadingPage}
            data={EpisodeDetail}
            id={episodeID}
          />
        }
      />
      {/* Modal New */}
      {/* <ModalComp
        title={accountTitle}
        isModal={modalNew}
        toggleNew={showUpModalNew}
        form={
          <AccountRegisterForm
            toggleNew={showUpModalNew}
            onLoading={loadingPage}
          />
        }
      /> */}

      {/* Delete Account */}
      {/* <ConfirmModal
        isModal={modalDelete}
        toggleModal={showUpModalDelete}
        onDelete={() => deleteAccountByID(accountID)}
      /> */}

      {/* Edit Account */}

      {/* <ModalEdit
        title={accountEditTitle}
        isModal={modalEdit}
        toggleEdit={showUpModalEdit}
        form={
          <AccountEditForm
            isModal={modalEdit}
            toggleEdit={showUpModalEdit}
            onLoading={loadingPage}
            data={AccountDetail}
            id={accountID}
          />
        }
      /> */}

      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spin size="large" />
          </div>
        ) : EpisodeList ? (
          <TableComp
            data={EpisodeList?.map((item, index) => ({
              ...item,
              key: `Episode-${index}`,
            }))}
            columns={columns}
            selectedRow={updateEpisodeID}
            totalItem={totalEpisode}
          />
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default Episode;
