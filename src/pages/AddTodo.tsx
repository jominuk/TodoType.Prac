import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StButton from "src/components/button/Button";
import { useAddComment } from "src/api/todo";

const AddTodo = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    body: "",
  });

  const { mutate } = useAddComment();

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
    };

    mutate(todo);

    setInput({
      title: "",
      body: "",
    });
    navigate("/");
  };

  return (
    <Addcontainer>
      <AddBox>
        <form onSubmit={onSubmitHandler}>
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
const StRed = styled.div<{ length: number }>`
  display: ${({ length }) => (length > 2 && length <= 10 ? "none" : "block")};
  color: #e74c3c;
  font-weight: 600;
  position: absolute;
`;

const StRed2 = styled.div<{ length: number }>`
  display: ${({ length }) => (length > 0 ? "none" : "block")};
  color: #e74c3c;
  font-weight: 600;
  position: absolute;
`;

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
  background-color: teal;
  border-radius: 8px;
  padding: 4.5rem 5rem 5rem 5rem;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 3rem;
  border-radius: 10px;
  border: 0px;
  font-size: 2rem;
  padding-left: 1rem;
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

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  padding: 0.5rem;
`;

export default AddTodo;
