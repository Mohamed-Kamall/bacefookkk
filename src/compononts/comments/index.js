import React,{useState,useContext} from 'react';
import './style.css';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { db, storage } from '../../firebase';
import firebase from 'firebase';
import { UserContext } from '../../contexts/user';


export default function Comments({username,comment,id}) {
    
    const [user,setUser] = useContext(UserContext).user

    const deleteComment=()=>{
        if(user && username===user.email.replace("@gmail.com",'')){
            var commentRef = db.collection('posts').doc(id);
            commentRef.update({
            comments : firebase.firestore.FieldValue.arrayRemove({comment:comment,username:username})
        })
        }
       
    }
    
    return (
        <div className="comment">
            <p>
                <span style={{fontWeight:'600',marginRight:'12px', color:'#DA7C73'}}>{username}</span>
                        {comment}
            </p>
            {user && username==user.email.replace('@gmail.com','')?<button onClick={deleteComment} className="btn-delete"><RemoveCircleOutlineIcon/></button>:<></>}
        </div>
    )
}
