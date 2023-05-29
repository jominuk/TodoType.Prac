import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <StContainer>
      <h2>나만의 TodoList 😋</h2>
      <h4>Jo Min Uk ✌️</h4>
    </StContainer>
  );
};
export default Header;

const StContainer = styled.div`
  background-color: #1ebcb7;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 0px 20px;
  border-radius: 10px;
`;
