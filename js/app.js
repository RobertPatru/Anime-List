// import all firebase specific stuff here
// import { response } from 'express';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
// import all firestore specific stuff here
import { getFirestore, collection, doc, deleteDoc, onSnapshot, updateDoc} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';


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

let anime = [];

// ---------------------------------------   ---------------------------------------     GET DATA FROM FIRESTORE       ---------------------------------------
function getDataFromFireStore() {
    onSnapshot(collectionReference, (snapshot) => {
        snapshot.docs.map(element => {   
            anime.push({ ...element.data(), id: element.id})
        });
        displayAnime(anime);
    });
}

// ---------------------------------------     ---------------------------------------   DISPLAY DATA FROM FIRESTORE IN FRONTEND      ---------------------------------------
async function displayAnime(animeList) {
    
    for (let i = 1; i < animeList.length; i++) {
        const animeContainer = document.createElement('div');
        animeContainer.classList.add('box', 'display-flex' ,'flex-column' ,'align-items-center', 'padding-20');
        animeContainer.innerHTML = `
            <img src="${animeList[i].image}" alt="anime picture" class="anime-img">
            <div class="title-and-chevron-container display-flex align-items-center">
                <p class="anime-title show-info details-button">${animeList[i].name}</p>
                <input type="hidden" value="${i}" class="index">
            </div>   
        `;

        animeContainer.querySelector('.details-button').addEventListener("click", (event) => {
            openDetails(animeContainer.querySelector('.index').value);
        })
 
        document.querySelector('.anime-list').append(animeContainer);
    }
    
}

// get data from firestore activates every time the DOM fnishes loading with all the dependencies
window.addEventListener('load', () => {
    getDataFromFireStore();
});

// ---------------------------------------    ---------------------------------------   REMOVE ALL ANIME FROM FRONTEND       ------------------------------------------------------------------------------
function removeAllAnimeFromFrontend() {
    document.querySelector('.anime-list').innerHTML = '';
}


// ---------------------------------------    ---------------------------------------   DELETE FUNCTIONS       ------------------------------------------------------------------------------
//         Delete anime from FRONTEND       ---------------------------------------
async function deleteAnime(animeID) {
    // delete the anime from Firestore
    await deleteElementFromFirestore(animeID);

    // close the anime information 
    document.querySelector('.anime-card-info').remove();

    location.reload();
}

//         Delete anime from FIRESTORE       ---------------------------------------
async function deleteElementFromFirestore(animeID) {
    animeID = animeID.toString();

    await deleteDoc(doc(db, "anime", animeID));
    console.log('delete from firesotre')
}

document.body.addEventListener('click', event => {
    if (event.target.classList.contains('delete-anime')) {

       // select the anime's ID (the id is redered in the DOM, but with display hidden)
       const animeID= document.querySelector('.anime-ID-firestore').value;
       deleteAnime(animeID);
    }
});

// ---------------------------------------    ---------------------------------------    SEARCH FOR ANIME      ------------------------------------------------------------------------------
//         Display the anime that match the selected "GENRE"       ---------------------------------------
const genreInput = document.querySelector('.genre-dropdown-menu');
genreInput.addEventListener('change', searchAnimeGenre);

function searchAnimeGenre() {
    searchForAnimeNameInput.value = '';

    if (genreInput.value == 'All') {
        removeAllAnimeFromFrontend();
        displayAnime(anime);
        return; // if the filter is set on "All" don't execute the code after this line
    }
    
    // "displayAnime function starts from i = 1. That's why matchingAnime[0] equals '' ";
    let matchingAnime = [''];

    for (let i = 1; i < anime.length; i++) {      
        if (anime[i].genre != undefined) {
            if (anime[i].genre.includes(genreInput.value)) {
                matchingAnime.push(anime[i]);
            }
        }
    }

    updateList(matchingAnime)
}

//         Display the anime that match the NAME       ---------------------------------------
const searchForAnimeNameInput = document.querySelector('.search-for-anime');

function searchAnimeName() {
    genreInput.value = 'All';

    let nameToSearchFor = new RegExp(searchForAnimeNameInput.value.toLowerCase());
    let matchingAnime = [''];


    for (let i = 1; i < anime.length; i++) {
       if(nameToSearchFor.test(anime[i].name.toLowerCase())) {
            matchingAnime.push(anime[i]);
       }
    }

    updateList(matchingAnime);
}

