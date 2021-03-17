import React,{useState,useContext} from 'react';
import { UserContext } from '../../contexts/user';
import './style.css';
import DeleteIcon from '@material-ui/icons/Delete';
import { CommentInput, Comments } from '../../compononts';
import { db, storage } from '../../firebase';

export default function Post({userPhoto,caption,username,photoURL,id,comments}) {

    const [user, setUser] = useContext(UserContext).user
    function deletePost(){
        var imageRef = storage.refFromURL(photoURL);

        imageRef
        .delete()

        db.collection('posts').doc(id)
        .delete()
        .then(
            window.alert('this post will be permenantly removed')
            
        )

    }


    return (
        <div className='post'>
            <div className='container'>
                 <div className='post_top'>
                    <div className='userInfo'>
                        <img style={{height:'30px',width:'30px',borderRadius:'15px'}} src={userPhoto}/>
                        <p style={{marginLeft:'10px'}}>{username}</p>
                    </div>
                    {user && username==user.email.replace('@gmail.com','')?<button onClick={deletePost} className='delete-btn'><DeleteIcon/></button>:<></>}
                </div>
                <div className='post_content'>
                    <img style={{width:'100%' ,marginTop:'16px', borderRadius:'20px'}} src={photoURL}/>
                </div>
                <div style={{marginTop:'12px',fontFamily:'cursive',color:'gray'}}>
                    <p>
                        <span style={{fontWeight:'600',marginRight:'12px',fontFamily:"Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",color:'black'}}>{username}</span>
                        {caption}
                    </p>
                </div>
                
                <div>
                        {comments? comments.map(comment=>{
                            return (
                                <Comments username={comment.username} comment={comment.comment} id={id}/>
                            )
                        }):null}
                    
                </div>
                {user?<CommentInput id={id} comments={comments}/>:null}
            </div>
        </div>
    )
}
