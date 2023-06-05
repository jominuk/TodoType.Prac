import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import { TodoApi } from "src/api/todo";
import ListOfList from "src/components/todo/ListOfList";

const List = () => {
  const { data, isLoading, isError } = useQuery(["todos"], () => TodoApi.get());

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <StListContainer>
      <h2>NOT DONE</h2>

      <StListWrapper>
        {Array.isArray(data) &&
          data.map((todo) => {
            if (todo.isDone === false) {
              return (
                <ListOfList todo={todo} key={todo.id} borderColor="teal" />
              );
            } else {
              return null;
            }
          })}
        {/* {Array.isArray(data) &&
          data.map((todo) => {
            return <ListOfList todo={todo} key={todo.id} borderColor="teal" />;
          })} */}
      </StListWrapper>

      <h2 className="list-title">DONE</h2>

      <StListWrapper>
        {Array.isArray(data) &&
          data.map((todo) => {
            if (todo.isDone === true) {
              return <ListOfList todo={todo} key={todo.id} borderColor="red" />;
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
