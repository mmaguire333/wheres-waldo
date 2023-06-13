import '../Styles/CharacterMarker.css';

const CharacterMarker = (props) => {
    return (
        <div className="CharacterMarker">
            {props.markers.map((marker) => {
                // Move over Sam's Marker so it doesent overlap Frodo. We do this here so that Sam's actual coordinates data remains unchanged
                if(marker.name === 'Sam') {
                    return <p key={marker.name} style={{left: marker.x - 20, top: marker.y}}>{marker.name}</p>
                } else {
                    return <p key={marker.name} style={{left: marker.x, top: marker.y}}>{marker.name}</p>
                }
            })}
        </div>
    )
}

export default  CharacterMarker;