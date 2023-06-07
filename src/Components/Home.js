import { Link } from "react-router-dom";
import LevelCard from "./LevelCard";

const Home = () => {
    return (
        <div className="Home">
            <div className="level-container">
                <Link to="/level-one">
                    <LevelCard></LevelCard>
                </Link>
                <Link to="/level-two">
                    <LevelCard></LevelCard>
                </Link>
                <Link to="/level-three">
                    <LevelCard></LevelCard>
                </Link>
            </div>
        </div>
    )
}

export default Home;