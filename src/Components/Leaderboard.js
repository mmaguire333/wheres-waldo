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
            title = 'Lord of the Rings Edition';
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
            <ul className="leader-list">
                {highScores.map((scoreItem, index) => {
                    return (
                        <li key={uniqid()}>
                            <p>{index + 1}.</p>
                            <div className="score-item">
                                <p>{scoreItem.name}</p>
                                <p>
                                    {Math.floor(scoreItem.score / 3600) > 0 ? `${Math.floor(scoreItem.score / 3600)}:` : ''}
                                            {Math.floor(scoreItem.score / 3600) > 0 && Math.floor(scoreItem.score / 60) < 10 ? `0${Math.floor(scoreItem.score / 60)}` : Math.floor(scoreItem.score / 60)}
                                            :{scoreItem.score % 60 < 10 ? `0${scoreItem.score % 60}` : scoreItem.score % 60}
                                </p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Leaderboard;