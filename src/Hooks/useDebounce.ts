import {useEffect, useState} from 'react';

export const useDebounce = (value: any): any => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setDebouncedValue(value ?? '');
    }, 300);

    return () => {
      console.log('clearTimeout');
      clearTimeout(typingTimer);
    };
  }, [value]);

  return debouncedValue;
};
