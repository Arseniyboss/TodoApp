import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  const savedData = localStorage.getItem(key);
  const initialState = savedData ? JSON.parse(savedData) : initialValue;

  const [value, setValue] = useState(initialState);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
