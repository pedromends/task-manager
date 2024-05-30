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
            .createUserWithEmailAndPassword(email, password).then((response) => {
                console.log(response);
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
                <h1 style={{color:'white'}}>Novo por aqui ?</h1>
                <div className="email-div">
                    <label style={{color: 'white'}}>Nome</label>
                    <TextField id="outlined-basic" label="Escreva seu nome" variant="outlined" color='error'
                        required value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="email-div">
                    <label style={{color: 'white'}}>Email</label>
                    <TextField id="outlined-basic" label="Escreva seu Email" variant="outlined" color='error'
                        required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="password-div">
                    <label style={{color: 'white'}}>Password</label>
                    <TextField id="outlined-basic" label="Escreva sua senha" variant="outlined" color='error'
                        type="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="submit-div">
                    <Button type="submit" variant="contained">Log In</Button>
                </div>
            </form> 
        </div>
    );
};

export default SignUp;