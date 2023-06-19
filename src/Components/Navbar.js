import { Link } from "react-router-dom";
import waldoHead from '../Assets/Characters/waldo-head.png';
import '../Styles/Navbar.css';

const Navbar = () => {
    return (
        <div className="Navbar">
            <div className="container-left">
                <h1>Where's Waldo</h1>
                <img id="waldo-nav-image" src={waldoHead} alt=""/>
            </div>
            <Link to="/"><button className="home-button" type="button">Home</button></Link>
        </div>
    )
}

export default Navbar;