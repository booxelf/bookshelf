import { getUserDetails, helloWorld } from '@bookshelf/api'
import { useEffect, useRef, useState } from 'react';
import { logout, signUp } from "@bookshelf/auth";
import { Button } from "@mui/material"
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import Dashboard from './pages/dashboard/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return(
    <BrowserRouter>
      <div className='App'>
          <Routes>
            <Route path = '/' Component = {SignUp} />
            <Route path = '/login' Component = {Login} />
            <Route path = '/dashboard' Component={Dashboard}/>
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
