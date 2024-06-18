import "./App.css";
import { HexProvider } from "./components/HexContext";
import HexGrid from "./components/HexGrid";

const hexSize = 38;
const hexHeight = Math.sqrt(3) * hexSize;
const hexWidth = 2 * hexSize;

function App() {
  return (
    <div className="App">
      <HexProvider>
        <HexGrid
          width={1200}
          height={800}
          hexSize={hexSize}
          coordinates={[
            { col: -1, row: 3, revealed: true, text: "3" },
            { col: 0, row: 0, revealed: true, owned: true, text: "1" },
            { col: 0, row: 1, revealed: true },
            { col: 0, row: 2, revealed: true },
            { col: 1, row: 1, revealed: true },
            { col: 1, row: 2, revealed: true },
            { col: 2, row: 0, text: "2" },
            { col: 2, row: 3, revealed: true },
            { col: 3, row: 3, revealed: true, text: "4" },
          ]}
          image={{
            url: "https://julietfoundryvtt.s3.us-east-1.amazonaws.com/art/obsidian/636f62c538a7fa96086c4b8999e54336.jpg",
            width: 4096,
            height: 3072,
            offsetX: 0 + hexWidth + hexWidth / 2,
            offsetY: 25 + hexHeight,
          }}
        />
      </HexProvider>
    </div>
  );
}

export default App;
