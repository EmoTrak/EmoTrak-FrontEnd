import { themeColor } from "../../../utils/theme";

interface PaletteProps {
  selectedColor: string;
  onColorSelect(color: string): void;
  setSelectPen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Palette = ({ selectedColor, onColorSelect, setSelectPen }: PaletteProps) => {
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
    <div>
      <div style={{ display: "flex" }}>
        {colorPalette.map((color) => (
          <div
            key={color}
            style={{
              backgroundColor: color,
              width: "50px",
              height: "50px",
              cursor: "pointer",
              marginRight: "10px",
              borderRadius: "50%",
              border:
                color === selectedColor ? `2px solid ${themeColor.main.gray}` : "none",
            }}
            onClick={() => {
              onColorSelect(color);
              setSelectPen(false);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Palette;
