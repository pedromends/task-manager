import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app';
import { auth } from "../config/firebase-config";

const AuthDetails = () => {

  const [authUser, setAuthUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user: any) => {
      user ? setAuthUser(user) : setAuthUser(null);
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    firebase.auth().signOut().then(() => {
        window.localStorage.setItem('auth', 'false');
    }).catch((error) => console.log(error))
    .finally(()=>{
      navigate("/");
      window.location.reload()
    })
  };

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;