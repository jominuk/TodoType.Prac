import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import StButton from "../button/Button";
import { ListOfListProps } from "src/typeing/type";

const ListOfList: FC<ListOfListProps> = ({
  borderColor,
  backgroundColor,
  todo,
}) => {
  return (
    <StTodoContainer
      borderColor={borderColor}
      backgroundColor={backgroundColor}
    >
      <StLink to={`/${todo.id}`} key={todo.id}>
        <div>상세보기</div>
      </StLink>
      <div>
        <h2 className="todo-title">
          {todo.title.length > 12
            ? todo.title.substring(0, 12) + "..."
            : todo.title}
        </h2>
        <div>
          {todo.body.length > 18
            ? todo.body.substring(0, 18) + "..."
            : todo.body}
        </div>
      </div>
      <StDialogFooter>
        <StButton
          width="50%"
          height="40px"
          borderColor="red"
          // onClick={() => {
          //   onDeleteButton(todo.id)

          // }}
        >
          삭제하기
        </StButton>
        <StButton
          width="50%"
          height="40px"
          borderColor="green"
          // onClick={() =>
          //   onToggleStatusTodo({ id: todo.id, isDone: todo.isDone })
          // }
        >
          {todo.isDone ? "취소" : "완료"}
        </StButton>
      </StDialogFooter>
    </StTodoContainer>
  );
};

const StTodoContainer = styled.div<{
  borderColor: string;
  backgroundColor: string;
}>`
  width: 315px;
  height: 180px;
  border: 4px solid ${({ borderColor }) => borderColor};
  min-height: 150px;
  border-radius: 12px;
  padding: 12px 24px 24px 24px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const StLink = styled(Link)`
  text-decoration: none;
  color: teal;
  display: flex;
  justify-content: right;
`;

const StDialogFooter = styled.footer`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 12px;
  margin-top: 24px;
`;

export default ListOfList;
