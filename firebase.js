import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD7twlCviftzft5sP4NeF7fd_oxURgmXFw",
  authDomain: "asdasdassa-bed4e.firebaseapp.com",
  databaseURL: "https://asdasdassa-bed4e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "asdasdassa-bed4e",
  storageBucket: "asdasdassa-bed4e.firebasestorage.app",
  messagingSenderId: "864125654757",
  appId: "1:864125654757:web:5eadf55382d980b2be260c"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);