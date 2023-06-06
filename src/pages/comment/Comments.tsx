import React, { useCallback, useState } from "react";
import styled from "styled-components";
import StButton from "src/components/button/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentApi } from "src/api/todo";
import { IComments } from "src/typeing/type";
import CommentList from "./CommentList";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [comment, setComment] = useState<{ commentBody: string }>({
    commentBody: "",
  });

  const { mutate } = useMutation(
    ["comments"],
    (comment: IComments) => CommentApi.post(comment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments"] });
      },
    }
  );

  const onClickHandler = () => {
    if (!comment.commentBody) return;

    const comm = {
      comment: comment.commentBody,
      id: `${new Date().getTime()}`,
      date: new Date().toLocaleDateString(),
      todoId: id,
    };

    mutate(comm);

    setComment({
      commentBody: "",
    });
  };

  return (
    <>
      <StCommentInputGroup>
        <StCommentInput
          type="text"
          name="commentBody"
          value={comment.commentBody || ""}
          onChange={(e) => {
            const { value } = e.target;
            setComment({
              ...comment,
              commentBody: value,
            });
          }}
          placeholder="10글자 입력 가능합니다."
        />
        <StButton
          borderColor="teal"
          width="100px"
          height="40px"
          onClick={onClickHandler}
        >
          작성하기
        </StButton>
      </StCommentInputGroup>

      <CommentList />
    </>
  );
};

const StCommentInputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
  gap: 30px;
`;

const StCommentInput = styled.input`
  height: 40px;
  width: 35%;
  border: 1px solid teal;
  border-radius: 12px;
  padding: 0 12px;
`;

export default Comments;
