const firebaseConfig = {
    apiKey: "AIzaSyBVxzXgD8qcp_sItR3-G7VqWIOo-gd7StE",
    authDomain: "todolist-70013.firebaseapp.com",
    projectId: "todolist-70013",
    storageBucket: "todolist-70013.appspot.com",
    messagingSenderId: "835562602738",
    appId: "1:835562602738:web:ab2e9dff60c2a28ad9d06b"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

function signInWithGoogle() {
    return auth.signInWithPopup(provider);
}

function signUp(email, password) {
    const user = auth.createUserWithEmailAndPassword(email, password);
    return user
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

class User {
    usersRef = db.collection("users");

    async addUser(uid) {
        try {
            const existingUser = await this.usersRef
                .where('uid', '==', uid)
                .limit(1)
                .get();

            if (!existingUser.empty) {
                throw new Error('User already exists');
            }

            const newUser = {
                uid,
                todos: {},
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await this.usersRef.add(newUser);

            console.log('User added with ID:', docRef.id);

            return {
                id: docRef.id,
                ...newUser
            };
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }

    async getAll() {
        const users = [];

        try {
            const snapshot = await this.usersRef.get()
            snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }))
        } catch (err) {
            console.error('Error Getting Users: ', error);
        }

        return users;
    }

    async getData() {
        try {
            const currentUser = firebase.auth().currentUser;

            if (!currentUser) {
                console.log("No user is currently logged in");
                return null;
            }

            let userDoc = await this.usersRef
                .where('uid', '==', currentUser.uid)
                .limit(1)
                .get();

            if (userDoc.empty) {
                // Create a new user document
                await this.addUser(currentUser.uid);
                // Fetch the newly created document
                userDoc = await this.usersRef
                    .where('uid', '==', currentUser.uid)
                    .limit(1)
                    .get();
            }

            const userData = userDoc.docs[0].data();
            return {
                ...userData,
                ref: userDoc.docs[0].ref
            };
        } catch (error) {
            console.error('Error in getting user data:', error);
            throw error;
        }
    }

    async deleteTodo(todoId) {
        try {
            const userDoc = await this.usersRef
                .where('uid', '==', firebase.auth().currentUser.uid)
                .limit(1)
                .get();

            if (userDoc.empty) {
                throw new Error('User document not found');
            }

            const docRef = userDoc.docs[0].ref;

            await docRef.update({
                [`todos.${todoId}`]: firebase.firestore.FieldValue.delete()
            });

            console.log("Successfully deleted todo!");
            return true;
        } catch (error) {
            console.error("Could not delete todo: ", error);
            throw error;
        }
    }
    async setTodo(todo) {
        try {
            const userDoc = await this.usersRef
                .where('uid', '==', firebase.auth().currentUser.uid)
                .limit(1)
                .get();

            if (userDoc.empty) {
                throw new Error('User document not found');
            }

            const docRef = userDoc.docs[0].ref;
            await docRef.update({
                [`todos.${todo.id}`]: todo,
            });

            console.log("Successfully updated todo!");
            return true;
        } catch (error) {
            console.error("Could not update todo: ", error);
            throw error;
        }
    }
}
