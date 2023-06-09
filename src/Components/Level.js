import { useState } from 'react';
import PopupList from './PopupList';
import levelOneImage from '../Assets/Level-Images/waldo-easy-level.png';
import levelTwoImage from '../Assets/Level-Images/waldo-beach-level.jpeg';
import levelThreeImage from '../Assets/Level-Images/find-the-fellowship.jpg';
import waldo from '../Assets/Characters/Waldo.jpg';
import odlaw from '../Assets/Characters/Odlaw.jpg';
import wizard from '../Assets/Characters/Wizard.jpg';
import gandalf from '../Assets/Characters/Gandalf.jpg'
import aragorn from '../Assets/Characters/Aragorn.jpg'
import boromir from '../Assets/Characters/Boromir.jpg'
import legolas from '../Assets/Characters/Legolas.jpg'
import gimli from '../Assets/Characters/Gimli.jpg'
import frodo from '../Assets/Characters/Frodo.jpg'
import sam from '../Assets/Characters/Sam.jpg'
import merry from '../Assets/Characters/Merry.jpg'
import pippin from '../Assets/Characters/Pippin.jpg'
import '../Styles/Level.css';

const Level = (props) => {
    let levelImageSrc;
    let characters = [];
    switch(props.level) {
        case 1:
            levelImageSrc = levelOneImage;
            characters = [{name: 'Waldo', charSrc: waldo}];
            break;
        case 2:
            levelImageSrc = levelTwoImage;
            characters = [
                {name: 'Waldo', charSrc: waldo},
                {name: 'Odlaw', charSrc: odlaw},
                {name: 'Wizard Whitebeard', charSrc: wizard}
            ];
            break;
        case 3:
            levelImageSrc = levelThreeImage;
            characters = [
                {name: 'Waldo', charSrc: waldo},
                {name: 'Gandalf', charSrc: gandalf},
                {name: 'Aragorn', charSrc: aragorn},
                {name: 'Boromir', charSrc: boromir},
                {name: 'Legolas', charSrc: legolas},
                {name: 'Gimli', charSrc: gimli},
                {name: 'Frodo', charSrc: frodo},
                {name: 'Sam', charSrc: sam},
                {name: 'Merry', charSrc: merry},
                {name: 'Pippin', charSrc: pippin}
            ];
            break;
        default: 
            levelImageSrc = "";
            characters = [];
            break;
    }

    const [listActive, setListActive] = useState(false);
    const [popupCoordinates, setPopupCoordinates] = useState({x: -1, y: -1});

    const toggleListActive = () => {
        if(listActive) {
            setListActive(false);
        } else {
            setListActive(true);
        }
    }

    const handleClick = (e) => {
        let imageRect = e.target.parentElement.getBoundingClientRect();
        setPopupCoordinates({x: e.clientX - imageRect.left - 100, y: e.clientY - imageRect.top - 30});
        toggleListActive();
    }

    return (
        <div className="Level">
            <div className="level-header">
                <div className="character-previews">
                    {characters.map((char) => {
                        return (
                            <img src={char.charSrc} alt={char.name} key={`level-${props.level}-${char.name}`} />
                        );
                    })}
                </div>
                <div className="timer"></div>
            </div>
            <div className="game-image-container">
                <img src={levelImageSrc} alt="Game Level" onClick={handleClick} />
                <PopupList active={listActive} coordinates={popupCoordinates} characters={characters}></PopupList>
            </div>
        </div>
    )
}

export default Level;