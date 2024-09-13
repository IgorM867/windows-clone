import ReactLogo from "../assets/react.svg";
import { ICON_SIZE } from "../constants";

type AppIconProps = {
  appName: string;
  position: { x: number; y: number };
  moveAppIcon: (appName: string, newPosition: { x: number; y: number }) => void;
  onDoubleClick: () => void;
};

function AppIcon({ appName, position, moveAppIcon, onDoubleClick }: AppIconProps) {
  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    moveAppIcon(appName, { x: Math.floor(e.clientX / ICON_SIZE), y: Math.floor(e.clientY / ICON_SIZE) });
  };

  const styles: React.CSSProperties = {
    left: position.x * ICON_SIZE,
    top: position.y * ICON_SIZE,
    width: ICON_SIZE,
    height: ICON_SIZE,
  };

  return (
    <div
      className={`absolute grid place-items-center hover:bg-white hover:bg-opacity-20 hover:cursor-default`}
      style={styles}
      onDoubleClick={onDoubleClick}
      draggable={true}
      onDragEnd={onDragEnd}
    >
      <img src={ReactLogo} className="size-12 text-gray " alt="React logo" draggable={false} />
      <p className="text-center text-white text-sm">{appName}</p>
    </div>
  );
}

export default AppIcon;
