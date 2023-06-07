import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="Navbar">
            <h1>Where's Waldo</h1>
            <Link to="/"><button type="button">Home</button></Link>
        </div>
    )
}

export default Navbar;