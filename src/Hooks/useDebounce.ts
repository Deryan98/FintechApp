import {useEffect, useState} from 'react';

export const useDebounce = (value: any): any => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setDebouncedValue(value ?? '');
    }, 100);

    return () => {
      clearTimeout(typingTimer);
    };
  }, [value]);

  return debouncedValue;
};