// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtivy1hSyvZFsl2w4a7eyjO5cqggz_2jg",
  authDomain: "al-quran-e9d05.firebaseapp.com",
  projectId: "al-quran-e9d05",
  storageBucket: "al-quran-e9d05.appspot.com",
  messagingSenderId: "167135663635",
  appId: "1:167135663635:web:3c0cbca2293f117dc951e6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
