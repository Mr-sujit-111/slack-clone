import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: " ",
    appId: ""
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const colRef = collection(db, 'channels')

const GetData = async () => {
    let chennels = []

    getDocs(colRef)
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                chennels.push({ ...doc.data(), id: doc.id })
            })
            return chennels
        })
        .catch(err => {
            console.log(err.message)
        })
}


export { db, auth, provider, GetData } 