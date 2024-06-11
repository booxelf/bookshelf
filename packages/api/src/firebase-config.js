import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: 'AIzaSyDTrtNbOEi6mBGICk28HoAedIHGCg4P8mk',
  authDomain: 'book-xelf.firebaseapp.com',
  projectId: 'book-xelf',
  storageBucket: 'book-xelf.appspot.com',
  messagingSenderId: '854064468802',
  appId: '1:854064468802:web:297ccd5fdf0ce3ea11eedb',
  measurementId: 'G-KEK26F8NT9'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
getAnalytics(app);