import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_API_Domain,
  projectId: process.env.REACT_APP_API_ProjectId,
  storageBucket: process.env.REACT_APP_API_StorageBucket,
  messagingSenderId: process.env.REACT_APP_API_MessagingSenderId,
  appId: process.env.REACT_APP_API_AppId,
  measurementId: process.env.REACT_APP_API_measurementId,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
