import {useEffect, useState} from 'react';

export const useDebounce = (value: any, timeout: number = 300): any => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setDebouncedValue(value ?? '');
    }, timeout);

    return () => {
      clearTimeout(typingTimer);
    };
  }, [value]);

  return debouncedValue;
};
