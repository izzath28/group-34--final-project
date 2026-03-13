/**
 * SportSphere Firebase Configuration
 * 
 * Successfully connected to: sportspheredb
 */

// We use the modular SDK from CDN for easy deployment on GitHub Pages
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAelmX_eFQmrkeurAYVLuXYHbMxLw5U8lE",
  authDomain: "sportspheredb.firebaseapp.com",
  projectId: "sportspheredb",
  storageBucket: "sportspheredb.firebasestorage.app",
  messagingSenderId: "721881814765",
  appId: "1:721881814765:web:71813705c281283cc31ee4",
  measurementId: "G-8P2GK2SECD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

// Export as Global Object for non-module scripts
window.SS_FB = {
    auth, db, storage, googleProvider,
    methods: {
        signInWithPopup,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        onAuthStateChanged,
        signOut,
        collection,
        addDoc,
        getDocs,
        doc,
        setDoc,
        query,
        where,
        onSnapshot,
        ref,
        uploadBytes,
        getDownloadURL
    }
};

console.log("🔥 SportSphere Firebase Connected: sportspheredb");
