import { useState } from "react";
import firebase from 'firebase/compat/app';
import { TextField, Button } from '@mui/material';
import './SignIn.css'
import AlertError from "../alert/AlertError";

function SignIn (){

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [authFlag, setAuth] = useState( false || window.localStorage.getItem('auth') === 'true' );
    const [show, setShow] = useState(false);
    
    const loginWithGoogle = () => {
		firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
		.then((userCred:any) => {
        	console.log(userCred)
		});
	};
    
    const signIn = (e: any) => {
        e.preventDefault();
        firebase.auth()
            .signInWithEmailAndPassword(email, password).catch((error)=> {
                setShow(true)
            }).then((e)=>{
                
            })
        .finally(() => setAuth(true));
    }

    return (
        <div className="sign-in-container">
            <form onSubmit={signIn} className="main-form">
                <img src="./assets/hourglass1.svg" alt="" style={{width: '10rem', alignSelf: 'center'}}/>
                <h1 style={{color: 'rgba(0,102,102,255)'}}>Bem-vindo de volta!</h1>
                {show && <AlertError/>}
                <div className="email-div">
                    <label style={{color: 'rgba(0,102,102,255)', alignSelf: 'start'}}>Email</label>
                    <TextField id="outlined-basic" label="Escreva seu Email" variant="outlined" color='error' sx={{alignSelf: 'start', width:'100%'}}
                        required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="password-div">
                    <label style={{color: 'rgba(0,102,102,255)', alignSelf: 'start'}}>Senha</label>
                    <TextField id="outlined-basic" label="Escreva sua senha" type="password" variant="outlined" color='error'  sx={{alignSelf: 'start', width:'100%'}}
                        value={password} required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="submit-div">
                    <Button type="submit" variant="contained" sx={{backgroundColor:'#006666', ":hover":{backgroundColor:'rgba(168,204,204,1)', color: '#006666'}}}>Login</Button>
                    <Button onClick={loginWithGoogle} variant="outlined" sx={{ display: 'flex', gap:'1rem', paddingTop: '0rem', paddingBottom: '0rem' }}>
                        <img src="./assets/google.svg" style={{width:'2rem'}} alt="Google Icon" />
                        <p>Entrar com Google</p>
                    </Button>
                </div>
            </form> 
        </div>
    );
};

export default SignIn;