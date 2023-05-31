import React from "react";
import Form from "src/components/todo/Form";
import List from "src/pages/List";
import { ITodo } from "src/typeing/type";

const Home = () => {
  return (
    <>
      <Form />
      <List />
    </>
  );
};

export default Home;
