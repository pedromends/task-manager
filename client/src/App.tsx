import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './App.css';
import './config/firebase-config.js';

function App() {
  const loginWithGoogle = () => {
		firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then((userCred:any) => {
			});
	};
  return (
    <div className="App">
      <button onClick={loginWithGoogle}>Login with Google</button>
    </div>
  );
}

export default App;
