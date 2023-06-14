import '../Styles/CharacterMarker.css';

const CharacterMarker = (props) => {
    return (
        <div className="CharacterMarker">
            {props.characters.map((char) => {
                let charCoordinates = props.markerCoordinates.find(coord => coord.name === char.name);
                if(char.discovered === true) {
                    return <p key={char.name} style={{left: charCoordinates.x, top: charCoordinates.y}}>{char.name}</p>
                } else {
                    return null;
                }
            })}
        </div>
    )
}

export default  CharacterMarker;