// src/components/EditHex.tsx
import React, { useEffect, useState } from "react";
import { HexCoordinate, useHexContext } from "../contexts/HexContext";

const EditHex: React.FC = () => {
  const { clickedHex, coordinates, updateCoordinates } = useHexContext();
  const [hexData, setHexData] = useState<HexCoordinate>({
    col: clickedHex?.col || 0,
    row: clickedHex?.row || 0,
    revealed: false,
    owned: false,
    text: "",
  });

  useEffect(() => {
    if (clickedHex) {
      const data = coordinates.find(
        (coord) => coord.col === clickedHex.col && coord.row === clickedHex.row
      );
      setHexData(
        data || { ...clickedHex, revealed: false, owned: false, text: "" }
      );
    }
  }, [clickedHex, coordinates]);

  if (!clickedHex) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setHexData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    const updatedCoordinates = coordinates.map((coord) =>
      coord.col === clickedHex.col && coord.row === clickedHex.row
        ? { ...coord, ...hexData }
        : coord
    );
    if (
      !coordinates.find(
        (coord) => coord.col === clickedHex.col && coord.row === clickedHex.row
      )
    ) {
      updatedCoordinates.push(hexData);
    }
    updateCoordinates(updatedCoordinates);
  };

  // if (!clickedHex) return null;

  return (
    <div>
      <h3>
        Editing Hex ({clickedHex.col}, {clickedHex.row})
      </h3>
      <form>
        <div>
          <label>
            <input
              type="checkbox"
              name="revealed"
              checked={hexData.revealed}
              onChange={handleChange}
            />
            Revealed
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="owned"
              checked={hexData.owned}
              onChange={handleChange}
            />
            Owned
          </label>
        </div>
        <div>
          <label>
            Text
            <input
              type="text"
              name="text"
              value={hexData.text}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditHex;
