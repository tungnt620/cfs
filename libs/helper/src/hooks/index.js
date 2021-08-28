import React, { useState, useEffect, useRef } from 'react';

export default function useBooleanToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = React.useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle];
}

export function usePreviousValue(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
