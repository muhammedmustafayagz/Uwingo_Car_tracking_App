import { useState, useEffect } from "react";

function useDebounce<T>({
  timeOut = 1000,
  value
}: {
  timeOut?: number;
  value: T | null;
}): T | null {

  const [debouncedValue, setDebouncedValue] = useState<T | null>(value);

  useEffect(() => {
    // Timeout oluştur
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, timeOut);

    // Cleanup function - bir sonraki effect çalışmadan önce timeout'u temizle
    return () => {
      clearTimeout(handler);
    };

  }, [value, timeOut]); // value veya timeOut değiştiğinde çalış

  return debouncedValue;
}

export default useDebounce;