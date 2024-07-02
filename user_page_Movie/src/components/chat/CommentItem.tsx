import React, { useEffect, useState } from "react";
import HeartIcon from "../../shared/icons/HeartIcon";
import CommentIcon from "../../shared/icons/CommentIcon";
import ReplyIcon from "../../shared/icons/ReplyIcon";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router";
import MoreIcon from "../../shared/icons/MoreIcon";
import { Dropdown, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createReactionCommentApi,
  deleteCommentApi,
  deleteReactionCommentApi,
  editCommentApi,
} from "../../apis/review";
import Modal from "react-modal";
interface CommentItemProps {
  userName: string;
  time: string;
  content: string;
  accountId: number;
  commentId: number;
  avatarPath: string;
  listReactionComment: object[];
}
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const CommentItem = (props: CommentItemProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const [items, setItem] = useState<object[]>([]);
  const [idReaction, setIdReaction] = useState<number>();
  const [check, setCheck] = useState<boolean>();
  const [editState, setEditState] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const accountProfile = JSON.parse(
    localStorage.getItem("AccountProfile") as string
  );

  const { mutateAsync: editComment } = useMutation({
    mutationKey: ["editComment"],
    mutationFn: editCommentApi,
  });
  const { mutateAsync: deleteComment } = useMutation({
    mutationKey: ["deleteComment", props.commentId],
    mutationFn: deleteCommentApi,
  });
  const { mutateAsync: createReaction } = useMutation({
    mutationKey: ["createReactionComment"],
    mutationFn: createReactionCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ListReactionComment", id] });
      message.success("Create reaction successfully");
      setCheck(true);
    },
  });
  const checkReaction = () => {
    return props.listReactionComment?.find(
      (item: object) => item.reviewId === props.commentId
    );
  };
  const items = [
    {
      key: "1",
      label: (
        <div className="flex flex-row items-center gap-2 px-2 py-1">
          <p className="text-base " onClick={() => setEditState(true)}>
            edit
          </p>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex flex-row items-center gap-2 px-2 py-1">
          <p className="text-base " onClick={() => openModal()}>
            delete
          </p>
        </div>
      ),
    },
  ];
  console.log(props.listReactionComment);
  const { mutateAsync: deleteReaction } = useMutation({
    mutationKey: ["deleteReactionComment"],
    mutationFn: deleteReactionCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ListReactionComment", id] });
      message.success("Delete reaction successfully");
      setCheck(false);
    },
  });
  const handleCheckAccount = () => {
    if (accountProfile.account.id === props.accountId) {
      return true;
    } else {
      return false;
    }
    // if (accountProfile.account.id === props.accountId) {
    //   setItem([
    //     {
    //       key: "1",
    //       label: (
    //         <div className="flex flex-row items-center gap-2 px-2 py-1">
    //           <p className="text-base " onClick={() => setEditState(true)}>
    //             edit
    //           </p>
    //         </div>
    //       ),
    //     },
    //     {
    //       key: "2",
    //       label: (
    //         <div className="flex flex-row items-center gap-2 px-2 py-1">
    //           <p className="text-base " onClick={() => openModal()}>
    //             delete
    //           </p>
    //         </div>
    //       ),
    //     },
    //   ]);
    // } else {
    //   setItem([
    //     {
    //       key: "1",
    //       label: (
    //         <div className="flex flex-row items-center gap-2 px-2 py-1">
    //           <p className="text-base ">report</p>
    //         </div>
    //       ),
    //     },
    //   ]);
    // }
  };
  const handleEditComment = (e: any) => {
    if (e.key === "Enter") {
      const tempdata = {
        id: props.commentId,
        content: e.target.value,
      };
      editComment(tempdata).then(() => {
        setEditState(false);
        message.success("Edit comment successfully");
        queryClient.invalidateQueries(["listComment", id]);
      });
    } else if (e.key === "Escape") {
      setEditState(false);
    }
  };
  const handleDeleteComment = () => {
    deleteComment(props.commentId).then(() => {
      message.success("Delete comment successfully");
      queryClient.invalidateQueries(["listComment", id]);
      closeModal();
    });
  };
  const handleReaction = () => {
    if (check) {
      deleteReaction(idReaction);
    } else {
      createReaction({
        reviewId: props.commentId,
        emotion: 1,
        accountId: accountProfile.account.id,
      });
    }
  };
  useEffect(() => {
    handleCheckAccount();
  }, []);
  useEffect(() => {
    setCheck(checkReaction() === undefined ? false : true);
    props.listReactionComment?.map((item: object) => {
      if (item.reviewId === props.commentId) {
        setIdReaction(item.id);
      }
    });
  }, []);
  return (
    <div className="flex flex-row gap-2 border-b border-[#ccc] py-2 ">
      <div
        className="cursor-pointer "
        onClick={() => navigate(`/profile/${props.accountId}`)}
      >
        <img
          src={props.avatarPath}
          alt=""
          className="object-scale-down w-10 h-10 rounded-full "
        />
      </div>
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex flex-row items-center justify-between w-full ">
          <div className="flex flex-row items-center gap-2 ">
            <p>{props.userName}</p>
            <p>{dayjs(props.time).format("DD/MM/YYYY")}</p>
          </div>
          {handleCheckAccount() && (
            <div className="cursor-pointer ">
              <Dropdown
                menu={{ items }}
                placement="bottomRight"
                arrow
                trigger={["click"]}
              >
                <div className="">
                  <MoreIcon />
                </div>
              </Dropdown>
            </div>
          )}
        </div>
        <div className="">
          {editState ? (
            <div className="flex flex-col">
              <textarea
                className=" rounded-xl border border-[#0a0808] shadow-md w-full pl-2 pt-2 resize-none outline-none"
                placeholder="Write your comment here..."
                onKeyDown={(e) => handleEditComment(e)}
                defaultValue={props.content}
              ></textarea>
              <p className="opacity-50 ">Press esc to return</p>
            </div>
          ) : (
            <p>{props.content}</p>
          )}
        </div>
        <div className="flex flex-row gap-2">
          <div
            className="cursor-pointer hover:opacity-50"
            onClick={() => handleReaction()}
          >
            <HeartIcon color={check ? "red" : " black"} />
          </div>
          {/* <div className="cursor-pointer hover:opacity-50">
            <CommentIcon />
          </div> */}
          {/* <div className="cursor-pointer hover:opacity-50 ">
            <ReplyIcon />
          </div> */}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col gap-2 ">
          <div className="text-xl ">
            Are you sure to delete this comment !!!
          </div>
          <div className="flex flex-row justify-end gap-3">
            <div
              className=" text-red-400 px-4 py-2 rounded-lg cursor-pointer border border-[#ccc] hover:border-red-400"
              onClick={() => closeModal()}
            >
              No
            </div>
            <div
              className=" px-4 py-2 rounded-lg cursor-pointer border border-[#ccc] hover:border-black"
              onClick={() => handleDeleteComment()}
            >
              Yes
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CommentItem;
