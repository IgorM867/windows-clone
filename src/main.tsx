import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import WindowsProvider from "./components/WindowsProvider/WindowsProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WindowsProvider>
      <App />
    </WindowsProvider>
  </StrictMode>
);
