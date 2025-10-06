// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
  import { getAuth} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDP9dK32C0gZsjJzdy3jta8l9a8Mhy9nNY",
    authDomain: "my-first-firebase-projec-9163a.firebaseapp.com",
    projectId: "my-first-firebase-projec-9163a",
    storageBucket: "my-first-firebase-projec-9163a.firebasestorage.appspot.com",
    messagingSenderId: "171568173328",
    appId: "1:171568173328:web:01d5b2ae3f6b71700a1595"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  export { auth };

   console.log(auth);