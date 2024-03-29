import styles from "./signup.module.css"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from "react";
import { useFormik } from "formik"
import * as Yup from 'yup'
const Signup = () => {

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
        onSubmit: values => {
            console.log('The form has been submitted', values);
        }
    })
    console.log(formik.errors)

    const [otpSection, setotpSection] = useState(false)
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
                                id="outlined-basic" label="Enter Name" variant="outlined" />
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

                                <button type="submit" >Submit</button>
                                <button className={styles.signup_button} >Reset</button>
                            </div>
                        </Box>
                    </div >
                    : <div className={styles.signupPageBox}>
                        <p>Verify OTP <br /> <small>OPT sent to nav22333@gmail.com</small> </p>
                        <Box
                            sx={{
                                '& > :not(style)': { m: 1, width: '96%' },
                                input: { color: '#a0a0a9' }
                            }}
                            noValidate
                            autoComplete="off"
                        >

                            <TextField
                                type="number"

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
                                id="outlined-basic" label="Enter OTP" variant="outlined" />
                            <div className={styles.signupaction}>

                                <button>Submit</button>
                                <button className={styles.signup_button} >Reset</button>
                            </div>
                        </Box>
                    </div>}
        </div >
    )
}

export default Signup
