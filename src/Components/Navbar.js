import { Link } from "react-router-dom";
import '../Styles/Navbar.css';

const Navbar = () => {
    return (
        <div className="Navbar">
            <h1>Where's Waldo</h1>
            <Link to="/"><button className="home-button" type="button">Home</button></Link>
        </div>
    )
}

export default Navbar;