import { useWindows, Window as WindowT } from "../WindowsProvider/WindowsProvider";
import TitleBar from "./TitleBar";
import Resizers from "./Resizers";
import { TAKSBAR_HEIGHT } from "../../constants";

type WindowProps = {
  window: WindowT;
};

function Window({ window }: WindowProps) {
  const { bringToFront } = useWindows();
  const { name, position, isFullScreen, size, zIndex } = window;

  const styles: React.CSSProperties = isFullScreen
    ? { left: 0, top: 0, width: document.body.clientWidth, height: document.body.clientHeight - TAKSBAR_HEIGHT, zIndex }
    : { left: position.x, top: position.y, width: size.width, height: size.height, zIndex };

  return (
    <div
      className={`absolute w-96 h-56 bg-window-secondary shadow-lg overflow-hidden`}
      style={styles}
      onMouseDown={() => bringToFront(window.name)}
    >
      {!isFullScreen && (
        <Resizers appName={window.name} isFullScreen={isFullScreen} position={window.position} size={window.size} />
      )}
      <TitleBar appName={name} isFullScreen={isFullScreen} position={position} width={size.width} />
      {name}
    </div>
  );
}

export default Window;
