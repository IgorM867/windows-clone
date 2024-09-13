import { TAKSBAR_HEIGHT } from "../../../constants";
import Clock from "./Clock";

function Taskbar() {
  return (
    <div className="bg-primary z-50 flex justify-between text-white relative" style={{ height: TAKSBAR_HEIGHT }}>
      <div></div>
      <Clock />
    </div>
  );
}

export default Taskbar;
