import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { CommentApi } from "src/api/todo";
import styled from "styled-components";
import StButton from "src/components/button/Button";
import { IComments, ITodo } from "src/typeing/type";
import { useParams } from "react-router-dom";

const CommentList = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { data } = useQuery(["comments", id], (todoId: any) =>
    CommentApi.get(todoId)
  );

  const onDeleteComment = useCallback((id: IComments) => {
    CommentApi.delete(id);
    alert("삭제 완료 !! ");
    queryClient.invalidateQueries({ queryKey: ["comments"] });
  }, []);

  return (
    <StCommentContainer>
      {Array.isArray(data) &&
        data.map((el) => {
          return (
            <StComment key={`comment_${el.id}`}>
              <StCalendar>{el.date}</StCalendar>
              <div>{el.comment}</div>

              <StButtonGroup>
                <StButton
                  //아이디 에딧온으로 바꾸고 input이라는 스테이트에 코멘트값 넣기
                  //   onClick={() => {
                  //     setEditOn(el.id);
                  //     setInput(el.comment);
                  //   }}
                  borderColor="teal"
                  width="50px"
                  height="30px"
                >
                  수정
                </StButton>
                <StButton
                  borderColor="red"
                  width="50px"
                  height="30px"
                  onClick={() => onDeleteComment(el.id)}
                >
                  삭제
                </StButton>
              </StButtonGroup>
            </StComment>
          );
        })}
    </StCommentContainer>
  );
};

const StCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 15px;
`;

const StCalendar = styled.div`
  width: 20%;
`;

const Stinput = styled.input`
  border-radius: 5px;
`;

const StComment = styled.div`
  width: 60%;
  border: 2px solid teal;
  height: 15px;
  border-radius: 12px;
  padding: 12px 24px 24px 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StButtonGroup = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 20px;
`;

export default CommentList;
