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


function getDataFromFireStore() {
    let id = 1;
    let anime = [{}];

    onSnapshot(collectionReference, (snapshot) => {
        snapshot.docs.map(element => {   
            anime.push({ ...element.data(), id: id++})
            
            // console.log(anime)
        });

    });

    displayAnime(anime);
    console.log(anime);
    console.log(anime.length);

}

async function displayAnime(animeList) {
    await animeList;
   
    // console.log(animeList.length)

    animeList.forEach( (element, index) => {
        const animeContainer = document.createElement('div');
        animeContainer.classList.add('box', 'display-flex' ,'flex-column' ,'align-items-center');

        animeContainer.innerHTML = `
            <img src="/img/6163d0d700a00.jpg" alt="" class="anime-img">
            <div class="title-and-chevron-container display-flex align-items-center">
                <p class="anime-title">${element.name}</p>
                <i class="fa-solid fa-chevron-down fas"></i>
            </div>   
        `;

        // console.log(animeContainer);

 
    } );
    
    // for (let i = 0; i < Object.keys(animeList).length; i++) {
    //     console.log(i);
    //     const animeContainer = document.createElement('div');
    //     animeContainer.classList.add('box', 'display-flex' ,'flex-column' ,'align-items-center');
    //     animeContainer.innerHTML = `
    //         <img src="/img/6163d0d700a00.jpg" alt="" class="anime-img">
    //         <div class="title-and-chevron-container display-flex align-items-center">
    //             <p class="anime-title">${animeList[i].name}</p>
    //             <i class="fa-solid fa-chevron-down fas"></i>
    //         </div>   
    //     `;

    //     console.log(animeContainer);
    // }
}

// get data from firestore activates every time the DOM fnishes loading with all the dependencies
window.addEventListener('load', () => {
    getDataFromFireStore();
});

// ---------------------------------------        ---------------------------------------       ---------------------------------------

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
