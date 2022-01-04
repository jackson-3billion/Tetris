export const nicknameValidator = (str) => {
  const trimmed = str.trim();
  if (!trimmed.length || trimmed.length < 2) {
    return [false, '두 글자 이상을 입력해주세요.'];
  }
  if (trimmed.length > 8) {
    return [false, '8글자 이하로 입력해주세요.'];
  }
  return [true, '유효한 닉네임입니다.'];
};

export const emailValidator = (str) => {
  const trimmed = str.trim();
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isValid = emailRegex.exec(trimmed);

  if (isValid) {
    return [isValid, 'Email is valid'];
  } else {
    return [isValid, 'Email is not valid'];
  }
};
