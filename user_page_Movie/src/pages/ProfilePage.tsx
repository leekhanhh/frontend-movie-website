import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import EditIcon from "../shared/icons/EditIcon";
import dayjs from "dayjs";
import Modal from "react-modal";
import CloseIcon from "../shared/icons/CloseIcon";
import { getUserProfileApi, updateProfileApi } from "../apis/userprofile";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ListFavoriteMovie from "../components/movie/ListFavoriteMovie";
import { uploadImageApi } from "../apis/file";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  getListFavoriteMovieByAccountIdApi,
  getListFavouriteMovieAllApi,
} from "../apis/movie";

dayjs.extend(customParseFormat);
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
  },
};
const ProfilePage = () => {
  const { id } = useParams();
  const [imgComunity, setImgComunity] = useState(null);
  const [checkOwner, setCheckOwner] = useState(false);
  const [listFavouriteMovieState, setListFavouriteMovieState] = useState([]); // Provide the correct type for the state variable
  const accountProfile = JSON.parse(
    localStorage.getItem("AccountProfile") as string
  );

  const queryClient = useQueryClient();
  const { data: userProfile } = useQuery({
    queryKey: ["profile", id],
    queryFn: () =>
      getUserProfileApi(id).then((res) => {
        return res.data;
      }),
  });

  const { mutateAsync: uploadImage, isPending: isLoadingUploadImage } =
    useMutation({
      mutationKey: ["uploadImage"],
      mutationFn: uploadImageApi,
      onSuccess: (res) => {
        setImgComunity(res.data.filePath);
      },
    });
  const { mutateAsync: updateProfile } = useMutation({
    mutationKey: ["editProfile"],
    mutationFn: updateProfileApi,
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // console.log(e.target.elements.)

    const tempData = {
      fullname: e.target.elements["fullname"].value,
      email: e.target.elements["email"].value,
      phone: e.target.elements["phone"].value,
      gender: parseInt(e.target.elements["gender"].value),
      dateOfBirth: dayjs(e.target.elements["dob"].value).format(
        "DD/MM/YYYY HH:mm:ss"
      ),
      id: id,
    };
    updateProfile(tempData).then((res) => {
      message.success("Update profile success");
      queryClient.invalidateQueries(["profile", id]);
      setIsOpen(false);
    });
  };
  const { data: listFavouriteMovieByAccountId } = useQuery({
    queryKey: ["listFavouriteMovieByAccountId"],
    queryFn: () =>
      getListFavouriteMovieAllApi({ accountId: id }).then((res) => {
        if (res.data.totalElements === 0) {
          return [];
        } else {
          return res.data.content;
        }
      }),
  });
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    if (accountProfile.account.id === parseInt(id)) {
      setCheckOwner(true);
    }
  }, [id]);
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-7">
      <div className="bg-white w-[800px] h-[400px] flex flex-row  px-2 py-3 rounded-xl ">
        <div className="flex flex-col gap-3 items-center justify-center border-r px-4 border-[#ccc] w-max">
          <div className="w-20 h-20 rounded-full  border border-[#ccc]">
            <img
              src={
                userProfile?.account?.avatarPath ||
                "https://i.pinimg.com/236x/d9/d3/71/d9d3710a513c8d8b52862eb3f40961c3.jpg"
              }
              alt=""
              className="object-scale-down w-full h-full rounded-full"
            />
          </div>
          {/* <div className=" w-max bg-[#5d5caf] px-2 py-1 rounded-lg hover:text-white cursor-pointer">
            Change avatar
          </div> */}
          <Upload
            action={(file) => {
              uploadImage({ file: file, type: "avatar" }).then((res) => {
                updateProfile({
                  id: id,
                  avatarPath: res.data.filePath,
                }).then(() => {
                  queryClient.invalidateQueries(["profile", id]);
                });
              });
            }}
            showUploadList={false}
          >
            {checkOwner && (
              <Button icon={<UploadOutlined />} loading={isLoadingUploadImage}>
                {/* {check === 1 ? "Click to Upload" : "Update Image"} */}
                Click to Upload
              </Button>
            )}
          </Upload>
        </div>
        <div className="flex flex-col w-full gap-8 pl-3">
          <div className="flex flex-row justify-between border-b border-[#ccc] pb-3">
            <p className=" text-3xl font-medium text-[#5d5caf]">Profile</p>
            {checkOwner && (
              <div
                className="flex items-center cursor-pointer hover:opacity-50"
                onClick={() => openModal()}
              >
                <EditIcon />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <p className="font-semibold ">Name:</p>
              <p>{userProfile?.account?.fullname}</p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="font-semibold ">Email:</p>
              <p>{userProfile?.account?.email}</p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="font-semibold ">Phone:</p>
              <p>{userProfile?.account?.phone}</p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="font-semibold ">Gender:</p>
              <p>{userProfile?.gender === 0 ? "Male" : "Female"}</p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="font-semibold ">Date of birth:</p>
              <p>
                {userProfile?.dateOfBirth === null
                  ? "not yet"
                  : dayjs(
                      userProfile?.dateOfBirth,
                      "DD/MM/YYYY H:mm:ss"
                    ).format("DD/MM/YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-7">
        <p className="text-5xl font-medium text-white">Favourite Movies</p>

        <ListFavoriteMovie
          owner={checkOwner}
          listFavoriteMovie={listFavouriteMovieByAccountId}
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col w-[500px] h-[500px] rounded-xl p-2">
          <div className="flex flex-row items-center justify-between">
            <p className="text-3xl font-medium text-[#5d5caf]">Edit Profile</p>
            <div
              className="cursor-pointer hover:text-red-500"
              onClick={() => closeModal()}
            >
              <CloseIcon />
            </div>
          </div>
          <div className="">
            <form action="" onSubmit={(e) => handleUpdateProfile(e)}>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    id="fullname"
                    className="border border-[#ccc] rounded-lg p-2"
                    defaultValue={userProfile?.account?.fullname}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    id="email"
                    className="border border-[#ccc] rounded-lg p-2"
                    defaultValue={userProfile?.account?.email}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="">Phone</label>
                  <input
                    type="number"
                    id="phone"
                    className="border border-[#ccc] rounded-lg p-2"
                    defaultValue={userProfile?.account?.phone}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p>Gender</p>
                  <div className="flex flex-row gap-2">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="0"
                      defaultChecked={userProfile?.gender === 0 && true}
                    />
                    <label htmlFor="male">Male</label>

                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="1"
                      defaultChecked={userProfile?.gender === 1 && true}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="">date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    className="border border-[#ccc] rounded-lg p-2"
                    defaultValue={dayjs(
                      userProfile?.dateOfBirth,
                      "DD/MM/YYYY H:mm:ss"
                    ).format("YYYY-MM-DD")}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-4">
                <button className="bg-[#333] text-white p-2 rounded-lg hover:bg-slate-500">
                  save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;
