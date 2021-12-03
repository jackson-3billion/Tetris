import { useState, useCallback } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');
  const handler = useCallback(({ target }) => setValue(target.value), []);

  return [value, setValue, handler];
};

export default useInput;
