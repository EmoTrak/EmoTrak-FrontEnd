import { PaletteProps } from "../../../data/type/type";
import { themeColor } from "../../../utils/theme";
import * as St from "../styles/PaletteStyle";

const Palette = ({ selectedColor, onColorSelect, setSelectPen }: PaletteProps) => {
  const { yellow, red, purple, blue, sky, green } = themeColor.palette;
  const { black, white } = themeColor.main;
  const colorPalette = [yellow, red, purple, blue, sky, green, black, white];

  return (
    <St.PaletteWrap>
      {colorPalette.map((color) => (
        <St.PaletteColor
          key={color}
          style={{
            backgroundColor: color,
            border:
              color === selectedColor ? `5px solid ${themeColor.main.gray}` : "none",
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
