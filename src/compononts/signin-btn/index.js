import React,{useState,useContext} from 'react';
import { UserContext } from '../../contexts/user';
import { SignInWithGoogle } from '../../services/auth';
import './style.css';


export default function SignInBtn () {
    const [user, setUser] = useContext(UserContext).user;

    const clickHandler = async () =>{
        
        const googleUser = await SignInWithGoogle()
        if(googleUser) setUser(googleUser)
        
    }

    return (
        <div className='SignInBtn' onClick={clickHandler}>
            <p>Sign-In Using Google</p>
        </div>
    )
}
