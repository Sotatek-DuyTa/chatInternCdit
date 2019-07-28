export const loginPhoneValidate = (value, label) => {
  let errors = '';
  if (!value) {
    errors = `${label} can not be empty`;
  }

  return errors;
}

export const verifyCodeValidate = (value, label) => {
  let errors = '';
  if(!value) {
    errors = `${label} can not be empty`;
  } else if (value.toString().length !== 6) {
    errors = `${label} should have 6 character`;
  }

  return errors;
}

const requiredMsg = (value, label) => !value ? `${label} can not be empty` : '';