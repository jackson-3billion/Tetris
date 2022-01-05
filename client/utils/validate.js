export const nicknameValidator = (str) => {
  const trimmed = str.trim();
  if (!trimmed.length || trimmed.length < 2) {
    return [false, 'Minimum length is 2'];
  }
  if (trimmed.length > 8) {
    return [false, 'Maximum length is 8'];
  }
  return [true, 'Valid nickname 😊'];
};

export const emailValidator = (str) => {
  const trimmed = str.trim();
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isValid = emailRegex.exec(trimmed);

  if (isValid) {
    return [isValid, 'Valid email 😊'];
  } else {
    return [isValid, 'Email is not valid 🧐'];
  }
};
