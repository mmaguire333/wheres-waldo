import '../Styles/MessagePopup.css';


const MessagePopup = (props) => {
    if(props.active) {
        return props.success ? <div className="MessagePopup"><p>You found {props.character}!</p></div>
                             : <div className="MessagePopup"><p>That's not {props.character}, try again!</p></div>
    } else {
        return null;
    }
}


export default MessagePopup;