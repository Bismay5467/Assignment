/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const useLocalStorage = (key: string, initialValue: any) => {
  const getStoredValFromLocalStorage = () => {
    const storedval = localStorage.getItem(key);
    return storedval ? JSON.parse(storedval) : initialValue;
  };
  const [val, setVal] = useState(getStoredValFromLocalStorage());
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  }, [key, val]);
  return [val, setVal];
};
