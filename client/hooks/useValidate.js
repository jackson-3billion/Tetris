import { useState, useEffect } from 'react';

const useValidate = (str, validator) => {
  const [isValid, setIsValid] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const [v, m] = validator(str);
    setIsValid(v);
    setMsg(m);
  }, [str, validator]);

  return [isValid, msg];
};

export default useValidate;
