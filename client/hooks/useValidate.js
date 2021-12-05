import { useState, useEffect } from 'react';

const useValidate = (str) => {
  const [isValid, setValid] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const trimmed = str.trim();
    if (!trimmed.length || trimmed.length < 2) {
      setValid(false);
      setMsg('두 글자 이상을 입력해주세요.');
      return;
    }
    if (trimmed.length > 10) {
      setValid(false);
      setMsg('10글자 이하로 입력해주세요.');
      return;
    }
    if (trimmed.length > 1) {
      setValid(true);
      setMsg('유효한 닉네임입니다.');
    }
  }, [str]);

  return [isValid, msg];
};

export default useValidate;
