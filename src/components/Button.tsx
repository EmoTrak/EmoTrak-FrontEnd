import React, { ComponentPropsWithoutRef } from "react";
import styled, { css } from "styled-components";
import { themeColor } from "../utils/theme";

type ButtonProps = {
  icon?: boolean;
  circle?: boolean;
  size?: string;
} & ComponentPropsWithoutRef<"button">;

const Button = ({ children, icon, size, ...restProps }: ButtonProps) => {
  return (
    <StButton size={size} icon={icon} {...restProps}>
      {icon ? (
        <ButtonInner>
          <>{children}</>
        </ButtonInner>
      ) : (
        <>{children}</>
      )}
    </StButton>
  );
};

const StButton = styled.button<ButtonProps>`
  border: none;
  cursor: pointer;
  margin: 2px;
  border-radius: ${({ circle }) => (circle ? "50%" : "8px")};
  background-color: ${({ icon }) => (icon ? "transparent" : themeColor.main.oatmeal)};
  color: ${themeColor.main.chocomilk};
  font-family: inherit;

  ${({ size }) => {
    switch (size) {
      case "x-large":
        return css`
          height: 60px;
          width: 400px;
        `;
      case "large":
        return css`
          height: 50px;
          width: 200px;
        `;
      case "medium":
        return css`
          height: 45px;
          width: 130px;
        `;
      case "small":
        return css`
          height: 40px;
          width: 100px;
        `;
      case "x-small":
        return css`
          height: 30px;
          width: 50px;
        `;
      case "circle":
        return css`
          height: 60px;
          width: 60px;
        `;
      default:
        return css`
          height: 40px;
          width: 100px;
        `;
    }
  }}

  &:hover {
    background-color: ${({ icon }) =>
      icon ? "transparent" : `${themeColor.main.coffemilk}`};
    color: ${({ icon }) =>
      icon ? `${themeColor.main.chocomilk}` : `${themeColor.main.white}`};
  }

  &:active {
    background-color: ${({ icon }) =>
      icon ? "transparent" : `${themeColor.main.coffemilk}`};
    color: ${({ icon }) =>
      icon ? `${themeColor.main.chocomilk}` : `${themeColor.main.white}`};
  }

  &:disabled {
    background-color: ${({ icon }) => (icon ? "transparent" : `${themeColor.main.gray}`)};
    color: ${themeColor.main.paper};
    font-weight: 800;
    text-shadow: 0.5px 0.5px 0.5px grey;
  }
`;

const ButtonInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: none;
  background: transparent;
`;

export default Button;
