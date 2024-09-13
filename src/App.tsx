import Desktop from "./components/Desktop/Desktop";

export const apps = [
  "App 1",
  "App 2",
  "App 3",
  "App 4",
  "App 5",
  "App 6",
  "App 7",
  "App 8",
  "App 9",
  "App 10",
  "App11",
  "App12",
];

function App() {
  return (
    <main className="bg-[#242424] w-screen h-screen overflow-hidden">
      <Desktop apps={apps} />
    </main>
  );
}

export default App;
