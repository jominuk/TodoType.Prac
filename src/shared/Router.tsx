import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "src/pages/Home";
import Header from "src/components/ui/Header";
import Layout from "src/components/ui/Layout";
import AddTodo from "src/pages/todo/AddTodo";
import Detail from "src/pages/todo/Detail";
import EditTodo from "src/pages/todo/EditTodo";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTodo />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
