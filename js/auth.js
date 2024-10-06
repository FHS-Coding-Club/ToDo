const firebaseConfig = {
  apiKey: "AIzaSyAcuHFxmXN6NzFo0NST8rJY8KsP_pw4QN4",
  authDomain: "to-do-list-6ee6d.firebaseapp.com",
  projectId: "to-do-list-6ee6d",
  storageBucket: "to-do-list-6ee6d.appspot.com",
  messagingSenderId: "508684253621",
  appId: "1:508684253621:web:60e7e0dc9dcfee2cd301fc",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

function signInWithGoogle() {
  return auth.signInWithPopup(provider);
}

function signUp(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

function logout() {
  return auth.signOut();
}

function onAuthStateChanged(callback) {
  return auth.onAuthStateChanged(callback);
}
