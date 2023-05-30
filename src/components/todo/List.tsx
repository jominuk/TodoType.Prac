import React from "react";
import styled from "styled-components";
import { ITodo } from "src/typeing/type";
import ListOfList from "./ListOfList";

interface ListProps {
  todos: ITodo[];
}

const List = ({ todos }: ListProps) => {
  return (
    <StListContainer>
      <h2>NOT DONE</h2>
      <StListWrapper>
        {todos.map((todo) => {
          if (todo.isDone === false) {
            return (
              <ListOfList
              //   todo={todo}
              //   key={todo.id}
              //   borderColor="teal"
              //   backgroundColor="white"
              />
            );
          } else {
            return null;
          }
        })}
      </StListWrapper>
      <h2 className="list-title">DONE</h2>
      <StListWrapper>
        {todos.map((todo) => {
          if (todo.isDone === true) {
            return (
              <ListOfList
              //   todo={todo}
              //   key={todo.id}
              //   borderColor="red"
              //   backgroundColor="#eee"
              />
            );
          } else {
            return null;
          }
        })}
      </StListWrapper>
    </StListContainer>
  );
};

const StListContainer = styled.div`
  padding: 0 30px;
`;

const StListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export default List;