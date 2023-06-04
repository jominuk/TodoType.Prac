import React, { FC, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import StButton from "../button/Button";
import { Detail, ITodo, ListOfListProps } from "src/typeing/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoApi } from "src/api/todo";

const ListOfList: FC<ListOfListProps> = ({ borderColor, todo }) => {
  const queryClient = useQueryClient();

  const { mutate: DeleteMutation } = useMutation(
    ["todos"],
    (id: ITodo) => TodoApi.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        alert("삭제해쓰");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const { mutate: StatusMutation } = useMutation(
    ["todos"],
    (id: Detail) => TodoApi.status(id),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        if (data.isDone === false) {
          return alert("다시 해보자");
        } else {
          return alert("잘했어^^!");
        }
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const onDeleteButton = useCallback(
    (id: any) => {
      DeleteMutation(id);
    },
    [DeleteMutation]
  );

  const onToggleStatusTodo = useCallback(
    ({ id, isDone }: any) => {
      StatusMutation({ id, isDone });
    },
    [StatusMutation]
  );

  return (
    <StTodoContainer borderColor={borderColor}>
      <StLink to={`/${todo.id}`} key={todo.id}>
        <div>상세보기</div>
      </StLink>
      <div>
        <div className="todo-day">{todo.day}</div>
        <h2>{todo.title}</h2>

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
          onClick={() => {
            onDeleteButton(todo.id);
          }}
        >
          삭제하기
        </StButton>
        <StButton
          width="50%"
          height="40px"
          borderColor="green"
          onClick={() =>
            onToggleStatusTodo({ id: todo.id, isDone: todo.isDone })
          }
        >
          {todo.isDone ? "취소" : "완료"}
        </StButton>
      </StDialogFooter>
    </StTodoContainer>
  );
};

const StTodoContainer = styled.div<{
  borderColor: string;
}>`
  width: 315px;
  height: 180px;
  border: 4px solid ${({ borderColor }) => borderColor};
  min-height: 150px;
  border-radius: 12px;
  padding: 12px 24px 24px 24px;

  .todo-day {
    font-size: 11px;
  }
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
