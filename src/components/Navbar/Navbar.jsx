import styles from "./Navbar.module.css"
import { NavLink } from "react-router-dom"
import { FaGithub } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav>
      <div className={styles.nav_left}>
        <h2>
          <NavLink to="/" >Share ARXUS</NavLink>
        </h2>
        <p>Developed By : Nav (ARXUS)</p>
      </div>
      <div className={styles.nav_right}>
        <NavLink to='/docs'> Docs </NavLink>
        <NavLink  ><FaGithub size={'22px'} className={styles.githubicons} /></NavLink>
        {
          localStorage.getItem("token") ? (<button>Logout</button>) : (
            <>
              <NavLink to='signup' ><button className={styles.signup_button}  >Signup</button></NavLink>
              <NavLink to="/login" ><button>Login</button></NavLink>
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar
