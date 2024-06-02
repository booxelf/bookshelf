import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const auth = getAuth();

/**
 * @typedef {Object} SignupResponse
 * @property {Object} data
 * @property {'ok' | 'error'} status
 * @property {{ code: string, message: string }} error
 */

/**
 * Create user's account
 * @param {string} fullName 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<SignupResponse>} response
 */
export const signUp = async (fullName, email, password) => {
  const response = {};
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      await updateProfile(auth.currentUser, { displayName: fullName })
        .then(() => {
          response.data = { user: userCredential.user }
          response.status = "ok"
        })
        .catch((error) => {
          response.status="error"
          response.error = {
            code: error.code,
            message: error.message,
          }
        });
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