import { Cookies } from 'react-cookie'
const IS_LOGGED_IN = 'isLoggedIn'

export const rememberLogin = () => localStorage.setItem(IS_LOGGED_IN, '')

export const forgetLogin = () => localStorage.removeItem(IS_LOGGED_IN)

export const isLoggedIn = () => {
  const cookies = new Cookies()
  if (cookies?.get("sid")) {
    return IS_LOGGED_IN in localStorage
  }
  localStorage.removeItem(IS_LOGGED_IN)
  return false
}
