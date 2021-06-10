import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBWf1CkYNWifPNprjPtwc2Gfdk-Z42gE0w",
    authDomain: "olx-clone-0015.firebaseapp.com",
    projectId: "olx-clone-0015",
    storageBucket: "olx-clone-0015.appspot.com",
    messagingSenderId: "674644569711",
    appId: "1:674644569711:web:a1e953b9eff89577f7a79a",
    measurementId: "G-38RS4PP549"
  };

export default firebase.initializeApp(firebaseConfig)  