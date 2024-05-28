import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../../config/firebase-config";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import firebase from 'firebase/compat/app';
function SignUp (){

    const [ email, setEmail ] = useState("");
    const [ name, setName ] = useState("");
    const [ password, setPassword ] = useState("");

    const signUp = (e: any) => {

        e.preventDefault();
        console.log(email, name, password)
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((response)=>{
            console.log(response);
            addDoc(collection(db, 'users'), {
				nome: name,
				descricao: email,
                senha: password,
				timeStamp: serverTimestamp()
			})
            
        }).catch((error)=> {
            console.log(error);
        });
    }

    return (
        <div className="sign-in-container">
            <form onSubmit={signUp}>
            
                <h1>Create Account</h1>
                <div>
                    <label htmlFor="">Name</label>
                    <input type="name" placeholder="Enter your Name" value={name}
                        onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Enter your email" value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder="Enter your password" value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Log In</button>
            </form> 
        </div>
    );
};

export default SignUp;