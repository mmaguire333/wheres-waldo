import { initializeApp } from 'firebase/app';
import { collection, query, where, limit, orderBy, getDocs, addDoc, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA-8t4hhVFgPX-GDwG5bT-386vvK1Lkqyo",
    authDomain: "where-s-waldo-8e944.firebaseapp.com",
    projectId: "where-s-waldo-8e944",
    storageBucket: "where-s-waldo-8e944.appspot.com",
    messagingSenderId: "1030932198638",
    appId: "1:1030932198638:web:5fb1c0909cda2ccd546fff"
}

// Initalize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


async function getCharacterLocations(level) {
    let query;
    let characterLocations = [];

    switch(level) {
        case 1: 
            query = await getDocs(collection(db, 'Level One'));
            break;
        case 2:
            query = await getDocs(collection(db, 'Level Two'));
            break;
        case 3:
            query = await getDocs(collection(db, 'Level Three'));
            break;
        default:
            query = null;
    }
    
    query.forEach(doc => characterLocations.push(doc.data()));
    return characterLocations;
}

async function uploadUserScore(name, score, level) {
    try {
        await addDoc(collection(db, 'User Scores'), {
            level: level,
            name: name,
            score: score
        });
    } catch(e) {
        console.log('Error adding document: ', e);
    }
}

async function getHighScores(level) {
    let highScoresArray = [];
    let highScores;

    switch(level) {
        case 1:
            highScores = query(collection(db, 'User Scores'), where('level', '==', 1), orderBy('score'), limit(5));
            break;
        case 2:
            highScores = query(collection(db, 'User Scores'), where('level', '==', 2), orderBy('score'), limit(5));
            break;
        case 3:
            highScores = query(collection(db, 'User Scores'), where('level', '==', 3), orderBy('score'), limit(5));
            break;
        default:
            highScores = null;
            break;
    }

    const querySnapshot = await getDocs(highScores);
    querySnapshot.forEach(scoreDoc => highScoresArray.push(scoreDoc.data()));
    return highScoresArray
}

export { getCharacterLocations, uploadUserScore, getHighScores };