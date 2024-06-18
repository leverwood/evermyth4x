import "./App.css";
import HexGrid from "./components/HexGrid";

function App() {
  return (
    <div className="App">
      <HexGrid
        width={600}
        height={600}
        hexSize={30}
        coordinates={[
          { col: 0, row: 0, imageSrc: "https://placehold.co/600x400.png" },
        ]}
      />
    </div>
  );
}

export default App;
