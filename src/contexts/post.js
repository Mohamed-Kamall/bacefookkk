import React ,{createContext , useState} from 'react'


export const PostContext = createContext()
export const PostContextProvider = (props) =>{
    const [caption, setCaption] = useState(null);

    return(
        <PostContext.Provider value={{ caption:[caption,setCaption]}}>
            {props.children}
        </PostContext.Provider>
    )
}