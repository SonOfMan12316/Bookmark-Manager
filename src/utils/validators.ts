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
