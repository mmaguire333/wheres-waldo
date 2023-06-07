const firebaseConfig = {
    apiKey: "AIzaSyA-8t4hhVFgPX-GDwG5bT-386vvK1Lkqyo",
    authDomain: "where-s-waldo-8e944.firebaseapp.com",
    projectId: "where-s-waldo-8e944",
    storageBucket: "where-s-waldo-8e944.appspot.com",
    messagingSenderId: "1030932198638",
    appId: "1:1030932198638:web:5fb1c0909cda2ccd546fff"
}

export function getFirebaseConfig() {
    if (!firebaseConfig || !firebaseConfig.apiKey) {
        throw new Error('No Firebase configuration object provided.' + '\n' +
        'Add your web app\'s configuration object to firebase-config.js');
      } else {
        return firebaseConfig;
      }
}