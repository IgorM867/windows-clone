import { createContext, useContext, useState } from "react";
import Window from "../Window/Window";
import { createPortal } from "react-dom";

type WindowsContextType = {
  openWindow: (appName: string) => void;
  closeWindow: (appName: string) => void;
  bringToFront: (appName: string) => void;
  updateWindow: (appName: string, newProperties: Omit<Partial<Window>, "name">) => void;
};
const WindowsContext = createContext<WindowsContextType | null>(null);

export type Window = {
  name: string;
  isActive: boolean;
  zIndex: number;
  isFullScreen: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
};

const initalWindow: Omit<Window, "name"> = {
  isFullScreen: true,
  isActive: true,
  zIndex: 0,
  size: {
    width: 500,
    height: 200,
  },
  position: {
    x: 0,
    y: 0,
  },
};
function WindowsProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<Window[]>([]);
  const [topZIndex, setTopZIndex] = useState(0);

  const openWindow = (appName: string) => {
    const w = windows.find(({ name }) => name === appName);

    if (w) {
      setWindows((prev) =>
        prev.map((window) => (window.name === appName ? { ...window, isActive: true, zIndex: topZIndex + 1 } : window))
      );
    } else {
      setWindows((prev) => [...prev, { ...initalWindow, name: appName, zIndex: topZIndex + 1 }]);
    }
    setTopZIndex(topZIndex + 1);
  };
  const closeWindow = (appName: string) => {
    setWindows((prev) => prev.map((window) => (window.name === appName ? { ...window, isActive: false } : window)));
  };
  const bringToFront = (appName: string) => {
    setWindows((prev) =>
      prev.map((window) => (window.name === appName ? { ...window, zIndex: topZIndex + 1 } : window))
    );
    setTopZIndex(topZIndex + 1);
  };
  const updateWindow = (appName: string, newProperties: Omit<Partial<Window>, "name">) => {
    setWindows((prev) =>
      prev.map((window) => (window.name === appName ? { ...window, ...newProperties, zIndex: topZIndex + 1 } : window))
    );
    setTopZIndex(topZIndex + 1);
  };

  const activeWindows = windows.filter((window) => window.isActive);

  return (
    <WindowsContext.Provider value={{ openWindow, closeWindow, bringToFront, updateWindow }}>
      {activeWindows.map((w) => createPortal(<Window key={w.name} window={w} />, document.body))}
      {children}
    </WindowsContext.Provider>
  );
}
export function useWindows() {
  const windowsContext = useContext(WindowsContext);
  if (!windowsContext) {
    throw new Error("Cannot use useWindows hooks outside of WindowsProvider");
  }

  return windowsContext;
}
export default WindowsProvider;
