import {useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import ListOfTodo from './components/ListOfTodo';
import EditTodo from './components/EditTodo';
import AuthDetails from './components/AuthDetails';
import SignIn from './components/auth/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import 'firebase/compat/auth';
import './App.css';
import './config/firebase-config.js';

function App() {

  	const [auth, setAuth] = useState( false || window.localStorage.getItem('auth') === 'true' );
	const [token, setToken] = useState('');

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userCred) => {
			if (userCred) {
				setAuth(true);
				window.localStorage.setItem('auth', 'true');
				userCred.getIdToken().then((token) => {
					setToken(token);
				});
			}
		});
	}, []);


  	const loginWithGoogle = () => {
		firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
		.then((userCred:any) => {
        	console.log(userCred)
		});
	};
	
  return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path='/' index 
						element={auth ? (
							<div>
								<AuthDetails/>
								<ListOfTodo token={token} />
							</div>
							) : (
							<div>
								<SignUp/>
								<SignIn/>
								<button onClick={loginWithGoogle}>Login with Google</button>
							</div>
						)
					}/>
					<Route path='/edit' element={auth ? (<div><EditTodo/></div>):(<div>teste</div>)}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
