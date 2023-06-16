import '../Styles/WinForm.css'


const WinForm = (props) => {
    const handleSubmit = (e) => {

    }

    if(props.active) {
        return (
            <div className="WinForm">
                <form>
                    <div className="win-message">
                        <h2>You Won!</h2>
                        <p>Enter your name to save your score.</p>
                    </div>
                    <input type="text" id="name-input" placeholder="Your Name" required></input>
                    <button type="button" id="submit-button" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        )
    } else {
        return null;
    }
}

export default WinForm;