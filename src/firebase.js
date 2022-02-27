import firebase from "firebase/app";
import "firebase/database";

const config = {
 apiKey: "AIzaSyBHAkcg_iZXALPgXDhPX_2D2c82K2XVLms",
  authDomain: "recipes-7b1be.firebaseapp.com",
  projectId: "recipes-7b1be",
  storageBucket: "recipes-7b1be.appspot.com",
  messagingSenderId: "721822125917",
  appId: "1:721822125917:web:667b2eec442533f3c522b4"
};
firebase.initializeApp(config);

export default firebase.database();
