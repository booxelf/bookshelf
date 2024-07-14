import { Paper, Grid, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import authStyles from "./authStyles";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useRef, useState } from "react";
import { login } from "@bookshelf/auth";
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const userIdRef = useRef();
    const passwordRef = useRef();
    const [apiErr, setApiErr] = useState(null);
    const navigate = useNavigate()

    const initialValues = {
        userId: '',
        password: ''
    }

    const validationSchema = Yup.object({
        userId: Yup.string().required('Required !'),
        password: Yup.string().required('Required !')
    })

    const onSubmit = async (values) =>{
        console.log('login clicked')
        var response = await login(userIdRef.current.value, passwordRef.current.value);

        console.log(response);
        if(response.status === 'ok'){
            navigate('/dashboard');
        }
        else{
            navigate('/dashboard');
            setApiErr(response.error.message);
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    return ( 
    <div style={authStyles.divStyle}>
        <form onSubmit={formik.handleSubmit}>
            <Paper elevation={10} style={authStyles.paperStyle}>
                <Grid align='center'>
                    <h2>Login</h2>
                </Grid>
                <div className='form-control'>
                    <TextField
                    label= 'UserId/Email'
                    variant= 'outlined'
                    fullWidth
                    style={authStyles.txtBoxStyle}
                    name='userId'
                    id = 'userId'
                    placeholder = 'UserId/Email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value = {formik.values.userId}
                    inputRef={userIdRef}
                    />
                    {formik.touched.userId && formik.errors.userId ? <div className="error">{formik.errors.userId}</div> : null}
                </div>

                <div className="form-control">
                    <TextField 
                    label = 'Password'
                    type = 'password'
                    varient = 'outlined'
                    fullWidth
                    style= {authStyles.txtBoxStyle}
                    name= 'password'
                    id= 'password'
                    placeholder = 'Password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value = {formik.values.password}
                    inputRef={passwordRef}
                    />
                    {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
                </div>

                {apiErr ? <div className="error">{apiErr}</div> : null}

                <Button
                type = 'submit'
                color= 'primary'
                variant= 'contained'
                fullWidth
                style={authStyles.btnStyle}
                >
                    Login
                </Button>

                <Typography>
                    Don't have an account?
                    <Link to='/'>
                        Signup?
                    </Link>
                </Typography>
            </Paper>
        </form>
    </div> );
}
 
export default Login;