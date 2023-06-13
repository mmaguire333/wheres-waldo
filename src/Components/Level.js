import { useEffect, useState } from 'react';
import { getCharacterLocations } from '../firebase';
import PopupList from './PopupList';
import CharacterMarker from './CharacterMarker';
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
    // Set level and character images based on which level the user chooses to play
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

    // State handlers for setting popup list active status, popup list coordinates, an imageRect object with info about width and length
    //of level image, and relative + actual coordinates for each character in the image
    const [listActive, setListActive] = useState(false);
    const [popupCoordinates, setPopupCoordinates] = useState({x: -1, y: -1});
    const [imageRect, setImageRect] = useState({});
    const [relativeCoordinates, setRelativeCoordinates] = useState([]);
    const [coordinates, setCoordinates] = useState([]);

    // Update imageRect and actual coordinates when level image changes size.
    useEffect(() => {
        // reset imageRect when window resizes
        const handleResize = () => {
            let rect = document.querySelector('.game-image-container').getBoundingClientRect();
            setImageRect(rect);

            let newActualCoordinates = [];
            relativeCoordinates.forEach(elem => {
                newActualCoordinates.push({
                    name: elem.name,
                    x: elem.x * rect.width,
                    y: elem.y * rect.height
                });
            });

            setCoordinates(newActualCoordinates);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })    

    // Toggle the popupList -- to be used inside click handler
    const toggleListActive = () => {
        if(listActive) {
            setListActive(false);
        } else {
            setListActive(true);
        }
    }

    // We have to wait until image is loaded to set imageRect otherwise imageRect will contain incorrect values.
    // We can also set the inital character coordinates here as well.
    const handleImageLoad = () => {
        // Set DOMRect
        let rect = document.querySelector('.game-image-container').getBoundingClientRect();
        setImageRect(rect);

        // Get character coordinates from the database and convert them to the correct values based on the current image size
        getCharacterLocations(props.level).then(result => {
            let newCoordinates = [];

            result.forEach(elem => {
                newCoordinates.push({
                    name: elem.name,
                    x: elem.x * rect.width,
                    y: elem.y * rect.height
                });
            });

            // set both relative and acutal coordinates since relative coordinates will be used when updating coordinates on resize
            setRelativeCoordinates(result);
            setCoordinates(newCoordinates);
        })
    }

    const handleClick = (e) => {
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
                <img src={levelImageSrc} alt="Game Level" onClick={handleClick} onLoad={handleImageLoad} />
                <PopupList active={listActive} coordinates={popupCoordinates} characters={characters}></PopupList>
                <CharacterMarker markers={coordinates}></CharacterMarker>
            </div>
        </div>
    )
}

export default Level;