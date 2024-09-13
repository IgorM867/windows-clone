import { useWindows } from "../WindowsProvider/WindowsProvider";
import AppIcon from "../AppIcon";
import { useState } from "react";
import { ICON_SIZE } from "../../constants";
import Taskbar from "./TaskBar/TaskBar";

const ROWS = Math.floor((window.innerHeight - 44) / ICON_SIZE);
const COLUMNS = 12;

type Icon = {
  appName: string;
  position: { x: number; y: number };
};

function Desktop({ apps }: { apps: string[] }) {
  const { openWindow } = useWindows();
  const [icons, setIcons] = useState<Icon[]>(
    apps.map((appName, i) => ({ appName, position: { x: Math.floor(i / ROWS), y: i % ROWS } }))
  );

  const moveAppIcon = (appName: string, newPosition: { x: number; y: number }) => {
    if (newPosition.x >= COLUMNS || newPosition.y >= ROWS) return;
    if (icons.some(({ position }) => position.x === newPosition.x && position.y === newPosition.y)) return;
    setIcons((prev) =>
      prev.map((icon) => (icon.appName === appName ? { appName: icon.appName, position: newPosition } : icon))
    );
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      <div className="flex-grow">
        {icons.map((icon, i) => (
          <AppIcon
            key={i}
            appName={icon.appName}
            position={icon.position}
            moveAppIcon={moveAppIcon}
            onDoubleClick={() => openWindow(icon.appName)}
          />
        ))}
      </div>
      <Taskbar />
    </div>
  );
}

export default Desktop;
