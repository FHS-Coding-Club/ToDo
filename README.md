# ToDo

## Setting Up Firebase Authentication

This guide will walk you through setting up Firebase Authentication for your web application. Follow the steps below to integrate Firebase Auth into your project.

### Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click on "Add project" and follow the on-screen instructions to create a new project.

![Create Firebase Project](https://firebase.google.com/images/social.png)

### Step 2: Add Firebase to Your Web App

1. In the Firebase Console, select your project.
2. Click on the web icon (`</>`) to add Firebase to your web app.
3. Register your app with a nickname and click "Register app".
4. Copy the Firebase SDK snippet provided. It should look something like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### Step 3: Initialize Firebase in Your Project

1. Create a new file auth.js in your js directory.
2. Initialize Firebase with the configuration you copied earlier:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

function signUp(email, password) {
  const user = auth.createUserWithEmailAndPassword(email, password);
  return user;
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
```

### 4: Set Up Authentication Methods

1. In the Firebase Console, go to the "Authentication" section.
2. Click on the "Sign-in method" tab.
3. Enable the desired authentication methods (e.g., Email/Password, Google).

### Step 5: Implement Sign-Up and Login

1. Create signup.html and login.html files in your project.
2. Add the following code to signup.html:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ...existing code... -->
  </head>
  <body>
    <!-- ...existing code... -->
    <script src="js/auth.js"></script>
    <script>
      document
        .getElementById("signup-form")
        .addEventListener("submit", function (e) {
          e.preventDefault();
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;
          signUp(email, password)
            .then(() => {
              window.location.href = "index.html";
            })
            .catch((error) => {
              alert("Signup failed: " + error.message);
            });
        });
    </script>
  </body>
</html>
```

3. Add the following code to login.html:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ...existing code... -->
  </head>
  <body>
    <!-- ...existing code... -->
    <script src="js/auth.js"></script>
    <script>
      document
        .getElementById("login-form")
        .addEventListener("submit", function (e) {
          e.preventDefault();
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;
          login(email, password)
            .then(() => {
              window.location.href = "index.html";
            })
            .catch((error) => {
              alert("Login failed: " + error.message);
            });
        });
    </script>
  </body>
</html>
```

### Step 6: Handle Authentication State

1. In your index.html, add the following code to handle authentication state changes:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ...existing code... -->
  </head>
  <body>
    <!-- ...existing code... -->
    <script src="js/auth.js"></script>
    <script src="js/todo.js"></script>
    <script src="js/app.js"></script>
    <script>
      const logoutBtn = document.getElementById("logout-btn");
      const appContent = document.getElementById("app-content");
      const authMessage = document.getElementById("auth-message");

      onAuthStateChanged((user) => {
        if (user) {
          logoutBtn.style.display = "block";
          appContent.style.display = "block";
          authMessage.style.display = "none";
        } else {
          logoutBtn.style.display = "none";
          appContent.style.display = "none";
          authMessage.style.display = "block";
        }
      });

      logoutBtn.addEventListener("click", () => {
        logout()
          .then(() => {
            window.location.href = "login.html";
          })
          .catch((error) => {
            alert("Logout failed: " + error.message);
          });
      });
    </script>
  </body>
</html>
```

### Step 7: Test Your Setup

1. Open your signup.html in a browser and create a new account.
2. After signing up, you should be redirected to index.html.
3. Open login.html and log in with the account you just created.
4. You should be redirected to index.html and see the authenticated content.
