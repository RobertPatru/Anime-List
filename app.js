 // import all firebase specific stuff here
 import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js'
 // import all firestore specific stuff here
 import { getFirestore, getDocs, collection, query, where } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js'

 const firebaseConfig = {
     apiKey: "AIzaSyDkpMv8qx2ytXBeyOkWHahWTmpa7aaqXME",
     authDomain: "firestore-api-application.firebaseapp.com",
     projectId: "firestore-api-application",
     storageBucket: "firestore-api-application.appspot.com",
     messagingSenderId: "321604200648",
     appId: "1:321604200648:web:d90007a4a067cdff6d9dfd",
     measurementId: "G-1XHRZ775ZL"
 };

 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
 const animeRef = collection(db, "anime");

 const q = query(animeRef);
 
 const querySnapshot = await getDocs(q);
 querySnapshot.forEach((doc) => {
     //doc.data() is the object stored in the document
     //doc.id is the id of the document
     console.log(doc.id, " => ", doc.data());
 });