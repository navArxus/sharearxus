import styles from "./signup.module.css"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from "react";
import { useFormik } from "formik"
import * as Yup from 'yup'
import axios from "axios";
import server from "../../server/url";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { loadingactions } from "../../store";
const Signup = () => {

    const [otpSection, setotpSection] = useState(false)
    const [emailforverification, setemailforverification] = useState("")
    const [emailforverificationerror, setemailforverificationrerror] = useState("")
    const [otp, setotp] = useState("")
    const  navigate = useNavigate()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            firstName: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string()
                .min(2, "Too Short!")
                .max(50, "Too Long!").required("Required"),
            email: Yup.string().email("Invalid Email").required("Required"),
            password: Yup.string().required("Password is required").min(8)
        }),
        onSubmit: async values => {
            try {
                dispatch(loadingactions.setLoading(true))
                const res = await axios.post(`${server}user/signup`, {
                    firstName: values.firstName,
                    email: values.email,
                    password: values.password
                })
                console.log(res)
            } catch (error) {
                dispatch(loadingactions.setLoading(false))
                console.log(error)
            }
            setemailforverification(values.email);
            setotpSection(!otpSection)
            dispatch(loadingactions.setLoading(false))
        }
    })
    const verifyOtp = async () => {
        if (otp === " ") {
            setemailforverificationrerror("Please provide OTP")
        } else {
            console.log(emailforverification, otp)
            dispatch(loadingactions.setLoading(true))
            try {
                const res = await axios.post(`${server}user/verifyotp`, {
                    email: emailforverification,
                    otp: otp
                })
                console.log(res)
                if (res.status === 200) {
                    dispatch(loadingactions.setLoading(false))
                    navigate("/login")
                }
            } catch (error) {
                dispatch(loadingactions.setLoading(false))
                console.log(error)
            }
        }
    }

    return (
        <div className={styles.signuppage} >
            {
                !otpSection ?
                    <div className={styles.signupPageBox
                    } >

                        <p>Signup <br />
                            <small>Signup to save the progress</small>
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
                                name="firstName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                                error={Boolean(formik.errors.firstName)}
                                sx={{
                                    "& .MuiInputLabel-root": { color: '#a0a0a9' },
                                    "& .MuiOutlinedInput-root": {
                                        "& > fieldset": { borderColor: "#a0a0a9" },

                                    },
                                    "&:hover .MuiOutlinedInput-root": {
                                        "& > fieldset": { borderColor: "#a0a0a9" },
                                    },
                                    "&:active .MuiOutlinedInput-root": {
                                        "& > fieldset": { borderColor: "#a0a0a9" },
                                    },
                                    "&: .MuiOutlinedInput-root": {
                                        "& > fieldset": { borderColor: "#a0a0a9" },
                                    },
                                }}
                                label="Enter Name" variant="outlined" />
                            <span>{formik.errors.firstName}</span>
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
                                label="Enter Email" variant="outlined" />
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
                                label="Enter Password" variant="outlined" />
                            <span>{formik.errors.password}</span>
                            <div className={styles.signupaction}>

                                <button type="submit" >Submit</button>
                                <button className={styles.signup_button} >Reset</button>
                            </div>
                        </Box>
                    </div >
                    : <div className={styles.signupPageBox}>
                        <p>Verify OTP <br /> <small>OPT sent to {emailforverification}</small> </p>
                        <Box
                            sx={{
                                '& > :not(style)': { m: 1, width: '96%' },
                                input: { color: '#a0a0a9' }
                            }}
                            noValidate
                            autoComplete="off"
                        >

                            <TextField
                                type="text"
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
                                label="Enter OTP" variant="outlined"
                                onChange={e => setotp(e.target.value)} />
                            <div className={styles.signupaction}>
                                {emailforverificationerror && <p style={{ color: "red" }}>{emailforverificationerror}</p>}
                                <button onClick={verifyOtp} >Submit</button>
                                <button className={styles.signup_button} >Reset</button>
                            </div>
                        </Box>
                    </div>}
        </div >
    )
}

export default Signup
