import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

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
  console.log('respnse', response)
  return response
}