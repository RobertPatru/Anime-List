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
    let name = document.querySelector('.anime-name-input').value;
    let genre = document.querySelector('.anime-genre-input').value;
    let episodes = document.querySelector('.anime-episodes-input').value;
    let imgURL = document.querySelector('.upload-anime-image-input').value;
    let description = document.querySelector('.anime-description-input').value;
    
    if (name != '' && genre != '' && episodes != '' && imgURL != '' && description) {
        addElements(name, genre, episodes, imgURL, description);
    }
    else {
        makeBorderRed();
    }

    e.preventDefault();
});

function addElements(name, genre, episodes, imgURL, description) {
    console.log(imgURL);
    // add elements into database
    addDoc(collectionReference, {
        name: name,
        genre: genre,
        episodes: episodes,
        image: imgURL,
        description: description
    })
        .then( () => {
            window.location.href = "/index.html";
        } );
}

function makeBorderRed() {
    document.querySelector('.anime-name-input').style.border = '3px red solid';
    document.querySelector('.anime-genre-input').style.border = '3px red solid';
    document.querySelector('.anime-episodes-input').style.border = '3px red solid';
    document.querySelector('.upload-anime-image-input').style.border = '3px red solid';
    document.querySelector('.anime-description-input').style.border = '3px red solid';

    setTimeout(() => {
        document.querySelector('.anime-name-input').style.border = 'none';
        document.querySelector('.anime-genre-input').style.border = 'none';
        document.querySelector('.anime-episodes-input').style.border = 'none';
        document.querySelector('.upload-anime-image-input').style.border = 'none';
        document.querySelector('.anime-description-input').style.border = 'none';
    }, 2000);
}

// // ---------------------------------------        ---------------------------------------       ---------------------------------------