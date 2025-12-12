import { useState, useEffect } from "react";

export default function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch (err) {
      console.warn("useLocalStorageState parse error", err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.warn("useLocalStorageState save error", err);
    }
  }, [key, state]);

  return [state, setState];
}
