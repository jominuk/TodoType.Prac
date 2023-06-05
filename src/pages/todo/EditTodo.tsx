import React, { useCallback, useState } from "react";
import styled from "styled-components";
import StButton from "src/components/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { ITodoEdit } from "src/typeing/type";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoApi } from "src/api/todo";

const EditTodo = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [input, setInput] = useState<ITodoEdit>({ title: "", body: "" });

  const onChangeHandler = useCallback((e: any) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const { data } = useQuery(["todos", id], () =>
    id ? TodoApi.detail(id) : Promise.reject(Error("ID is undefined"))
  );

  const { mutate } = useMutation(
    ["todos"],
    (editTodo: ITodoEdit) => TodoApi.edit(editTodo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        alert("수정 완료!!");
      },
    }
  );

  const editSubmit = useCallback(() => {
    if (input.title === "" || input.body === "") return;

    const editTodo = {
      id: data?.id,
      title: input.title,
      body: input.body,
    };

    mutate(editTodo);
    navigate("/");
  }, [{ id: data?.id, title: input.title, body: input.body }]);

  return (
    <StlayoutBox>
      <Stbox>
        <div>
          <StboxHeader>
            <div>{data?.day}</div>
            <StButton
              onClick={() => {
                navigate("/");
              }}
            >
              홈으로
            </StButton>

            <StButton onClick={editSubmit}>수정완료</StButton>
          </StboxHeader>

          <StTitle>
            <div> 제목 : {data?.title} </div>
            <Stinput
              type="text"
              name="title"
              value={input.title}
              onChange={onChangeHandler}
              placeholder=" 수정할 제목을 입력해주세요 "
            />
          </StTitle>

          <StContent>
            <div> 내용 : {data?.body} </div>
            <Stinput
              type="text"
              name="body"
              value={input.body}
              onChange={onChangeHandler}
              placeholder=" 수정할 내용을 입력해주세요 "
            />
          </StContent>

          <div></div>
        </div>
      </Stbox>
    </StlayoutBox>
  );
};

const StlayoutBox = styled.div`
  width: 99.6%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Stbox = styled.div`
  border: 2px solid rgb(238, 238, 238);
  border-radius: 10px;
  padding: 12px 24px 24px 24px;
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  margin: 130px auto 0px auto;
`;

const StboxHeader = styled.div`
  display: flex;
  height: 80px;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
`;

const StTitle = styled.h2`
  padding: 0 24px;
`;

const StContent = styled.h2`
  padding: 0 24px;
`;

const Stinput = styled.input`
  border: 3px solid #0fa9e1;
  border-radius: 10px;
  width: 500px;
  height: 30px;
`;

export default EditTodo;
