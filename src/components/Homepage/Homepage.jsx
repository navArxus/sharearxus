import styles from "./Homepage.module.css"
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Homepage = () => {
    return (
        <div className={styles.HomepageCont} >
            <h1>Collab and share code real time</h1>
            <p>Share your Java , Javascript , Python and many more code to others </p>
            <p>Collaborate with real time sharing and user management</p>
            <div className={styles.HomepageContButton}>
                <Link to="/getstarted" >
                    <button className={styles.getstarted} >Get Started <FaArrowRightLong color="#fafafa" /></button>
                </Link>
                <button className={styles.learnmore} >Learn More</button>
            </div>
        </div>
    )
}

export default Homepage
