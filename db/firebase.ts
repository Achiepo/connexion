
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyB2Zt9a8-I7PfE6rI2S7lZaGxwBFikl_2I",
    authDomain: "application-227a4.firebaseapp.com",
    projectId: "application-227a4",
    storageBucket: "application-227a4.firebasestorage.app",
    messagingSenderId: "744875286250",
    appId: "1:744875286250:web:ccd40f2174074370df8193"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getFirestore(app)





