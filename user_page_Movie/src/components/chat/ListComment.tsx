import React from "react";
import CommentItem from "./CommentItem";
import { useQuery } from "@tanstack/react-query";
import {
  getListCommentByIdApi,
  getListReactionByMovieIdApi,
} from "../../apis/review";
import { useParams } from "react-router";
import { IdcardOutlined } from "@ant-design/icons";

const ListComment = () => {
  const { id } = useParams();
  const { data: listComment } = useQuery({
    queryKey: ["listComment", id],
    queryFn: ({ queryKey }) =>
      getListCommentByIdApi(queryKey[1] as string).then((res) => {
        return res.data.content;
      }),
  });
  const { data: listReactionComment } = useQuery({
    queryKey: ["ListReactionComment", id],
    queryFn: () =>
      getListReactionByMovieIdApi({ movieId: id }).then((res) => {
        console.log(res);
        if (res.data.totalElements === 0) {
          return [];
        } else {
          return res.data.content;
        }
      }),
  });
  return (
    <div className="flex flex-col gap-2 mt-4 max-h-[500px] overflow-y-scroll ">
      {listComment === undefined ? (
        <div className=" flex h-[300px] justify-center items-center">
          No comments right now
        </div>
      ) : (
        listComment?.map((item, index) => {
          return (
            <CommentItem
              key={index}
              userName={item.account.fullname}
              content={item.content}
              time={item.createdDate}
              avatarPath={item.account.avatarPath}
              accountId={item.account.id}
              commentId={item.id}
              listReactionComment={listReactionComment}
            />
          );
        })
      )}
    </div>
  );
};

export default ListComment;
