import {auth, provider} from '../firebase';

export const SignInWithGoogle = async () =>{
    let user ;
    await auth
    .signInWithPopup(provider)
    .then((res)=>{
        console.log(res.user)
        user = res.user
    })
    .catch((error)=>{
        console.log(error.message)
    })

    return user
}

export const LogOut = async ()=>{
    let logOut_success 
    await auth
    .signOut()
    .then(()=>{
        logOut_success = true
    }).catch((error)=>{
        console.log(error.message)
    })

    return logOut_success
}