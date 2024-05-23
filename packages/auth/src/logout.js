import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export const logout = async() => {
  const response = {}
  signOut(auth).then(() => {
    response.status = "ok"
  }).catch((error) => {
    response.status = "error";
    response.error = {
      code: error.code,
      message: error.message
    }
  });
  return response
}