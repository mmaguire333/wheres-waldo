import { useEffect, useState } from 'react';
import { getCharacterLocations } from '../firebase';
import PopupList from './PopupList';
import CharacterMarker from './CharacterMarker';
import MessagePopup from './MessagePopup';
import WinForm from './WinForm';
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
    
    // State handlers for dealing with the popup list, the level image, coordinates of various types, the popup message, the timer, and the win form
    const [listActive, setListActive] = useState(false);
    const [clickCoordinates, setClickCoordinates] = useState({x: -1, y: -1});
    const [popupCoordinates, setPopupCoordinates] = useState({x: -1, y: -1});
    const [popupOffset, setPopupOffset] = useState(0);
    const [imageRect, setImageRect] = useState({});
    const [relativeCoordinates, setRelativeCoordinates] = useState([]);
    const [coordinates, setCoordinates] = useState([]);
    const [messageActive, setMessageActive] = useState(false);
    const [discoveredCharacter, setDiscoveredCharacter] = useState('');
    const [messageSuccess, setMessageSuccess] = useState(false);
    const [timer, setTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [winFormActive, setWinFormActive] = useState(false);

    // We have to wait until image is loaded to set imageRect otherwise imageRect will contain incorrect values.
    // We can also set the inital character coordinates here as well.
    const handleImageLoad = () => {
        // Start the timer running
        setTimerRunning(true);

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

    // Handle the timer
    useEffect(() => {
        let intervalId;
        if(timerRunning) {
            intervalId = setInterval(() => {
                setTimer(prevTime => prevTime + 1);
            }, 1000)
        }

        return () => {
            clearInterval(intervalId);
        }
        
    }, [timerRunning]);

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
        // Handle offset due to scroling
        let vertOffset = document.documentElement.scrollTop;

        // Handle PopupList appearing off screen
        if(e.clientX - 100 < imageRect.left) {
            setPopupOffset(imageRect.left - (e.clientX - 100));
        } else if(e.clientX + 100 > imageRect.right) {
            setPopupOffset(-1 * (e.clientX + 100 - imageRect.right));
        } else {
            setPopupOffset(0);
        }

        // clickCoordinates are relative to the level image
        setClickCoordinates({x: e.clientX - imageRect.left, y: e.clientY - imageRect.top + vertOffset});

        // popup coordinates are also relative to level image and then shifted so that the popup circle is centered around the click location
        setPopupCoordinates({x: e.clientX - imageRect.left - 100, y: e.clientY - imageRect.top - 25 + vertOffset});
        toggleListActive();
    }

    // If the coordinates of the selected character from the dropdown are close enough to users click coordinates then update characters discovered value,
    // handle the popup message, and check for/handle win.
    const updateDiscoveredOnClick = (name) => {
        // Get characters coordinates based on name
        let clickedCharacterCoordinates = coordinates.find(char => char.name === name);

        // If character coordinates are within the displayed circle then update that charcter as being discovered
        if(Math.sqrt(Math.pow(clickCoordinates.x - clickedCharacterCoordinates.x, 2) + Math.pow(clickCoordinates.y - clickedCharacterCoordinates.y, 2)) <= 25) {
            setCharacters(characters.map((char) => {
                if(char.name === name) {
                    return {name: char.name, charSrc: char.charSrc, discovered: true}
                } else {
                    return char;
                }
            }));

            // Reduce character preview image opacity on being discovered
            document.querySelector(`.${name.replace(/\s+/g, '-').toLowerCase()}-image-preview`).style.opacity = 0.3;

            // Activate popup message with message for successfully finding character
            setMessageActive(true);
            setDiscoveredCharacter(name);
            setMessageSuccess(true);

            // Deactivate popup message after 3 seconds
            setTimeout(() => {
                setMessageActive(false)
            }, 2000);

            // If the user has discovered all the characters, stop the timer and activate the win form
            let undiscoveredCharacters = characters.filter(char => (char.name !== name) && (char.discovered === false));
            if(undiscoveredCharacters.length === 0) {
                setTimerRunning(false);
                setWinFormActive(true);
            }
        } else {
            // Activate popup message with message for unsuccesfully identifying character
            setMessageActive(true);
            setDiscoveredCharacter(name);
            setMessageSuccess(false);

            // Deactivate popup message after 3 seconds
            setTimeout(() => {
                setMessageActive(false)
            }, 2000);
        }

        // close list on selecting character
        toggleListActive();
    }

    return (
        <div className="Level">
            <MessagePopup active={messageActive} character={discoveredCharacter} success={messageSuccess}></MessagePopup>
            <WinForm active={winFormActive} score={timer} level={props.level}></WinForm>
            <div className="level-header">
                <div className="character-previews">
                    {characters.map((char) => {
                        return (
                            <img className={`${char.name.replace(/\s+/g, '-').toLowerCase()}-image-preview`} src={char.charSrc} alt={char.name} key={`level-${props.level}-${char.name}`} />
                        );
                    })}
                </div>
                <div className="timer">
                    <p className="timer-title">Time</p>
                    <p className="time-value">{timer >= 3600 ? `${Math.floor(timer / 3600)}:` : ''}{timer >= 60 ? `${Math.floor(timer / 60) % 60 < 10 ? `0${Math.floor(timer / 60) % 60}` : Math.floor(timer / 60) % 60}:` : ''}{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
                </div>
            </div>
            <div className="game-image-container">
                <img src={levelImageSrc} alt="Game Level" onClick={handleClick} onLoad={handleImageLoad} />
                <PopupList active={listActive} coordinates={popupCoordinates} offset={popupOffset} characters={characters} updateDiscoveredOnClick={updateDiscoveredOnClick}></PopupList>
                <CharacterMarker markerCoordinates={coordinates} characters={characters}></CharacterMarker>
            </div>
        </div>
    )
}

export default Level;