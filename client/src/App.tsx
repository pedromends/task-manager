import {useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import ListOfTodo from './components/ListOfTodo';
import EditTodo from './components/EditTodo';
import AuthDetails from './components/AuthDetails';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
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
								<main className='main'>
									<HomePage/>
								</main>
							)
						}
					/>
					<Route path='/edit' element={auth ? (<div><EditTodo/></div>):(<div>teste</div>)}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
