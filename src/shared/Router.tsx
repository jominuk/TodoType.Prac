import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "src/pages/Home";
import Header from "src/components/ui/Header";
import Layout from "src/components/ui/Layout";
import AddTodo from "src/pages/AddTodo";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTodo />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
