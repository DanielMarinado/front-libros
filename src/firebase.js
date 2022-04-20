
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDl_pQ8clefuzUh93ProGWVhvrNIvseQfI",
  authDomain: "client-react-20b62.firebaseapp.com",
  projectId: "client-react-20b62",
  storageBucket: "client-react-20b62.appspot.com",
  messagingSenderId: "227493129916",
  appId: "1:227493129916:web:926c0f73ce157c4e296ab9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();