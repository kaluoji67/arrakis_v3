import React, { useState } from 'react'
import LoginForm from './auth/LoginForm'
import DashBoard from './DashBoard'
import { useEffect } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Spinner from 'react-bootstrap/Spinner';



const Body = (props) => {
    const [currentUser, setCurrentUser] = useState(undefined)
    const [showLoading, setShowLoading] = useState(true)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user)
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
                console.log("uid", uid)
            } else {
                setCurrentUser(null);
                console.log("user is logged out")
            }
        })
    });
    const setUser = () => {
        props.setUser();
    }

    useEffect(() => {
        if(currentUser===undefined){
            setShowLoading(true)
        }else{
            setShowLoading(false)
        }
    }, [currentUser]);

    const user = props.info;
    console.log(user);
    return (
        <>
            <div className='loading-page' style={showLoading ? { display: "flex" } : { display: "none" }}>
                <div className='spinner-container'>
                    <Spinner animation="border" id="spinner" />;
                </div>
            </div>
            <div className='dashboard-container'>
                {currentUser ? <DashBoard info={props.info} /> : <LoginForm info={setUser} />}
            </div>
        </>
    )
}

export default Body