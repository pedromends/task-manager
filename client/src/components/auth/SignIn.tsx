import { useState } from "react";
import firebase from 'firebase/compat/app';

function SignIn (){

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [authFlag, setAuth] = useState( false || window.localStorage.getItem('auth') === 'true' );

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
            <form onSubmit={signIn}>
                <h1>Log In to your Account</h1>
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

export default SignIn;