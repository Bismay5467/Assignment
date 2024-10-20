/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { IUnitContext } from "../types/types";

export const TempUnitContext = createContext<IUnitContext | undefined>(
  undefined
);

export function useTempUnitContext() {
  const tempUnitContext = useContext(TempUnitContext);
  if (tempUnitContext === undefined)
    throw new Error("An application side error occurred");
  return tempUnitContext;
}
