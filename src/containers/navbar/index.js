import React,{useState,useContext} from 'react';
import { SignInBtn } from '../../compononts';
import { UserContext } from '../../contexts/user';
import './style.css'


export default function NavBar() {

    const [user,setUser] = useContext(UserContext).user
    
    return (
        <div className='navbar'>
            <h1 style={{color:'#DA7C73'}}>BACEFOOK</h1>
            {user? <div className='userInfo'><img style={{width:'30px',height:'30px', borderRadius:'15px'}} src={user.photoURL}></img><p style={{marginLeft:'10px'}}>{user.displayName}</p></div> : <SignInBtn/>}
        </div>
    )
}
