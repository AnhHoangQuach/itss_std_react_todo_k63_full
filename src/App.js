import React, { useEffect, useState } from 'react'
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { uiConfig } from './lib/firebase';

/* スタイルシート */
import './styles/main.css';

/* コンポーネント */
import Todo from './components/Todo';

function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver();
  }, []);

  if (!isSignedIn) {
    return (
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
    )
  }
  return (
    <div className="container is-fluid">
      <p className='title is-4 is-spaced'>
        {firebase.auth().currentUser.displayName}
      </p>
      <button
        className="button is-danger is-light is-medium is-spaced mb-10" 
        onClick={() => firebase.auth().signOut()}
      >
        Log Out
      </button>
      <Todo />
    </div>
  );
}

export default App;
