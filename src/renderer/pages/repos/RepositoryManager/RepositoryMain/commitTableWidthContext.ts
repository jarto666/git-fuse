// WidthContext.ts
import { createContext } from 'react';

export interface HeaderWidths {
  graphHeader: number;
  messageHeader: number;
  authorHeader: number;
  shaHeader: number;
}

export interface WidthContextType {
  headerWidths: HeaderWidths;
  setHeaderWidths: React.Dispatch<React.SetStateAction<HeaderWidths>>;
}

const WidthContext = createContext<WidthContextType | undefined>(undefined);

export default WidthContext;
