import "./App.css";
import HexGrid from "./components/HexGrid";

function App() {
  return (
    <div className="App">
      <HexGrid
        width={2000}
        height={1000}
        hexSize={30}
        coordinates={[{ col: 0, row: 0 }]}
        image={{
          url: "https://julietfoundryvtt.s3.us-east-1.amazonaws.com/art/obsidian/636f62c538a7fa96086c4b8999e54336.jpg",
          width: 4096,
          height: 3072,
        }}
      />
    </div>
  );
}

export default App;
