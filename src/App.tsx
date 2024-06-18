import "./App.css";
import HexGrid from "./components/HexGrid";

function App() {
  return (
    <div className="App">
      <HexGrid
        width={1000}
        height={1000}
        hexSize={38}
        coordinates={[{ col: 0, row: 0 }]}
        image={{
          url: "https://julietfoundryvtt.s3.us-east-1.amazonaws.com/art/obsidian/636f62c538a7fa96086c4b8999e54336.jpg",
          width: 4096,
          height: 3072,
          offsetX: 0,
          offsetY: 25,
        }}
      />
    </div>
  );
}

export default App;
