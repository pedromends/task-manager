import { useState } from "react";
import { db } from "../../config/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import { TextField, Button } from '@mui/material';
import './SignUp.css'

function SignUp (){

    const [ email, setEmail ] = useState("");
    const [ name, setName ] = useState("");
    const [ password, setPassword ] = useState("");

    const signUp = (e: any) => {

        e.preventDefault();
        console.log(email, name, password)
        firebase.auth()
            .createUserWithEmailAndPassword(email, password).then(() => {
                addDoc(collection(db, 'users'), {
                    nome: name,
                    descricao: email,
                    senha: password,
                    timeStamp: serverTimestamp()
                })
            }).catch((error)=> {
                console.log(error);
            }
        );
    }

    return (
        <div className="sign-in-container">
            <form onSubmit={signUp} className="signup-form">
                <img src="./assets/hourglass.svg" alt="" style={{width: '10rem', alignSelf: 'center'}}/>
                <h1 style={{color:'white', alignSelf: 'center'}}>The Hourglass</h1>
                <div className="email-div">
                    <label style={{color: 'white', alignSelf: 'start', fontWeight: 'bold'}}>Nome</label>
                    <TextField id="outlined-basic" variant="outlined" sx={{width:'20rem', backgroundColor: 'rgba(168,204,204,1)', borderRadius: '1rem'}}
                        required value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="email-div">
                    <label style={{color: 'white', alignSelf: 'start', fontWeight: 'bold'}}>Email</label>
                    <TextField id="outlined-basic" variant="outlined" sx={{width:'20rem', backgroundColor: 'rgba(168,204,204,1)', borderRadius: '1rem'}}
                        required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="password-div">
                    <label style={{color: 'white', alignSelf: 'start', fontWeight: 'bold'}}>Senha</label>
                    <TextField id="outlined-basic" variant="outlined" sx={{width:'20rem', backgroundColor: 'rgba(168,204,204,1)', borderRadius: '1rem'}}
                        type="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="submit-div">
                    <Button type="submit" variant="contained" sx={{backgroundColor:'white', color:'#006666', ":hover":{backgroundColor:'rgba(168,204,204,1)'}}}>Cadastre-se</Button>
                </div>
            </form> 
        </div>
    );
};

export default SignUp;