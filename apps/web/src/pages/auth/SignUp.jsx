import { getUserDetails } from '@bookshelf/api'
import { useEffect, useRef, useState } from 'react';
import { logout, signUp } from "@bookshelf/auth";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material"
import { useFormik } from 'formik'
import { Link } from "react-router-dom"
import '../../styles.css'
import authStyles from './authStyles';'./authStyles'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [user, setUser] = useState(null);
  const [apiErr, setApiErr] = useState(null);

  const initialValues = {
    name: '',
    email: '',
    password: ''
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Required !'),
    email: Yup.string()
    .email('Invalid Email')
    .required('Required !'),
    password: Yup.string().required('Required !')
  })

  const onSubmit = async (values) => {
    console.log("Sign Up Clicked")
    const response = await signUp(nameRef.current.value, emailRef.current.value, passwordRef.current.value);
    if (response.status === "ok") {
        //setUser(response.data.user)
        navigate('/dashboard')
    }
    else{
      setApiErr(response.error.message);
    }
    console.log(response);
  }

  const formik = useFormik({
    initialValues, 
    validationSchema,
    onSubmit
  })

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserDetails()
      setUser(user.data)
    }
    fetchUser()
  }, [])

  // const onSignUpClicked = async(e) =>{
  //   e.preventDefault();
  //   const response = await signUp(nameRef.current.value, emailRef.current.value, passwordRef.current.value);
  //   if (response.status === "ok") {
  //       setUser(response.data.user)
  //   }
  //   console.log(response);
  // } 

  return (
    <div style={authStyles.divStyle}>
      {/* {user ? (
        <>
          <p>Hello {user?.email}</p>
          <Button variant="contained" onClick={async() => {
            const response = await logout();
            if (response.status === "ok") {
              setUser(null)
            }
            window.location.reload();
          }}>
            Logout
          </Button>
        </>
      ) : ( */}
        <>
        <form onSubmit={formik.handleSubmit}>
            <Paper elevation={10} style={authStyles.paperStyle}>
                <Grid align='center'>
                    <h2>Sign Up</h2>
                </Grid>
                <div className='form-control'>
                  <TextField 
                  label='Name' 
                  varient='outlined' 
                  fullWidth 
                  style={authStyles.txtBoxStyle} 
                  name="name" 
                  id="name" 
                  placeholder="Name" 
                  inputRef={nameRef} 
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? <div className='error'>{formik.errors.name}</div> : null}
                </div>

                <div className='form-control'>
                  <TextField 
                  label='Email' 
                  variant='outlined' 
                  fullWidth 
                  style={authStyles.txtBoxStyle} 
                  name="email" 
                  id="email" 
                  placeholder="Email" 
                  inputRef={emailRef} 
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div>: null} 
                </div>

                <div className='form-control'>
                  <TextField 
                  label='Password' 
                  type='password'
                  variant='outlined' 
                  fullWidth 
                  style={authStyles.txtBoxStyle} 
                  name="password" 
                  id="password" 
                  placeholder="Password" 
                  inputRef={passwordRef}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? <div className='error'>{formik.errors.password}</div>: null}
                </div>

                {apiErr ? <div className='error'> {apiErr} </div> : null}

                <Button 
                type='submit' 
                color='primary' 
                variant="contained" 
                fullWidth 
                style={authStyles.btnStyle}>
                  Sign Up
                </Button>

                <Typography>
                    Already have an account?
                    <Link to={'/login'}>
                        Login?
                    </Link>
                </Typography>

            </Paper>
        </form>
        </>
      {/* )} */}
    </div>
  )
}


export default Signup;