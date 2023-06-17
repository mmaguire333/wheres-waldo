import { Link } from "react-router-dom";
import LevelCard from "./LevelCard";
import '../Styles/Home.css';
import Leaderboard from "./Leaderboard";

const Home = () => {
    return (
        <div className="Home">
            <div className="level-container">
                <Link className="link" to="/level-one">
                    <LevelCard level={1}></LevelCard>
                </Link>
                <Link className="link" to="/level-two">
                    <LevelCard level={2}></LevelCard>
                </Link>
                <Link className="link" to="/level-three">
                    <LevelCard level={3}></LevelCard>
                </Link>
            </div>
            <div className="leaderboards-container">
                <Leaderboard level={1}></Leaderboard>
                <Leaderboard level={2}></Leaderboard>
                <Leaderboard level={3}></Leaderboard>
            </div>
        </div>
    )
}

export default Home;