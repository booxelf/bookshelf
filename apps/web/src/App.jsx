import { getUserDetails, helloWorld } from '@bookshelf/api'
import { useEffect, useRef, useState } from 'react';
import { logout, signUp } from "@bookshelf/auth";

function App() {
  helloWorld();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserDetails()
      setUser(user.data)
    }
    fetchUser()
  }, [])

  return (
    <>
      <h1>Test signup</h1>
      {user ? (
        <>
          <p>Hello {user?.email}</p>
          <button onClick={async() => {
            const response = await logout();
            if (response.status === "ok") {
              setUser(null)
            }
            window.location.reload();
          }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <input type="text" name="name" id="name" placeholder="Name" ref={nameRef} />
          <input type="email" name="email" id="email" placeholder="Email" ref={emailRef} />
          <input type="password" name="password" id="password" placeholder="Password" ref={passwordRef} />
          <button onClick={async() => {
            const response = await signUp(nameRef.current.value, emailRef.current.value, passwordRef.current.value);
            if (response.status === "ok") {
              setUser(response.data.user)
            }
          }}>
            Signup
          </button>
        </>
      )}
    </>
  )
}

export default App