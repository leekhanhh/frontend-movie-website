import React, { useState, useEffect } from "react";
import NavbarAdmin from "../../components/common/navbar/navbarAdmin";
import TableComp from "../../components/common/table/table";
import ModalComp from "../../components/common/modal/modal";
import ConfirmModal from "../../components/common/modal/confirm-modal";
import ModalEdit from "../../components/common/modal/edit-modal";
import { Spin, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteActor,
  listActorByMovieID,
  listActorDetail,
} from "../../actions/actorAction";

import SubNavBar from "../../components/common/navbar/subNavbar";
import ActorRegisterForm from "../../components/common/form/actor-register-form";
import ActorEditForm from "../../components/common/form/actor-edit-form";


const Actor = (props) => {
  const dispatch = useDispatch();
  const ActorSearchTitle = "Actor";
  const ActorEditTitle = "Actor Edit";
  const ActorTitle = "Actor Register";
  const [modalNew, setModalNew] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [actorID, setActorID] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const ActorList = useSelector((state) => state.actorList?.actors);
  const ActorDetail = useSelector((state) => state.actorDetail?.actor);

  const totalActors = ActorList.length;

  const columns = [
    {
      title: "Image",
      render: (_, record) => (
        <Image
          width={100}
          src={record.image}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Film Character name",
      dataIndex: "filmCharacter",
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
    setActorID(null);
  };
  //  Logic Code

  useEffect(() => {
    if (ActorList) {
      dispatch(listActorByMovieID(props.movieID));
    }

  }, []);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        dispatch(listActorByMovieID(props.movieID));

        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const onReset = () => {
    setModalNew(false);
    setModalDelete(false);
    setModalEdit(false);
    setActorID(null);
    setIsLoading(true);
  };

  const updateActorID = (id) => {
    setActorID(id);
    dispatch(listActorDetail(id));
  };

  const deleteActorByID = (id) => {
    dispatch(deleteActor(id));
    setIsLoading(true);
    setModalDelete(false);
    setActorID(null);
  };

  const handleBack = () =>{
    props.toggleActor()
    props.handleReset()
  }

  return (
    <>
      <SubNavBar
        searchTitle={ActorSearchTitle}
        toggleNew={showUpModalNew}
        toggleEdit={showUpModalEdit}
        toggleDelete={showUpModalDelete}
        toggleBack={handleBack}
        onReset={onReset}
        activeItem={actorID}
      />
      <ModalComp title={ActorTitle} isModal={modalNew} toggleNew={showUpModalNew} form={<ActorRegisterForm toggleNew={showUpModalNew} onLoading={loadingPage} movieID={props.movieID}/>} />

      <ConfirmModal isModal={modalDelete} toggleModal={showUpModalDelete} onDelete={() => deleteActorByID(actorID)}/>
        <ModalEdit title={ActorEditTitle} isModal={modalEdit} toggleEdit={showUpModalEdit}  form={<ActorEditForm isModal={modalEdit} toggleEdit={showUpModalEdit} onLoading={loadingPage} data={ActorDetail} id={actorID}/>} />
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
        ) : (
          <TableComp
            data={ActorList?.map((item, index) => ({
              ...item,
              key: `actor-${index}`,
            }))}
            columns={columns}
            selectedRow={updateActorID}
            totalItem={totalActors}
          />
        )}
      </div>
    </>
  );
};

export default Actor;
