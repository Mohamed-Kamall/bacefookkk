import React,{useState,useContext} from 'react';
import './style.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { db, storage } from '../../firebase';
import { UserContext } from '../../contexts/user';

export default function CommentInput({id,comments}) {

    const [user,setUser] = useContext(UserContext).user
    const [comment, setComment] = useState("")
    const [commentsArray,setCommentsArray] = useState(comments?comments:[])


    const commentsHandler =()=>{
        if(comment){
            commentsArray.push({
            comment : comment,
            username : user.email.replace('@gmail.com','')
        });
        db.collection('posts').doc(id)
        .update({
            comments: commentsArray
        })
        .then(()=>{
            setComment('')
        }); 
    }else{
        window.alert('write something')
    }
    
    }
    return (
        <div className='comment-input'>
            <textarea 
                className='text-area'
                placeholder='say something nice..'
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                rows={1}
            >

            </textarea>
            <button onClick={commentsHandler} className='btn'><AddCircleIcon/></button>
        </div>
    )
}
