import React from "react";
import ListComment from "./ListComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentApi } from "../../apis/review";
import { useParams } from "react-router";
import { message } from "antd";

const ChatBox = () => {
  const accountProfile = JSON.parse(
    localStorage.getItem("AccountProfile") as string
  );
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { mutateAsync: createComment } = useMutation({
    mutationKey: ["createComment"],
    mutationFn: createCommentApi,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["listComment", id]);
    },
  });
  const handleComment = (e: any) => {
    if (e.key === "Enter") {
      const tempdata = {
        content: e.target.value,
        movieId: id,
        accountId: accountProfile.account.id,
      };
      createComment(tempdata).then(() => {
        message.success("Comment successfully");
        e.target.value = "";
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-full ">
      <div className="flex flex-col w-[1000px] bg-white px-2 py-3 rounded-md border border-[#ccc] shadow-lg">
        <div className="flex flex-row items-center gap-2  border-b border-[#ccc] pb-2">
          <div className="w-10 h-10 rounded-full ">
            <img
              src={accountProfile.account.avatarPath}
              alt=""
              className="object-scale-down w-full h-full rounded-full "
            />
          </div>
          <div className="flex items-center w-full ">
            <textarea
              className=" rounded-xl border border-[#0a0808] shadow-md w-full pl-2 pt-2 resize-none outline-none"
              placeholder="Write your comment here..."
              onKeyDown={(e) => handleComment(e)}
            ></textarea>
          </div>
        </div>
        <ListComment />
      </div>
    </div>
  );
};

export default ChatBox;
