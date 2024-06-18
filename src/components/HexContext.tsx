// src/contexts/HexContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface HexContextType {
  hoveredHex: { col: number; row: number } | null;
  setHoveredHex: (hex: { col: number; row: number } | null) => void;
}

const HexContext = createContext<HexContextType | undefined>(undefined);

export const HexProvider = ({ children }: { children: ReactNode }) => {
  const [hoveredHex, setHoveredHex] = useState<{
    col: number;
    row: number;
  } | null>(null);

  return (
    <HexContext.Provider value={{ hoveredHex, setHoveredHex }}>
      {children}
    </HexContext.Provider>
  );
};

export const useHexContext = (): HexContextType => {
  const context = useContext(HexContext);
  if (context === undefined) {
    throw new Error("useHexContext must be used within a HexProvider");
  }
  return context;
};
