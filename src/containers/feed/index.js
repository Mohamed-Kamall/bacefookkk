import React from 'react'
import { db } from '../../firebase'
import Post from '../post'

export default function Feed() {

    const [posts,setPosts] = React.useState([])

    React.useEffect(()=>{
        db.collection('posts').onSnapshot(snapshot=>{
            setPosts(snapshot.docs.map(doc=>({id : doc.id ,post : doc.data() })))
        })
    },[])
    return (
        <div className='feed'>
            {posts.sort((a,b)=>b.timestamp-a.timestamp).map(({id,post})=>{
                return(
                    <Post 
                        key={id}
                        id={id}
                        username={post.username}
                        photoURL={post.PhotoURL}
                        userPhoto={post.userPhoto}
                        caption={post.caption}
                        comments={post.comments}
                    />
                )
                
            })}
            
        </div>
    )
}
