import levelOneImage from '../Assets/Level-Images/level-one-preview.png';
import levelTwoImage from '../Assets/Level-Images/level-two-preview.jpeg';
import levelThreeImage from '../Assets/Level-Images/level-three-preview.jpg';
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
import '../Styles/LevelCard.css';

const LevelCard = (props) => {
    let imageSrc;
    let difficulty;
    let difficultyColor;
    let title;
    let characters = [];
    switch(props.level) {
        case 1:
            imageSrc = levelOneImage;
            difficulty = 'Easy';
            difficultyColor = 'green';
            title = 'Classic Waldo';
            characters = [{name: 'Waldo', charSrc: waldo}];
            break;
        case 2: 
            imageSrc = levelTwoImage;
            difficulty = 'Hard';
            difficultyColor = 'orange';
            title = 'Waldo at the Beach';
            characters = [
                {name: 'Waldo', charSrc: waldo},
                {name: 'Odlaw', charSrc: odlaw},
                {name: 'Wizard Whitebeard', charSrc: wizard}
            ];
            break;
        case 3:
            imageSrc = levelThreeImage;
            difficulty = 'Very Hard';
            difficultyColor = 'red';
            title = 'Lord of the Rings Edition';
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
            imageSrc = '';
            difficulty = '';
            difficultyColor = 'black';
            title = '';
            characters = [];
            break;
    }


    return (
        <div className="LevelCard">
            <h2>{title}</h2>
            <img className="card-image" src={imageSrc} alt="Level Preview" />
            <div className="level-info">
                <h3>Level {props.level}</h3>
                <h3 style={{color: `${difficultyColor}`}}>{difficulty}</h3>
            </div>
            <h3 className="character-title">Characters:</h3>
            <div className="characters">
                {characters.map((char) => {
                    return (
                        <div className="character-container" key={`level-${props.level}-${char.name}`}>
                            <img src={char.charSrc} alt={char.name} />
                        </div>
                        
                    );
                })}
            </div>
        </div>
    );
}

export default LevelCard;