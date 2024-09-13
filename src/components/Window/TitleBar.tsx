import { useEffect, useState } from "react";
import minimaze from "../../assets/minus-solid.svg";
import restore from "../../assets/restore.svg";
import square from "../../assets/square.svg";
import xmark from "../../assets/xmark-solid.svg";
import { useWindows } from "../WindowsProvider/WindowsProvider";

type TitleBarProps = {
  appName: string;
  isFullScreen: boolean;
  position: { x: number; y: number };
  width: number;
};

function TitleBar({ appName, isFullScreen, position, width }: TitleBarProps) {
  const { updateWindow, closeWindow } = useWindows();

  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        if (e.buttons == 0) {
          setIsDragging(false);
        } else {
          const x = position.x + e.clientX - mousePosition.x;
          const y = position.y + e.clientY - mousePosition.y;
          updateWindow(appName, { position: { x, y } });
          setMousePosition({ x: e.clientX, y: e.clientY });
        }
      }
    };
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true);
    setMousePosition({ x: e.clientX, y: e.clientY });

    if (isFullScreen) {
      const x = e.clientX - (e.clientX / document.body.clientWidth) * width;
      const y = 0;
      updateWindow(appName, { position: { x, y }, isFullScreen: false });
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const toggleFullScreen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    updateWindow(appName, { isFullScreen: !isFullScreen });
  };
  return (
    <div
      className="bg-window-primary h-7 flex items-center justify-end"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className="size-7 grid place-items-center hover:bg-white hover:bg-opacity-20"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <img src={minimaze} className="size-4 text-gray " alt="Minimaze" />
      </div>
      <div
        className="size-7 grid place-items-center hover:bg-white hover:bg-opacity-20"
        onClick={toggleFullScreen}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {isFullScreen ? (
          <img src={restore} className="size-3 text-gray " alt="Restore" />
        ) : (
          <img src={square} className="size-3 text-gray " alt="Maximaze" />
        )}
      </div>
      <div
        className="size-7 grid place-items-center hover:bg-red-600"
        onClick={() => closeWindow(appName)}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <img src={xmark} className="size-5 text-gray " alt="Close" />
      </div>
    </div>
  );
}

export default TitleBar;
