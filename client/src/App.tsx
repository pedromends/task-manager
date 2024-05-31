import {useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import TodoManager from './pages/TodoManager';
import EditTodo from './components/EditTodo';
import AuthDetails from './components/AuthDetails';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
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
								<TodoManager />
							</div>
							) : (
								<main className='main'>
									<LoginPage/>
								</main>
							)
						}
					/>
					<Route path='/edit' element={
						auth ? (
							<div>
								<EditTodo/>
							</div> ) : ( <LoginPage/> )
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
