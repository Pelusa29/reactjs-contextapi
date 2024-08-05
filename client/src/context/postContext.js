import { useState, createContext } from "react"

const context = createContext()

export const PostContainer = ({ children }) => {

    const [posts, setPosts] = useState([])
    console.log(posts)
    return (
        <div>
            {children}
        </div>
    )
}