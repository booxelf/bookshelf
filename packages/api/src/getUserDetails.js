import { getAuth } from "firebase/auth";

const auth = getAuth();

export const getUserDetails = async () => {
  const firebaseUser = auth.currentUser;
  const response = {};
  if (firebaseUser !== null) {
    const { displayName, email, photoURL, emailVerified } = firebaseUser;
    response.data = {
      displayName,
      email,
      photoURL,
      emailVerified
    }
  } else response.data = null
  response.status = "ok"
  return response
}