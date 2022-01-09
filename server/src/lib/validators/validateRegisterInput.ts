import Validator from "validator"
import isEmpty from "is-empty"

interface IData {
  // [key: string]: string
  fullName?: string
  email?: string
  password?: string
  password2?: string
  gender?: string
}

export default function validateLoginInput(data: IData) {
  let errors: IData = {}

  data.fullName = !isEmpty(data.fullName) ? data.fullName : ""
  data.email = !isEmpty(data.email) ? data.email : ""
  data.password = !isEmpty(data.password) ? data.password : ""
  data.password2 = !isEmpty(data.password2) ? data.password2 : ""
  data.gender = !isEmpty(data.gender) ? data.gender : ""

  // First name checks
  if (Validator.isEmpty(data.fullName!)) {
    errors.fullName = "First name field is required"
  }

  // email check
  if (Validator.isEmpty(data.email!)) {
    errors.email = "Email field is required"
  } else if (!Validator.isEmail(data.email!)) {
    errors.email = "Email is invalid"
  }

  //gender
  if (Validator.isEmpty(data.gender!)) {
    errors.gender = "Aye apache helicopterinho"
  }

  // passwords

  if (Validator.isEmpty(data.password!)) {
    errors.password = "Password field is required"
  }

  if (Validator.isEmpty(data.password2!)) {
    errors.password2 = "Confirm password field is required"
  }

  if (!Validator.isLength(data.password!, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters, up to 30"
  }

  if (!Validator.equals(data.password!, data.password2!)) {
    errors.password2 = "Passwords must match"
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
