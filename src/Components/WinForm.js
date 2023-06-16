import { useNavigate } from 'react-router-dom';
import '../Styles/WinForm.css'
import { uploadUserScore } from '../firebase';

const WinForm = (props) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        uploadUserScore(document.getElementById('name-input').value, props.score, props.level);
        navigate("/");
    }

    if(props.active) {
        return (
            <div className="WinForm">
                <form onSubmit={handleSubmit}>
                    <div className="win-message">
                        <h2>You Won!</h2>
                        <p>Enter your name to save your score.</p>
                    </div>
                    <input type="text" id="name-input" placeholder="Your Name" required></input>
                    <button type="submit" id="submit-button">Submit</button>
                </form>
            </div>
        )
    } else {
        return null;
    }
}

export default WinForm;