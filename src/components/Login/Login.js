import React, { useContext,useState } from 'react';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useHistory, useLocation } from 'react-router';


// conditional initalizing of firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {

    const [user, setUser] = useState({
        isSingedIn: false,
        newUser: false,
        name: "",
        email: "",
        error: "",
        success: false
    });

    // setting useContext value
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    // history and location and from for private routing
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" }};

    // to create an instance of the Google provider object
    var provider = new firebase.auth.GoogleAuthProvider();

    // handel google sign in
    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                // The signed-in user info.
                var user = result.user;
                // ...
                const { displayName, email } = user;
                const signedInUser = {
                    isSingedIn: true,
                    name: displayName,
                    email: email,
                    error: "",
                    success: true
                }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);  // sending to original location
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("Google Sign in error : ", errorCode, errorMessage)
            });
    }

    // handel sign out
    const handleSignOut = () => {
        firebase.auth()
        .signOut()
        .then(() => {
            // Sign-out successful.
            const signedInUser = {
                isSingedIn: false,
                name: "",
                email: "",
                error: "",
                success: true
            }
            setUser(signedInUser);
            setLoggedInUser({});
        }).catch((error) => {
            // An error happened.
            console.log("Sign out error : ", error)
        });
    }

    return (
        <div className="loginMainDiv">
            <h1 style={{color:'white'}}>LOGIN</h1>
            {
                loggedInUser.email ? 
                <button onClick={handleSignOut} className="signOutButton">Sign out</button> : 
                <button onClick={handleGoogleSignIn} 
                className="googleButton">
                    <FontAwesomeIcon icon={faGoogle} />&nbsp;Sign in with Google
                </button>
            }
            <p className="error" style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && 
                <p className="error" style={{ color: 'white' }}>
                    User {loggedInUser.email ? 'logged in' : 'logged out'} successfully
                </p>
            }
        </div>
    );
};

export default Login;