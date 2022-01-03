
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAqk6Jp2JfSTtOEDibRxmLAIPA8IdL7YjM",
    authDomain: "mapbox-save-location.firebaseapp.com",
    projectId: "mapbox-save-location",
    storageBucket: "mapbox-save-location.appspot.com",
    messagingSenderId: "134061456816",
    appId: "1:134061456816:web:e876b1d43541fe39e36a75",
    measurementId: "G-P0LWYWXF3V"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)