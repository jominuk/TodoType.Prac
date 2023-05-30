import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StButton from "./button/Button";
import { StButtonProps } from "src/typeing/type";

const Form = (props: { button: StButtonProps }) => {
  const navigate = useNavigate();
  const onClickHandler = useCallback(() => {
    navigate("/add");
  }, [navigate]);

  return (
    <StAddDiv>
      <StButton onClick={onClickHandler} {...props.button}>
        버킷 리스트 추가하기
      </StButton>
    </StAddDiv>
  );
};

Form.defaultProps = {
  button: {
    border: "none",
    height: "70px",
    cursor: "pointer",
    borderRadius: "17px",
    width: "200px",
  },
};

export default Form;

const StAddDiv = styled.div`
  border-radius: 12px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  gap: 20px;
`;
