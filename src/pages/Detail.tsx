import React from "react";
import styled from "styled-components";
import StButton from "src/components/button/Button";
import { useQuery } from "@tanstack/react-query";
import { TodoApi } from "src/api/todo";
import { ITodo } from "src/typeing/type";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();

  console.log(id);

  const {
    data: todo,
    isLoading,
    isError,
  } = useQuery(["todos"], (id: any) => TodoApi.detail(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      {/* <StContainer>
        <StDialog>
          <div>
            <StDialogHeader>
              <div>ID :{todo.id}</div>
              <StButtonGroup>
                <StButton
                  borderColor="black"
                  width="70px"
                  height="50px"
                  //   onClick={() => navigate("/EditTodo")}
                >
                  수정하기
                </StButton>
                <StButton
                  borderColor="teal"
                  width="70px"
                  height="50px"
                  //   onClick={() => {
                  //     navigate("/");
                  //   }}
                >
                  이전으로
                </StButton>
              </StButtonGroup>
            </StDialogHeader>
            <StTitle>{todo.title}</StTitle>
            <StBody>{todo.body}</StBody>
          </div>
        </StDialog>
      </StContainer> */}
    </>
  );
};

const StContainer = styled.div`
  width: 99.6%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StDialog = styled.div`
  border: 2px solid teal;
  border-radius: 10px;
  padding: 12px 24px 24px 24px;
  width: 70%;
  height: 300px;
  display: flex;
  flex-direction: column;
  margin: 130px auto 0px auto;
`;
const StDialogHeader = styled.div`
  display: flex;
  height: 80px;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
`;

const StButtonGroup = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 20px;
`;

const StTitle = styled.h1`
  padding: 0 24px;
`;

const StBody = styled.main`
  padding: 0 24px;
`;

export default Detail;
