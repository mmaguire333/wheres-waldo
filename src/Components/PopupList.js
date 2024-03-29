import '../Styles/PopupList.css';

const PopupList = (props) => {
    if(props.active) {
        return (
            <div className="PopupList" style={{left: props.coordinates.x, top: props.coordinates.y}}>
                <div className="circle"></div>
                <ul className="list" style={{transform: `translate(${props.offset}px, 0px)`}}>
                    {props.characters.map((char) => {
                        return (
                            <li key={char.name} onClick={() => props.updateDiscoveredOnClick(char.name)}>
                                <p>{char.name}</p>
                                <img src={char.charSrc} alt={char.name} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    } else {
        return null;
    }
}

export default PopupList;
