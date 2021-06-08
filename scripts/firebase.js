var firebaseConfig = {
  apiKey: "AIzaSyB0sqZ7RQ_isRrvJ97zDyiA7arwmyFX_n8",
  authDomain: "authenticationapp-a46db.firebaseapp.com",
  projectId: "authenticationapp-a46db",
  storageBucket: "authenticationapp-a46db.appspot.com",
  appId: "1:110783477421:web:7e155f6710bd986ea47824",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
db.settings({ timestampsInSnapshot: true, merge: true });