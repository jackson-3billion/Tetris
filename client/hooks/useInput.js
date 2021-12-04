import { useState, useCallback } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback(({ target }) => setValue(target.value), []);

  return [value, setValue, handler];
};

export default useInput;
