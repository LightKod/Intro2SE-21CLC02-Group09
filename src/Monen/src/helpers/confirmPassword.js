export function confirmPasswordValidator(password, confirmPassword) {
    if (!confirmPassword) {
      return "Please confirm your password."
    }
    if (password !== confirmPassword) {
      return "Passwords don't match."
    }
    return ''
  }
  