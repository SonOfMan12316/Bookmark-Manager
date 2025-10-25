interface PatternValdation {
  value: RegExp
  message: string
}

export const passwordPattern = (fieldName = 'Password'): PatternValdation => {
  return {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{}|\\;:'",.<>/?`~])[A-Za-z\d!@#$%^&*()_\-+=[\]{}|\\;:'",.<>/?`~]+$/,
    message: `${fieldName} must contain at least one number, one uppercase letter, one lowercase letter, and one special character`,
  }
}

export const fullNamePattern = (fieldName = 'Full name'): PatternValdation => {
  return {
    value: /^[A-Za-z]+([ '’-][A-Za-z]+)*$/,
    message: `${fieldName} format is invalid`,
  }
}
