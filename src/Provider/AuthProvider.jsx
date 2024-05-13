import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { Children, useEffect, useState } from 'react';
import { createContext } from 'react';
import app from '../../firebase.config';

export const AuthContext = createContext(null);
const auth = getAuth(app);

import { GoogleAuthProvider } from "firebase/auth";
import usePublic from '../CustomHooks/usePublic';


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = usePublic()

    const signInWithGoogle = ()=>{
        return signInWithPopup(auth, googleProvider);
    }

    const register = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn= (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut=()=>{
        return signOut(auth);
    }
    

    useEffect(()=>{
        const unSubscirbe = onAuthStateChanged(auth, (currrentUser)=>{
            setUser(currrentUser);
            let userEmail = currrentUser?.email;
            if(currrentUser){
                // add token to the localStorage
                axiosPublic.post('/jwt', {userEmail})
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access_token', res.data.token)
                    }
                })

            }else{
                // delete token from local storage
                localStorage.removeItem('access_token')
            }
            setLoading(false)
        })
        return ()=>{
            return unSubscirbe()
        }
    },[axiosPublic])



    const authInfo ={
        user, loading, register, signIn, logOut, signInWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;