import styled, { css } from "styled-components";
import { themeColor } from "../utils/theme";
import { ButtonProps } from "../data/type/type";

const Button = ({
  children,
  icon,
  important,
  size,
  ...restProps
}: ButtonProps) => {
  return (
    <StButton size={size} icon={icon} important={important} {...restProps}>
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

const sizes = new Map([
  ["default", `height: 40px; width: 100px;`],
  ["x-large", `height: 60px; width: 400px;`],
  ["large", `height: 50px; width: 200px;`],
  ["medium", `height: 45px; width: 130px;`],
  ["small", `height: 40px; width: 100px;`],
  ["x-small", `height: 30px; width: 50px;`],
  ["circle", `height: 60px; width: 60px;`],
]);

const StButton = styled.button<ButtonProps>`
  border: none;
  cursor: pointer;
  margin: 2px;
  border-radius: ${({ circle }) => (circle ? "50%" : "8px")};
  background-color: ${({ icon, important }) =>
    icon
      ? "transparent"
      : important
      ? themeColor.main.pink
      : themeColor.main.oatmeal};
  color: ${({ important }) =>
    important ? themeColor.main.white : themeColor.main.chocomilk};
  font-family: inherit;

  ${({ size }) => {
    return size
      ? css`
          ${sizes.get(size)}
        `
      : css`
          ${sizes.get("default")}
        `;
  }}

  &:hover {
    background-color: ${({ icon, important }) =>
      icon
        ? "transparent"
        : important
        ? `${themeColor.main.red}`
        : `${themeColor.main.coffemilk}`};
    color: ${({ icon }) =>
      icon ? `${themeColor.main.chocomilk}` : `${themeColor.main.white}`};
  }

  &:active {
    background-color: ${({ icon, important }) =>
      icon
        ? "transparent"
        : important
        ? `${themeColor.main.red}`
        : `${themeColor.main.coffemilk}`};
    color: ${({ icon }) =>
      icon ? `${themeColor.main.chocomilk}` : `${themeColor.main.white}`};
  }

  &:disabled {
    background-color: ${({ icon }) =>
      icon ? "transparent" : `${themeColor.main.gray}`};
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
