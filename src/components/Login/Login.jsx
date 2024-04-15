import styles from "../Signup/signup.module.css"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useFormik } from "formik"
import * as Yup from 'yup'
import server from "../../server/url";
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { loadingactions } from "../../store";
import { toast } from 'sonner'
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [reserror, setreserror] = useState(null)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email("Invalid Email").required("Required"),
            password: Yup.string().required("Password is required").min(8)
        }),
        onSubmit: async values => {

            try {
                dispatch(loadingactions.setLoading(true))
                const res = await axios.post(`${server}user/login`, {
                    email: values.email,
                    password: values.password
                },
                    {
                        withCredentials: true,
                    })

                localStorage.setItem('token', res.data.message);

                if (res.status === 200) {

                    dispatch(loadingactions.setLoading(false))
                    navigate("/")
                    toast.success('Login successfully', {
                        duration: 2000,
                    })
                }
                else {
                    alert(reserror)
                    setreserror(res.data.message)
                    alert(reserror)
                    toast.error(`${res.data.message}`, {
                        duration: 8000,
                    })
                    dispatch(loadingactions.setLoading(false))
                }
            } catch (error) {
                dispatch(loadingactions.setLoading(false))
                console.log(error)
            }
        }
    })

    return (
        <div className={styles.signuppage} >
            <div className={styles.signupPageBox}>

                <p>Login 
                    <small>Welcome Back!!!!</small>
                    {reserror && <small style={{color:"red",fontSize:"14px"}} >{reserror}</small>}
                </p>
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    sx={{
                        '& > :not(style)': { m: 1, width: '96%' },
                        input: { color: '#a0a0a9' }
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={Boolean(formik.errors.email)}
                        sx={{
                            "& .MuiInputLabel-root": { color: '#a0a0a9' },
                            "& .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "#a0a0a9" },

                            },
                            "&:hover .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "#a0a0a9" },
                            },
                            "&:active .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "#a0a0a9", color: "#a0a0a9" },
                            },
                            "&: .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "#a0a0a9" },
                            },
                        }}
                        id="outlined-basic" label="Enter Email" variant="outlined" />
                    <span>{formik.errors.email}</span>
                    <TextField
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={Boolean(formik.errors.password)}

                        sx={{
                            "& .MuiInputLabel-root": { color: '#a0a0a9' },
                            "& .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "#a0a0a9" },

                            },
                            "&:hover .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "#a0a0a9" },
                            },
                            "&:active .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "#a0a0a9", color: "#a0a0a9" },
                            },
                            "&: .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "#a0a0a9" },
                            },
                        }}
                        id="outlined-basic" label="Enter Password" variant="outlined" />
                    <span>{formik.errors.password}</span>
                    <div className={styles.signupaction}>

                        <button type='submit' >Submit</button>
                        <button className={styles.signup_button} >Reset</button>
                    </div>
                </Box>
            </div>

        </div >
    )
}

export default Login
