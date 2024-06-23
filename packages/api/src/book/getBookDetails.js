import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { app } from '../firebase-config'

const db = getFirestore(app);

/**
 * @typedef {Object} GetBookDetailsResponse
 * @property {Object} data
 * @property {'ok' | 'error'} status
 * @property {{ code: string, message: string }} error
 */

/**
 * Get details for a specific book
 * @param {string} bookId - unique id of the book
 * @returns {Promise<GetBookDetailsResponse>} response - An object containing book details
 */
export const getBookDetails = async (bookId) => {
  const response = {};
  try {
    const bookRef = doc(db, `book/${bookId}`)
    const bookDetailsSnapshot = await getDoc(bookRef)
    response.status = 'ok';
    if (bookDetailsSnapshot.exists()) {
      response.data = bookDetailsSnapshot.data();
    } else {
      // no data found
      response.data = {}
    }
  } catch (error) {
    response.status = 'error';
    response.error = {
      code: error.code,
      message: error.message,
    }
  }
  return response
}