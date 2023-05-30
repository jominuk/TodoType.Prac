import React from "react";
import Form from "src/components/todo/Form";
import List from "src/components/todo/List";
import { ITodo } from "src/typeing/type";

const Home = () => {
  const todos: ITodo[] = [];
  return (
    <>
      <Form />
      <List todos={todos} />
    </>
  );
};

export default Home;
