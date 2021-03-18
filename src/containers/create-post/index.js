import React,{useState,useContext} from 'react'
import { SignInBtn } from '../../compononts'
import { PostContext } from '../../contexts/post'
import { UserContext } from '../../contexts/user'
import './style.css'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { db, storage, timeStamp } from '../../firebase'
import makeId from '../../helper/functions'

export default function CreatePost() {
    const [isUploaded, setIsUploaded] = useState(false)
    const [user,setUser] = useContext(UserContext).user
    const [caption,setCaption] = useContext(PostContext).caption

    const [image, setImage] = useState(null)

    const [progress, setProgress] = useState(0)
  

    const  uploadHandler = () =>{
        if(image){
            var randId = makeId(10)
            const uploadTask = storage.ref(`images/${randId}.jpg`).put(image);

            uploadTask.on('state_changed',(snapShot)=>{
                const progress_ = Math.round((snapShot.bytesTransferred/snapShot.totalBytes)*100)
                setProgress(progress_)
            },(error)=>console.log(error),
            ()=>{
                storage.ref('images').child(`${randId}.jpg`).getDownloadURL()
                .then((imageURL)=>{
                    db.collection('posts').add({
                        timestamp : timeStamp,
                        caption : caption,
                        userPhoto :user.photoURL ,
                        username : user.email.replace('@gmail.com',''),
                        PhotoURL : imageURL,
                    })
                })
                setCaption('');
                setProgress(0);
                setTimeout(()=>setIsUploaded(false),1000) 
                setImage(null)
                
            })
            
        }else{
            window.alert('write or upload something')
        } 
    }

    const inputHandler = (e) =>{
        if(e.target.files[0]){
            setIsUploaded(true)
            setImage(e.target.files[0]);
            var selectedImgSrc = URL.createObjectURL(e.target.files[0]); 
            var imagePreview = document.getElementById('image_preview');
            imagePreview.src = selectedImgSrc;
        }
    }

    return (
        <div className='createPost'>
            {
                user?
                    (<div className='postSomething'>
                        <p>Create a Post</p>
                        <div className='center'>
                            <textarea 
                                className='textArea'
                                rows='3'
                                value={caption}
                                onChange={(caption)=>setCaption(caption.target.value)}
                                placeholder = 'what is in your head..'
                            >
                            </textarea>
                            <div className='image_Preview_wrapper'>
                                <img style={{display:isUploaded?'block' :'none' }} id='image_preview' alt="pp"/>
                            </div>
                        </div>
                        <div className='bottom'>
                            <div className='imageUploader'>
                                <label htmlFor='fileInput'>
                                    <AddAPhotoIcon style={{cursor:'pointer'}}/> 
                                </label>
                                <input id='fileInput' type='file' accept='image/*' onChange={inputHandler}/>
                            </div>
                            <button className='upload' onClick={uploadHandler} style={{color: caption? "black" : "lightgrey",cursor:'pointer'}}> {`Upload ${progress != 0 ? progress : ''}`} </button>
                        </div>  
                    </div>)
                    :
                    (<div className='createPost'>
                        <SignInBtn/>
                        <p style={{marginLeft:'8px'}}>to Post And Comment</p> 
                    </div>)      
            }        
        </div>
    )
}
