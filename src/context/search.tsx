/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { ISearch } from "../types/types";

export const SearchContext = createContext<ISearch | undefined>(
  undefined
);

export function useSearchContext() {
  const searchContext = useContext(SearchContext);
  if (searchContext === undefined)
    throw new Error("An application side error occurred");
  return searchContext;
}
