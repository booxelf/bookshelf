import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

/**
 * @typedef {Object} LogoutResponse
 * @property {'ok' | 'error'} status
 * @property {{ code: string, message: string }} error
 */

/**
 * Log the user out of the application
 * @returns {Promise<LogoutResponse>} response
 */
export const logout = async() => {
  const response = {}
  signOut(auth).then(() => {
    response.status = "ok"
  }).catch((error) => {
    response.status = "error";
    response.error = {
      code: error.code,
      message: error.message
    }
  });
  return response
}