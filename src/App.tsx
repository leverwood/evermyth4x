// src/App.tsx
import "./App.css";
import { HexProvider } from "./contexts/HexContext";
import HexGrid from "./components/HexGrid";
import EditHex from "./components/EditHex";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const hexSize = 38;
const hexHeight = Math.sqrt(3) * hexSize;
const hexWidth = 2 * hexSize;

function App() {
  return (
    <div className="App">
      <HexProvider>
        <Container fluid>
          <Row style={{ textAlign: "center" }}>
            <Col>
              <HexGrid
                width={1200}
                height={800}
                hexSize={hexSize}
                image={{
                  url: "https://julietfoundryvtt.s3.us-east-1.amazonaws.com/art/obsidian/636f62c538a7fa96086c4b8999e54336.jpg",
                  width: 4096,
                  height: 3072,
                  offsetX: 0 + hexWidth + hexWidth / 2,
                  offsetY: 25 + hexHeight,
                }}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <EditHex />
          </Row>
        </Container>
      </HexProvider>
    </div>
  );
}

export default App;
