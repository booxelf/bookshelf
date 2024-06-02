import { getUserDetails, helloWorld } from '@bookshelf/api'
import { useEffect, useRef, useState } from 'react';
import { logout, signUp } from "@bookshelf/auth";
import { Button, Grid, Paper, TextField, Typography, Link } from "@mui/material"
import { useFormik } from 'formik'
import '../../styles.css'

const Signup = () => {
  //helloWorld();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [user, setUser] = useState(null);

  const initialValues = {
    name: '',
    email: '',
    password: ''
  }

  const onSubmit = values => {
    console.log("formik", values)
  }

  const validate = values => {
    let errors = {}

    if(!values.name){
      errors.name = 'Required'
    }

    if(!values.email){
      errors.email = 'Required'
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = 'Invalid email'
    }

    if(!values.password){
      errors.password = 'Required'
    }

    return errors
  }

  const formik = useFormik({
    initialValues, 
    onSubmit,
    validate
  })

  console.log('Formik Errors', formik.errors)

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserDetails()
      setUser(user.data)
    }
    fetchUser()
  }, [])

  const onSignUpClicked = async(e) =>{
    e.preventDefault();
    // const response = await signUp(nameRef.current.value, emailRef.current.value, passwordRef.current.value);
    // if (response.status === "ok") {
    //     setUser(response.data.user)
    // }
    // console.log(response);
    console.log("hiiii");
  } 

  return (
    <div style={style.divStyle}>
      {user ? (
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
      ) : (
        <>
        <form onSubmit={formik.handleSubmit}>
            <Paper elevation={10} style={style.paperStyle}>
                <Grid align='center'>
                    <h2>Sign Up</h2>
                </Grid>
                <div className='form-control'>
                  <TextField label='Name' varient='outlined' fullWidth style={style.txtBoxStyle} 
                  name="name" id="name" placeholder="Name" inputRef={nameRef} 
                  onChange={formik.handleChange} value={formik.values.name}/>
                  {formik.errors.name ? <div className='error'>{formik.errors.name}</div> : null}
                </div>

                <div className='form-control'>
                  <TextField label='Email' varient='outlined' fullWidth style={style.txtBoxStyle} 
                  name="email" id="email" placeholder="Email" inputRef={emailRef} 
                  onChange={formik.handleChange} value={formik.values.email}/>
                  {formik.errors.email ? <div className='error'>{formik.errors.email}</div>: null} 
                </div>

                <div className='form-control'>
                  <TextField label='Password' varient='outlined' fullWidth style={style.txtBoxStyle} 
                  name="password" id="password" placeholder="Password" inputRef={passwordRef}
                  onChange={formik.handleChange} value={formik.values.password}/>
                  {formik.errors.password ? <div className='error'>{formik.errors.password}</div>: null}
                </div>

                <Button type='submit' color='primary' variant="contained" 
                fullWidth style={style.btnStyle}>Sign Up</Button>

                <Typography>
                    Already have an account?
                    <Link>
                        Login ?
                    </Link>
                </Typography>

            </Paper>
        </form>
          {/* <input type="text" name="name" id="name" placeholder="Name" ref={nameRef} />
          <input type="email" name="email" id="email" placeholder="Email" ref={emailRef} />
          <input type="password" name="password" id="password" placeholder="Password" ref={passwordRef} />
          <Button variant="contained" onClick={onSignUpClicked}>
            Signup
          </Button> */}
        </>
      )}
    </div>
  )
}

const style = {
    paperStyle : {
        padding : 20,
        height: '90vh',
        width: 400,
        margin: '0px auto'
    },  

    btnStyle : {
        margin: '10px 0'
    },

    txtBoxStyle : {
        margin: '10px 0'
    },

    divStyle : {
        backgroundColor: '#4a7bd0',
        width: '100vw',
        height: '100vh'
    }
}


export default Signup;