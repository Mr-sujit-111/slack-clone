import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { collection, doc, deleteDoc, getDocs } from "firebase/firestore";



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


// const AddData = async (name) => {
//     const docRef = await addDoc(collection(db, "channels"), {
//         c_name: name
//     });
//     console.log(`Document written with ID:  ${docRef.id} and  data : ${name}`);
// }

const DeleteData = async (id) => {
    try {
        await deleteDoc(doc(db, "channels", id));
        return console.log('deleted')
    } catch (error) {
        return console.log('false', error.message)
    }
}

const GetData = async () => {
    let chennels = []

    getDocs(colRef)
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                chennels.push({ ...doc.data(), id: doc.id })
            })
            console.log(chennels)
            return chennels
        })
        .catch(err => {
            console.log(err.message)
        })
}



export { db, auth, provider, DeleteData, GetData } 