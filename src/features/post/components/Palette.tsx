import { themeColor } from "../../../utils/theme";
import { PaletteProps } from "../../../data/type/type";
import * as St from "../styles/PaletteStyle";

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
    <St.PaletteWrap>
      {colorPalette.map((color) => (
        <St.PaletteColor
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
    </St.PaletteWrap>
  );
};

export default Palette;
