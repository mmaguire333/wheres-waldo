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
    // Set level image and a characters state array based on which level the user chooses to play
    let levelImageSrc;
    let charArray = []
    switch(props.level) {
        case 1:
            levelImageSrc = levelOneImage;
            charArray = [{name: 'Waldo', charSrc: waldo, discovered: false}];
            break;
        case 2:
            levelImageSrc = levelTwoImage;
            charArray = [
                {name: 'Waldo', charSrc: waldo, discovered: false},
                {name: 'Odlaw', charSrc: odlaw, discovered: false},
                {name: 'Wizard Whitebeard', charSrc: wizard, discovered: false}
            ];
            break;
        case 3:
            levelImageSrc = levelThreeImage;
            charArray = [
                {name: 'Gandalf', charSrc: gandalf, discovered: false},
                {name: 'Aragorn', charSrc: aragorn, discovered: false},
                {name: 'Boromir', charSrc: boromir, discovered: false},
                {name: 'Legolas', charSrc: legolas, discovered: false},
                {name: 'Gimli', charSrc: gimli, discovered: false},
                {name: 'Frodo', charSrc: frodo, discovered: false},
                {name: 'Sam', charSrc: sam, discovered: false},
                {name: 'Merry', charSrc: merry, discovered: false},
                {name: 'Pippin', charSrc: pippin, discovered: false}
            ];
            break;
        default: 
            levelImageSrc = "";
            charArray = [];
            break;
    }

    // Character state declaration goes here to prevent too many re-renders error
    const [characters, setCharacters] = useState(charArray);
    
    // State handlers for setting popup list active status, popup list coordinates, an imageRect object with info about width and length
    //of level image, and relative + actual coordinates for each character in the image
    const [listActive, setListActive] = useState(false);
    const [clickCoordinates, setClickCoordinates] = useState({x: -1, y: -1});
    const [popupCoordinates, setPopupCoordinates] = useState({x: -1, y: -1});
    const [imageRect, setImageRect] = useState({});
    const [relativeCoordinates, setRelativeCoordinates] = useState([]);
    const [coordinates, setCoordinates] = useState([]);

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

    
    const handleClick = (e) => {
        let vertOffset = document.documentElement.scrollTop;
        // clickCoordinates are relative to the level image
        setClickCoordinates({x: e.clientX - imageRect.left, y: e.clientY - imageRect.top + vertOffset});

        // popup coordinates are also relative to level image and then shifted so that the popup circle is centered around the click location
        setPopupCoordinates({x: e.clientX - imageRect.left - 100, y: e.clientY - imageRect.top - 25 + vertOffset});
        toggleListActive();
    }

    // If the coordinates of the selected character from the dropdown are close enough to users click coordinates then update characters discovered value
    const updateDiscoveredOnClick = (e) => {
        // Get characters name from dropdown list item DOM element and find coordinates based on name
        let clickedCharacterName = e.target.firstChild.textContent;
        let clickedCharacterCoordinates = coordinates.find(char => char.name === clickedCharacterName);

        // If character coordinates are within the displayed circle then update that charcter as being discovered
        if(Math.sqrt(Math.pow(clickCoordinates.x - clickedCharacterCoordinates.x, 2) + Math.pow(clickCoordinates.y - clickedCharacterCoordinates.y, 2)) <= 25) {
            setCharacters(characters.map((char) => {
                if(char.name === clickedCharacterName) {
                    return {name: char.name, charSrc: char.charSrc, discovered: true}
                } else {
                    return char;
                }
            }))
        }

        // TODO -- display success or failure message and make character preview images translucent on success

        // close list on selecting character
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
                <PopupList active={listActive} coordinates={popupCoordinates} characters={characters} updateDiscoveredOnClick={updateDiscoveredOnClick}></PopupList>
                <CharacterMarker markerCoordinates={coordinates} characters={characters}></CharacterMarker>
            </div>
        </div>
    )
}

export default Level;