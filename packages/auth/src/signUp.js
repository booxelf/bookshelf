import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const signUp = async (fullName, email, password) => {
  const response = {};
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
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
  console.log('respnse', response)
  return response
}