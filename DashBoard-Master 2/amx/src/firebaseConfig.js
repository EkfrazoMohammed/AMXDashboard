



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
// const app = initializeApp ({
//     apiKey: "AIzaSyBlwyBgM5U0fkTicW15FiR0hLmYxnZAIg4",
//     authDomain: "amxstorage.firebaseapp.com",
//     projectId: "amxstorage",
//     storageBucket: "amxstorage.appspot.com",
//     messagingSenderId: "213632626347",
//     appId: "1:213632626347:web:64af10e54d6d0961f2d1ee",
//     measurementId: "G-T3BZCQDB7T"
// });
const app = initializeApp ({
    apiKey: "AIzaSyDBfw5KNTVYjdxMHD-Jzo9UNw9WXvvo2U8",
  authDomain: "amxdrones-70b8a.firebaseapp.com",
  projectId: "amxdrones-70b8a",
  storageBucket: "amxdrones-70b8a.appspot.com",
  messagingSenderId: "822566004314",
  appId: "1:822566004314:web:4ce884df3a23ea2cdf1a63",
  measurementId: "G-G9G64NE0EL"
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;