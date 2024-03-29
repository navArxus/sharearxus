import styles from "../Signup/signup.module.css"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
const Login = () => {
    return (
        <div className={styles.signuppage} >
                <div className={styles.signupPageBox}>

                    <p>Login <br />
                        <small>Welcome Back!!!!</small>
                    </p>
                    <Box
                        sx={{
                            '& > :not(style)': { m: 1, width: '96%' },
                            input: { color: '#a0a0a9' }
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            type="email"
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
                        <TextField
                            type="password"

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
                        <div className={styles.signupaction}>

                            <button>Submit</button>
                            <button className={styles.signup_button} >Reset</button>
                        </div>
                    </Box>
                </div>
                
        </div >
    )
}

export default Login