searchForAnimeNameInput.addEventListener('keyup', searchAnimeName);


// ---------------------------------------   ---------------------------------------     UPDATE (EDIT) ANIME       ---------------------------------------
document.body.addEventListener('click', event => {
    if (event.target.classList.contains('edit-anime')) {
      
       let animeName = document.querySelector('.anime-name').textContent.slice(6);
       let animeID = document.querySelector('.anime-ID-firestore').value;

       document.querySelector('.anime-card-info').innerHTML = `
            <h1 class="text-color-fff margin-Y-30">${animeName}</h1>
            <form class="form-to-edit-anime edit-form">
                <label for="name" class="anime-name-label">Anime Name</label>
                <input type="text" name="anime name" class="anime-name-input">

                <label for="anime genre" class="anime-genre-label">Anime Genre</label>
                <input type="text" name="anime gendre" class="anime-genre-input">

                <label for="number of episodes" class="anime-episodes-label">Episodes</label>
                <input type="number" name="episodes" class="anime-episodes-input">
                
                <label for="anime image" lass="upload-anime-image-label">Anime Image URL</label>
                <input type="text" name="upload anime image" class="upload-anime-image-input">

                <label for="anime description" class="anime-description-label">Anime Description</label>
                <textarea name="anime description" form="add anime" class="anime-description-input"></textarea>

                <input class="submit-btn update-anime" type="submit" value="UPDATE">
                <span class="close">X</span>
            </form>
       `;

       // I don't let the anime container to become grid
       document.querySelector('.anime-card-info').style.display = 'block';

       document.querySelector('.form-to-edit-anime').addEventListener('submit', event => { 
            let name = document.querySelector('.anime-name-input').value;
            let genre = document.querySelector('.anime-genre-input').value;
            let episodes = document.querySelector('.anime-episodes-input').value;
            let imgURL = document.querySelector('.upload-anime-image-input').value;
            let description = document.querySelector('.anime-description-input').value;
            
            if (name != '' && genre != '' && episodes != '' && imgURL != '' && description) {
                updateAnimeInFirestore(animeID, name, genre, episodes, imgURL, description);
            }
        
        
            document.querySelector('.anime-name-input').value = '';
            document.querySelector('.anime-genre-input').value = '';
            document.querySelector('.anime-episodes-input').value = '';
            document.querySelector('.upload-anime-image-input').value = '';
            document.querySelector('.anime-description-input').value = '';
       });
    }
});

async function updateAnimeInFirestore(animeID, name, genre, episodes, imgURL, description) {
    await updateDoc(doc(db, "anime", animeID), {
        name: name,
        genre: genre,
        episodes: episodes,
        image: imgURL,
        description: description
    });
    location.reload();
}

// ---------------------------------------     ---------------------------------------   Update the anime list based on the needs       ---------------------------------------
function updateList(animeArray) {
    removeAllAnimeFromFrontend();

    if(animeArray == '') {
        document.querySelector('.anime-list').innerHTML =  `
            <h1 class='no-anime-found'>No anime found.</h1>
        `;
    }

    displayAnime(animeArray);
}

// ---------------------------------------    ---------------------------------------    Open the details page when an anime is clicked       ---------------------------------------
function openDetails(i) {

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('anime-card-info');
    detailsContainer.innerHTML = `
        <img src="${anime[i].image}" alt="big anime img" class="big-anime-img">
        <h5 class="increase-font margin-Y-10 anime-name">${anime[i].name}</h5 class="increase-font">
        <h5 class="increase-font margin-Y-10 genre">Genre: ${anime[i].genre}</h5>
        <h5 class="increase-font margin-Y-10 episode">Episodes: ${anime[i].episodes}</h5>
        <p class="margin-Y-10 description">
            ${anime[i].description}
        </p>
        <div class="display-flex justify-content-space-between buttons-container">
            <button class="delete-anime">Delete</button>
            <button class="edit-anime">EDIT ANIME</button>
        </div>
        <span class="close">X</span>
        <input type="hidden" value="${anime[i].id}" class="anime-ID-firestore">
    `;

    document.querySelector('main').append(detailsContainer);
}

// ---------------------------------------    ---------------------------------------    Close the details page when "X" is clicked       ---------------------------------------
document.body.addEventListener('click', event => {
    if (event.target.classList.contains('close')) {
        document.querySelector('.anime-card-info').remove();
    }
});