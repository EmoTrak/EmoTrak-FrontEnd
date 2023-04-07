import React, { useState } from "react";

const Palette = ({ selectedColor, onColorSelect }: any) => {
  //상태 관리

  //   // 색상 선택 핸들러
  //   const handleColorSelect = (color) => {
  //     setSelectedColor(color);
  //   };
  // 컬러 팔레트에 사용할 색상 배열
  const colorPalette = [
    "#fed400e2", // 빨강
    "#f67269", // 초록
    "#d67dcc", // 파랑
    "#787bca", // 노랑
    "#5dc0ed", // 분홍
    "#3ac66d",
    "#000000", // 시안
    "white",
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
            onClick={() => onColorSelect(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default Palette;
