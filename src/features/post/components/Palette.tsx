import React, { useState } from "react";

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
  //상태 관리

  //   // 색상 선택 핸들러
  //   const handleColorSelect = (color) => {
  //     setSelectedColor(color);
  //   };
  // 컬러 팔레트에 사용할 색상 배열
  const colorPalette = [
    "#fed400e2", // 노랑
    "#f67269", // 빨강
    "#d67dcc", // 분홍
    "#787bca", // 보라
    "#5dc0ed", // 파랑
    "#3ac66d", // 초록
    "#000000", // 검정
    "white", // 흰색
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
              border: color === selectedColor ? "2px solid grey" : "none", // 선택된 색상에는 테두리있도록 표시
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
