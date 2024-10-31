### 1. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project (or use an existing one).
3. Navigate to **Project Settings > General > Your Apps**, and add a new web app.
4. Firebase will give you a configuration snippet, which you’ll add to your HTML.

### 2. Enable Firebase Authentication

1. In the Firebase Console, go to **Authentication > Sign-in method**.
2. Enable **Email/Password** under "Sign-in providers."

### 3. Structure Your HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Firebase Auth Example</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Put all of your html here -->

  <!-- These are the firebase imports. All this is doing is esentially letting you contact firebase and make it so you can enter data in. -->
  <!-- Firebase Scripts -->
  <script src="https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"></script>

  <!-- Use this tag to link your javascript file-->
  <script src="app.js"></script>
</body>
</html>
```

### 5. Configure Firebase and Implement Authentication (This is inside the auth.js)

Replace the Firebase config object with the credentials provided in your Firebase console.

```javascript
// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGE_ID",
    appId: "YOUR_APP_ID"
};

```
Here you are creating a variable that represents your firebase configuration. This is where you will put all of the sensitive information that firebase gives you.
This config variable is responsible for linking your firebase account so you can make changes to it. REMEMBER, NEVER SHARE THIS INFORMATION WITH ANYONE!!!!

After you initialize your connection to firebase (firebaseConfig variable), you need to send this config to firebase. This is why we do the:
```javascript
firebase.initializeApp(firebaseConfig);
```

At this point the connection to firebase is completed... Congrats!

The next step is to implement the actual authentication. To be able to access firebase authentication functions, you need to write this line of code:
```javascript
const auth = firebase.auth();
```
This line of code gives you access to the authentication that you setup in firebase earlier in this tutorial. We will see its uses later on.

### Write Authentication Functions (This is inside the auth.js)

The next step is to write some convenience functions so that we can avoid repeating code. If you are unfamiliar with functions in javascript, please refer to this: [Functions](https://www.w3schools.com/js/js_functions.asp).

First lets write a signUp function to facilitate the user signing in with their email and password.

```javascript
function signUp(email, password) {
    const user = auth.createUserWithEmailAndPassword(email, password);
    return user
}
```
Here the arguments supplied to the function are the user's email and password, when the function is called with those arguments, the firebase function
createUserWithEmailAndPassword() is triggered. This function creates a new user with the email and password and then returns it back.

Similarly, we can use other firebase authentications functions to do other actions:
```javascript
function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

function logout() {
    return auth.signOut();
}
```

### State Management
Something that we always want to do in our application is keep track of the state of the user. For example, we always want to know if the user is logged in or not so that we can display different things on the screen. we can do this using the onAuthChanged functionf from firebase. This function is a event listener that triggers every time the user is logged in. If you don't know what a event listener is, please refer to this: [Event Listeners](https://www.w3schools.com/js/js_htmldom_eventlistener.asp). This is the functions here:
```javascript
function onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
}
```

### Explanation of Key Parts

- **Sign Up**: `createUserWithEmailAndPassword(auth, email, password)` creates a new user with the given email and password.
- **Sign In**: `signInWithEmailAndPassword(auth, email, password)` signs in an existing user.
- **Sign Out**: `signOut(auth)` signs out the current user.
- **onAuthStateChanged**: This listener checks for changes in the authentication state, updating the UI based on whether a user is logged in.
