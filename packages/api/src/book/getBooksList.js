import { doc, getDoc, getFirestore, query, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { app } from '../firebase-config'

const db = getFirestore(app);
const auth = getAuth();
const currentUserId = auth?.currentUser?.uid;

/**
 * @typedef {Object} GetBooksListResponse
 * @property {Object} data
 * @property {'ok' | 'error'} status
 * @property {{ code: string, message: string }} error
 */

/**
 * Get list of books for the current logged in user
 * @returns {Promise<GetBooksListResponse>} response - An object containing list of books
 */
export const getBooksList = async () => {
  const response = {};
  try {
    const booksListRef = doc(db, 'book')
    const booksListQuery = query(booksListRef, where('uid', '==', currentUserId))
    const booksListSnapshot = await getDoc(booksListQuery)
    response.status = 'ok';
    if (booksListSnapshot.exists()) {
      response.data = booksListSnapshot.data();
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