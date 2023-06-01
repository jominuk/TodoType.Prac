import React from "react";
import styled from "styled-components";
import { StButtonProps } from "src/typeing/type";

const StButton = (props: StButtonProps) => {
  const { borderColor, width, height, onClick, children, borderRadius } = props;
  const styles = { borderRadius, borderColor, width, height };

  return (
    <Button {...styles} onClick={onClick}>
      {children}
    </Button>
  );
};
StButton.defaultProps = {
  borderRadius: "10px",
};
// 기본 설정을 10px로 지정

const Button = styled.button<StButtonProps>`
  border: 2px solid ${(props) => props.borderColor};
  font-size: 13px;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: white;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
    background-color: powderblue;
  }
`;

export default StButton;
