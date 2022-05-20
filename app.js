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

let anime = [{}];




// ---------------------------------------        Get and Display data from Firestore       ---------------------------------------

function getDataFromFireStore() {
    let id = 1;

    onSnapshot(collectionReference, (snapshot) => {
        snapshot.docs.map(element => {   
            anime.push({ ...element.data(), id: id++})
            
            // console.log(anime)
        });
        displayAnime(anime);
    });
}

async function displayAnime(animeList) {
    await animeList;
   
    // console.log(animeList.length)

    // animeList.forEach( (element, index) => {
    //     const animeContainer = document.createElement('div');
    //     animeContainer.classList.add('box', 'display-flex' ,'flex-column' ,'align-items-center');

    //     animeContainer.innerHTML = `
    //         <img src="/img/6163d0d700a00.jpg" alt="" class="anime-img">
    //         <div class="title-and-chevron-container display-flex align-items-center">
    //             <p class="anime-title">${element.name}</p>
    //             <i class="fa-solid fa-chevron-down fas"></i>
    //         </div>   
    //     `;

    //     // console.log(animeContainer);

 
    // } );
    
    for (let i = 1; i < animeList.length; i++) {
        const animeContainer = document.createElement('div');
        animeContainer.classList.add('box', 'display-flex' ,'flex-column' ,'align-items-center', 'padding-20');
        animeContainer.innerHTML = `
            <img src="${animeList[i].image}" alt="anime picture" class="anime-img">
            <div class="title-and-chevron-container display-flex align-items-center">
                <p class="anime-title show-info">${animeList[i].name}</p>
            
            </div>   
        `;
        console.log(animeList[i].image);
        document.querySelector('.anime-list').append(animeContainer);
    }
}

// get data from firestore activates every time the DOM fnishes loading with all the dependencies
window.addEventListener('load', () => {
    getDataFromFireStore();
});



// ---------------------------------------        ---------------------------------------       ---------------------------------------

function deleteElement() {
    const docRef = doc(db, 'anime', "The lements ID inside the collection");

    deleteDoc(docRef)
        .then( () => console.log('Element Deleted') );
}

function search() {
    // how to search through firestore
    const q = query(collectionReference, where('coloana in care sa caute', '==', 'chestie pe care s-o caute'));
}




// ---------------------------------------        Open the details page when an anime is clicked       ---------------------------------------
function openDetails(name) {
    for (let i = 1; i < anime.length; i++) {
        if(anime[i].name == name) {
            const detailsContainer = document.createElement('div');
            detailsContainer.classList.add('anime-card-info');

            detailsContainer.innerHTML = `
                <img src="${anime[i].image}" alt="big anime img" class="big-anime-img">
                <h5 class="increase-font margin-Y-10">Name: ${anime[i].name}</h5 class="increase-font">
                <h5 class="increase-font margin-Y-10">Genre: ${anime[i].genre}</h5>
                <h5 class="increase-font margin-Y-10">Episodes: ${anime[i].episodes}</h5>
                <p class="increase-font margin-Y-10">
                    ${anime[i].description}
                </p>
                <span class="close">X</span>
            `;

            document.querySelector('main').append(detailsContainer);
        }
    }
}

document.body.addEventListener('click', event => {
    if (event.target.classList.contains('show-info')) {
        console.log(event.target.textContent);
        openDetails(event.target.textContent);
    }
});




// ---------------------------------------        Close the details page when "X" is clicked       ---------------------------------------
document.body.addEventListener('click', event => {
    if (event.target.classList.contains('close')) {
        document.querySelector('.anime-card-info').remove();
    }
});