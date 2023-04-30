import { useState } from "react";

export const useWindowSize = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const resizeHandler = () => {
    setViewportWidth(window.innerWidth);
  };

  const desktop = viewportWidth > 1024;
  const tablet = viewportWidth <= 1024 && viewportWidth > 767;
  const mobile = viewportWidth < 768 && viewportWidth > 500;
  const miniMobile = viewportWidth < 501;

  return {
    resizeHandler,
    desktop,
    tablet,
    mobile,
    miniMobile,
  };
};
