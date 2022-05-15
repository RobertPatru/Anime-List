// import all firebase specific stuff here
// import { response } from 'express';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
// import all firestore specific stuff here
import { getFirestore, getDocs, addDoc, collection, where, doc, setDoc, deleteDoc, onSnapshot, query} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
//  import { doc, setDoc } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyDkpMv8qx2ytXBeyOkWHahWTmpa7aaqXME",
    authDomain: "firestore-api-application.firebaseapp.com",
    projectId: "firestore-api-application",
    storageBucket: "firestore-api-application.appspot.com",
    messagingSenderId: "321604200648",
    appId: "1:321604200648:web:d90007a4a067cdff6d9dfd",
    measurementId: "G-1XHRZ775ZL"
};

initializeApp(firebaseConfig);
const db = getFirestore();
const collectionReference = collection(db, 'anime');

// ---------------------------------------        Add data to Firestore       ---------------------------------------

document.querySelector('.form-to-add-anime').addEventListener('submit', e => {
    const name = document.querySelector('.anime-name-input').value;
    const genre = document.querySelector('.anime-genre-input').value;
    const episodes = document.querySelector('.anime-episodes-input').value;
    const imgURL = document.querySelector('.upload-anime-image-input').value;
    const description = document.querySelector('.anime-description-input').value;
    

    addElements(name, genre, episodes, imgURL, description);


    name = '';
    genre = '';
    episodes = '';
    imgURL = '';
    description = '';

    e.preventDefault();
});

function addElements(name, genre, episodes, imgURL, description) {
    // add elements into database
    addDoc(collectionReference, {
        name: name,
        genre: genre,
        episodes: episodes,
        imgage: imgURL,
        description: description
    })
        .then( () => {console.log('Element added')} );
}

// ---------------------------------------        ---------------------------------------       ---------------------------------------

console.log('MEGE?');