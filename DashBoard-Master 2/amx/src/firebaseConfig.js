



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBlwyBgM5U0fkTicW15FiR0hLmYxnZAIg4",
//   authDomain: "amxstorage.firebaseapp.com",
//   projectId: "amxstorage",
//   storageBucket: "amxstorage.appspot.com",
//   messagingSenderId: "213632626347",
//   appId: "1:213632626347:web:64af10e54d6d0961f2d1ee",
//   measurementId: "G-T3BZCQDB7T"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const storage = getStorage(firebaseConfig);
// export default storage;


import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyBlwyBgM5U0fkTicW15FiR0hLmYxnZAIg4",
    authDomain: "amxstorage.firebaseapp.com",
    projectId: "amxstorage",
    storageBucket: "amxstorage.appspot.com",
    messagingSenderId: "213632626347",
    appId: "1:213632626347:web:64af10e54d6d0961f2d1ee",
    measurementId: "G-T3BZCQDB7T"
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;