import { useState } from "react";
import firebase from 'firebase/compat/app';
import { TextField, Button } from '@mui/material';
import './SignIn.css'

function SignIn (){

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [authFlag, setAuth] = useState( false || window.localStorage.getItem('auth') === 'true' );

    const loginWithGoogle = () => {
		firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
		.then((userCred:any) => {
        	console.log(userCred)
		});
	};
    
    const signIn = (e: any) => {

        e.preventDefault();
        firebase.auth()
            .signInWithEmailAndPassword(email, password).then((userCredential)=>{
                console.log(userCredential);
            }).catch((error)=> {
                console.log(error);
            })
        .finally(()=> setAuth(true));
    }

    return (
        <div className="sign-in-container">
            <form onSubmit={signIn} className="main-form">
                <h1 style={{color: 'rgba(0,102,102,255)'}}>Bem-vindo de volta!</h1>
                <div className="email-div">
                    <label style={{color: 'rgba(0,102,102,255)', alignSelf: 'start'}}>Email</label>
                    <TextField id="outlined-basic" label="Escreva seu Email" variant="outlined" color='error' sx={{alignSelf: 'start', width:'100%'}}
                        required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="password-div">
                    <label style={{color: 'rgba(0,102,102,255)', alignSelf: 'start'}}>Password</label>
                    <TextField id="outlined-basic" label="Escreva sua senha" variant="outlined" color='error'  sx={{alignSelf: 'start', width:'100%'}}
                        value={password} required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="submit-div">
                    <Button type="submit" variant="contained" sx={{backgroundColor:'#006666'}}>Login</Button>
                    <Button onClick={loginWithGoogle} variant="outlined" color="info">Entrar com Google</Button>
                </div>
            </form> 
        </div>
    );
};

export default SignIn;