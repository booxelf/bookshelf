import { applyActionCode, getAuth, sendEmailVerification } from "firebase/auth"

const auth = getAuth();

/**
 * @typedef {Object} TriggerEmailVerificationResponse
 * @property {Object} data
 * @property {'ok' | 'error'} status
 * @property {{ code: string, message: string }} error
 */

/**
 * Send verification email to the current user context
 * @returns {Promise<TriggerEmailVerificationResponse>} response
 */
export const triggerEmailVerification = async () => {
  const response = {};
  if (auth.currentUser) {
    try {
      await sendEmailVerification(auth.currentUser);
      response.data = null;
      response.status = "ok";
    } catch (error) {
      response.status = "error"
      response.data = null;
      response.error = {
        code: error.code ?? 'Something went wrong',
        message: error.message ?? 'Couldn\'t send verification email'
      }
    }
  } else {
    response.data = null;
    response.status = "error";
    response.error = {
      code: "User not found",
      message: "User not found"
    }
  }
  return response;
}

/**
 * @typedef {Object} VerifyEmailResponse
 * @property {Object} data
 * @property {'ok' | 'error'} status
 * @property {{ code: string, message: string }} error
 */

/**
 * Verify user with verification code sent to user
 * @param {string} code
 * @returns {Promise<VerifyEmailResponse>} response
 */
export const verifyEmail = async (code) => {
  const response = {};
  try {
    await applyActionCode(auth, code);
    response.data = null;
    response.status = "ok";
  } catch (error) {
    response.status = "error"
    response.data = null;
    response.error = {
      code: error.code ?? 'Something went wrong',
      message: error.message ?? 'Kindly check your code, and try again.'
    }
  }
}