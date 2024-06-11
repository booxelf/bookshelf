import { doc, setDoc, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { ref, getStorage, uploadBytes } from 'firebase/storage'
import { PDFDocument } from 'pdf-lib'
import { app } from '../firebase-config'
import { nanoid } from '../nanoid';

const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

export const uploadBook = async (fileObj) => {
  const bookBase64 = await toBase64(fileObj)
  const book = await PDFDocument.load(bookBase64, { updateMetadata: false })
  const bookMetadata = {
    name: fileObj.name ?? book.getTitle(),
    author: book.getAuthor() ?? '',
    pageCount: book.getPageCount(),
    fileSize: fileObj.size,
    keywords: book.getKeywords() ?? ''
  }
  const bookId = nanoid();
  const bookDocRef = doc(db, 'book', bookId)
  const bookUploadRef = ref(storage, `books/${bookId}.pdf`)
  const response = {}
  try {
    await setDoc(bookDocRef, {
      ...bookMetadata,
      uid: auth.currentUser.uid ?? 'uid'
    })
    await uploadBytes(bookUploadRef, fileObj, {
      customMetadata: { ...bookMetadata },
    })
    response.status = 'ok'
  } catch (error) {
    response.status = 'error'
    response.error = {
      code: error.code,
      message: error.message
    }
  }
  return response
}