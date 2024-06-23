import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

/**
 * @typedef {Object} LoginResponse
 * @property {Object} data
 * @property {'ok' | 'error'} status
 * @property {{ code: string, message: string }} error
 */

/**
 * Log the user into the application
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<LoginResponse>} response
 */
export const login = async (email, password) => {
  const response = {};
  try {
    const loginResponse = await signInWithEmailAndPassword(auth, email, password)
    if (loginResponse.user) {
      response.data = { user: loginResponse.user }
      response.status = "ok"
    }
  } catch(error) {
    response.status="error"
    response.error = {
      code: error.code,
      message: error.message,
    }
  };
  return response
}