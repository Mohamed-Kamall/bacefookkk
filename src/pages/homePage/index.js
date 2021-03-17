import React from 'react'
import './style.css'
import { CreatePost, NavBar } from '../../containers'
import Feed from '../../containers/feed'

export default function Home() {
    return (
        <div className='home'>
            <NavBar/>
            <CreatePost/>
            <Feed/>
        </div>
    )
}
