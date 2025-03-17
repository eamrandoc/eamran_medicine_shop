// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfFLl-8UcRVxl-1UdLiINwi0Ceghx6l2o",
  authDomain: "eamran-medicine-shop.firebaseapp.com",
  projectId: "eamran-medicine-shop",
  storageBucket: "eamran-medicine-shop.firebasestorage.app",
  messagingSenderId: "363140079502",
  appId: "1:363140079502:web:305a8c2ca3c8c8238f8edf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);