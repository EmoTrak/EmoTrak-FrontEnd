import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

interface PaletteProps {
  selectedColor: string;
  onColorSelect(color: string): void;
  setSelectPen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Palette = ({
  selectedColor,
  onColorSelect,
  setSelectPen,
}: PaletteProps) => {
  const colorPalette = [
    `${themeColor.palette.yellow}`,
    `${themeColor.palette.red}`,
    `${themeColor.palette.purple}`,
    `${themeColor.palette.yellow}`,
    `${themeColor.palette.blue}`,
    `${themeColor.palette.sky}`,
    `${themeColor.palette.green}`,
    `${themeColor.main.black}`,
    `${themeColor.main.white}`,
  ];

  return (
    <PaletteWrap>
      {colorPalette.map((color) => (
        <PaletteColor
          key={color}
          style={{
            backgroundColor: color,
            border:
              color === selectedColor
                ? `2px solid ${themeColor.main.gray}`
                : "none",
          }}
          onClick={() => {
            onColorSelect(color);
            setSelectPen(false);
          }}
        />
      ))}
    </PaletteWrap>
  );
};

export default Palette;

const PaletteWrap = styled.div`
  display: flex;
  ${device.mobile} {
    margin-top: 15px;
  }
`;

const PaletteColor = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 50%;
  ${device.tablet} {
    width: 25px;
    height: 25px;
  }
  ${device.mobile} {
    width: 30px;
    height: 30px;
  }
  ${device.miniMobile} {
    width: 20px;
    height: 20px;
  }
`;
