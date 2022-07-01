import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC94qMgQf12zm2JDDgprjoBfaSN0kIrdOw',
  authDomain: 'itss-48872.firebaseapp.com',
  databaseURL: 'https://itss-48872-default-rtdb.firebaseio.com',
  projectId: 'itss-48872',
  storageBucket: 'itss-48872.appspot.com',
  messagingSenderId: '979412577902',
  appId: '1:979412577902:web:05782b855fdaf470c1407f',
  measurementId: 'G-RMQ4C2B840',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const FIREBASE_COLLECTION = 'todos'

export const getAllTodos = async () => {
  const snapshot = await firebase.firestore().collection(FIREBASE_COLLECTION).get()

  const mapData = snapshot.docs.map((doc) => {
    return {
      documentId: doc.id, //collection id in firebase
      text: doc.data().text,
      done: doc.data().done,
    }
  })
  // console.log(mapData);
  return mapData
}

export const addNewTodo = async (newTodo) => {
  return await firebase.firestore().collection(FIREBASE_COLLECTION).add(newTodo)
}

export const changeTodoStatus = async (id) => {
  // console.log(id);
  const updatedTodo = firebase.firestore().collection(FIREBASE_COLLECTION).doc(id)
  return updatedTodo.update({ done: !updatedTodo.done })
}

export const deleteAllTodos = async (ids) => {
  for (const id of ids) {
    await firebase.firestore().collection(FIREBASE_COLLECTION).doc(id).delete()
  }
}

export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
}
