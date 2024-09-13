import { useEffect, useState } from "react";
import { useWindows } from "../WindowsProvider/WindowsProvider";

type ResizeDirection = "top" | "right" | "bottom" | "left" | "top-left" | "top-right" | "bottom-right" | "bottom-left";

type ResizersProps = {
  appName: string;
  isFullScreen: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
};

function Resizers({ appName, isFullScreen, position, size }: ResizersProps) {
  const { updateWindow } = useWindows();
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (resizeDirection) {
        if (e.buttons == 0) {
          setResizeDirection(null);
        } else {
          let width = size.width;
          let height = size.height;
          let x = position.x;
          let y = position.y;

          switch (resizeDirection) {
            case "right":
            case "top-right":
            case "bottom-right":
              width = e.clientX - position.x;
              break;
            case "left":
            case "top-left":
            case "bottom-left":
              width = size.width + position.x - e.clientX;
          }
          switch (resizeDirection) {
            case "top":
            case "top-left":
            case "top-right":
              height = size.height + position.y - e.clientY;
              break;
            case "bottom":
            case "bottom-left":
            case "bottom-right":
              height = e.clientY - position.y;
          }

          if (["left", "top-left", "bottom-left"].includes(resizeDirection)) x = e.clientX;
          if (["top", "top-left", "top-right"].includes(resizeDirection)) y = e.clientY;

          updateWindow(appName, { size: { width, height }, position: { x, y } });
        }
      }
    };
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [resizeDirection]);

  const handleResize = (direction: ResizeDirection) => {
    if (!isFullScreen) {
      setResizeDirection(direction);
    }
  };

  return (
    <>
      <div className="absolute w-full h-2 cursor-n-resize" onMouseDown={() => handleResize("top")}></div>
      <div className="absolute w-2 h-full right-0 cursor-w-resize" onMouseDown={() => handleResize("right")}></div>
      <div className="absolute w-full h-2 bottom-0 cursor-s-resize" onMouseDown={() => handleResize("bottom")}></div>
      <div className="absolute w-2 h-full cursor-e-resize" onMouseDown={() => handleResize("left")}></div>
      <div className="absolute size-2 cursor-nw-resize" onMouseDown={() => handleResize("top-left")}></div>
      <div className="absolute size-2 right-0 cursor-ne-resize" onMouseDown={() => handleResize("top-right")}></div>
      <div
        className="absolute size-2 right-0 bottom-0 cursor-se-resize"
        onMouseDown={() => handleResize("bottom-right")}
      ></div>
      <div className="absolute size-2 bottom-0 cursor-sw-resize" onMouseDown={() => handleResize("bottom-left")}></div>
    </>
  );
}

export default Resizers;
