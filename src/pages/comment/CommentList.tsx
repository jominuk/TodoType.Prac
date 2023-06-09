import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import { CommentApi } from "src/api/todo";
import styled from "styled-components";
import StButton from "src/components/button/Button";
import { IComments } from "src/typeing/type";
import { useParams } from "react-router-dom";

const CommentList = () => {
  const { id } = useParams();

  const [editOn, setEditOn] = useState<string>("");
  //el.id랑 비교해서 일치하는것 구분해서 input창으로 바꾸기 ==> 수정 버튼 클릭시 edtiOn 에 아이디들어옴
  const [input, setInput] = useState<string>("");
  // 수정완료시 input창에 작성한 값 받아오기

  const queryClient = useQueryClient();

  const { data } = useQuery(["comments", id], () => CommentApi.get(id), {});

  const onDeleteComment = useCallback((id: IComments) => {
    CommentApi.delete(id);
    alert("삭제 완료 !! ");
    queryClient.invalidateQueries({ queryKey: ["comments"] });
  }, []);

  const { mutate } = useMutation(
    ["comments"],
    (editComment: any) => CommentApi.edit(editComment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
        setEditOn("");
      },
      onError: (error) => {
        console.error("Error editing comment:", error);
      },
    }
  );

  const onEditComplete = (commentId: IComments) => {
    const editComment = { comment: input, id: commentId };

    mutate(editComment);
  };

  return (
    <StCommentContainer>
      {Array.isArray(data) &&
        data.map((el) => {
          return el.id !== editOn ? (
            <StComment key={`comment_${el.id}`}>
              <StCalendar>{el.date}</StCalendar>
              <div>{el.comment}</div>

              <StButtonGroup>
                <StButton
                  // 아이디 에딧온으로 바꾸고 input이라는 스테이트에 코멘트값 넣기
                  onClick={() => {
                    setEditOn(el.id);
                    setInput(el.comment);
                  }}
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
          ) : (
            <StComment key={`comment_${el.id}`}>
              <StCalendar>{el.date}</StCalendar>
              <Stinput
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />

              <StButtonGroup>
                <StButton
                  onClick={() => onEditComplete(el.id)}
                  borderColor="teal"
                  width="50px"
                  height="30px"
                >
                  완료
                </StButton>
                <StButton
                  borderColor="red"
                  width="50px"
                  height="30px"
                  //에딧온 바꿔줘서 일치하는 아이디 없게 만들기
                  onClick={() => setEditOn("")}
                >
                  취소
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
