import { getUserDetails, helloWorld } from '@bookshelf/api'
import { useEffect, useRef, useState } from 'react';
import { logout, signUp } from "@bookshelf/auth";
import { Button } from "@mui/material"
import SignUp from "./pages/auth/SignUp"

function App() {
  return(
    <>
    <SignUp />
    </>
  )
}

export default App
