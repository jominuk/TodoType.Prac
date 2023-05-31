import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StButton from "src/components/button/Button";
import { addTodoApi } from "src/api/todo";
import { ITodo } from "src/typeing/type";
import { useMutation } from "@tanstack/react-query";

const AddTodo = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<ITodo>({
    title: "",
    body: "",
    day: "",
  });

  const { mutate } = useMutation(async (todo: ITodo) => {
    try {
      await addTodoApi.post(todo);
      alert("내 일정 등록 완료!!");
    } catch (err) {
      console.log(err);
    }
  });

  const onChangeHandler = useCallback((e: any) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    if (input.title.length < 2 || input.title.length > 10) {
      return alert("제목을 2-10글자 사이로 넣어주세요");
    }

    const todo = {
      id: `${new Date().getTime() + Math.random()}`,
      title: input.title,
      body: input.body,
      isDone: false,
      day: input.day,
    };

    mutate(todo);

    setInput({
      title: "",
      body: "",
      day: "",
    });
    navigate("/");
  };

  return (
    <Addcontainer>
      <AddBox>
        <form onSubmit={onSubmitHandler}>
          <DayInput
            type="text"
            name="day"
            value={input.day}
            onChange={onChangeHandler}
            placeholder="날짜"
            required
          />
          <TitleInput
            type="text"
            name="title"
            value={input.title}
            onChange={onChangeHandler}
            placeholder="제목을 작성해주세요"
          />
          <StRed length={input.title.length}>2자 - 10자를 넣어주세요</StRed>
          <BodoyInput
            type="text"
            name="body"
            value={input.body}
            onChange={onChangeHandler}
            placeholder="내용을 작성해주세요"
          />
          <StRed2 length={input.body.length}>내용을 꼭 작성해주세요</StRed2>
          <BtnBox>
            <BucketAddButton disabled={input.body.length > 0 ? false : true}>
              버킷추가하기
            </BucketAddButton>
            <StButton
              width="13rem"
              height="40px"
              borderColor="red"
              onClick={() => {
                navigate("/");
              }}
            >
              돌아가기
            </StButton>
          </BtnBox>
        </form>
      </AddBox>
    </Addcontainer>
  );
};

const Addcontainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddBox = styled.div`
  width: 60%;
  height: 32rem;
  background-color: #179e9e;
  border-radius: 8px;
  padding: 4.5rem 5rem 5rem 5rem;
`;

const DayInput = styled.input`
  margin-bottom: 10px;
  border-radius: 5px;
  border-color: white;
  width: 100px;
  height: 20px;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 3rem;
  border-radius: 10px;
  border: 0px;
  font-size: 2rem;
  padding-left: 1rem;
`;

const StRed = styled.div<{ length: number }>`
  display: ${({ length }) => (length > 2 && length <= 10 ? "none" : "block")};
  color: #e74c3c;
  font-weight: 600;
  position: absolute;
`;

const BodoyInput = styled.textarea<{ type: string }>`
  width: 98%;
  height: 19rem;
  border-radius: 10px;
  border: 0px;
  padding: 1rem;
  margin-top: 3.5rem;
  font-size: 1.5rem;
  ::placeholder {
    font-size: 2rem;
    font-weight: 600;
  }
`;

const StRed2 = styled.div<{ length: number }>`
  display: ${({ length }) => (length > 0 ? "none" : "block")};
  color: #e74c3c;
  font-weight: 600;
  position: absolute;
`;

const BucketAddButton = styled.button`
  width: 13rem;
  height: 40px;
  border-color: blue;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
    background-color: powderblue;
  }
  border-radius: 10px;
`;

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  padding: 0.5rem;
`;

export default AddTodo;
