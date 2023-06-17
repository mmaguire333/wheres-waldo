import { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import '../Styles/Leaderboard.css';
import { getHighScores } from '../firebase';

const Leaderboard = (props) => {
    let title;
    switch(props.level) {
        case 1:
            title = 'Classic Waldo';
            break;
        case 2:
            title = 'Waldo at the Beach';
            break;
        case 3:
            title = 'Lord of the Ring Edition';
            break;
        default:
            title = '';
            break;
    }

    // State containing high scores fetched from firestore database
    const [highScores, setHighScores] = useState([]);

    // Fetch the high scores from the database
    useEffect(() => {
        const fetchScores = async() => {
            let scoresData = await getHighScores(props.level);
            setHighScores(scoresData)
        }

        fetchScores();
    }, [props.level]);

    return (
        <div className="Leaderboard">
            <h2>{title} Leaderboard</h2>
            <ol className="leader-list">
                {highScores.map((scoreItem) => {
                    return (
                        <li key={uniqid()}>
                            <p>Name: {scoreItem.name}</p>
                            <p>Score: {scoreItem.score}</p>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}

export default Leaderboard;