// import all firebase specific stuff here
// import { response } from 'express';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
// import all firestore specific stuff here
import { getFirestore, getDocs, addDoc, collection, query, where, doc, setDoc, deleteDoc, onSnapshot, query} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
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

// getDocs(collectionReference)
//     .then(response => {
//         let anime = [{}];

//         response.docs.map(element => {
//             anime.push({ ...element.data(), id: doc.id })
//         });

//         console.log(anime)
//     })
//     .catch((err) => {
//         console.log(err);
//     });


onSnapshot(collectionReference, (snapshot) => {
    let anime = [{}];

    snapshot.docs.map(element => {
        // anime.push({ ...element.data(), id: doc.id })

        anime.push({ ...element.data(), id: element.id})
    });

    console.log(anime)
});


function addElements() {
    // add elements into database
    addDoc(collectionReference, {
        name: "Zankyou no terror",
        impression: 'A fost bun, tata'
    })
        .then( () => {console.log('Element added')} );
}


function deleteElement() {
    const docRef = doc(db, 'anime', "The lements ID inside the collection");

    deleteDoc(docRef)
        .then( () => console.log('Element Deleted') );
}

function search() {
    // how to search through firestore
    const q = query(collectionReference, where('coloana in care sa caute', '==', 'chestie pe care s-o caute'));
}
