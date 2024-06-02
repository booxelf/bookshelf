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
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      response.data.user = userCredential.user
      response.status = "ok"
    })
    .catch((error) => {
      response.status="error"
      response.error = {
        code: error.code,
        message: error.message,
      }
    });
  return response
}