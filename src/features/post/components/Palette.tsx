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
    "#fed400e2",
    "#f67269",
    "#d67dcc",
    "#787bca",
    "#5dc0ed",
    "#3ac66d",
    "#000000",
    "#ffffff",
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
              border: color === selectedColor ? "2px solid grey" : "none",
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
