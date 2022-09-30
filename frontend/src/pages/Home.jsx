import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import "../home.css"

const AllPosts = () => {

    const [posts, setPosts] = useState([])
    const token = localStorage.getItem("userToken")

    useEffect(() => {
        console.log(token)
        axios({
            method:"get",
            url:"http://localhost:4000/api/posts",
            credentials:true,
            headers:{"Authorization":`Bearer ${token}`}
        })
        .then(response=>{
            setPosts(response.data)
            console.log(posts)
        }).catch(error=>{
            console.log(error);
        })

    },[token]);

    return (
        <>
            <h1>Publications</h1>
            <div className='newPostButton'>
                <button>
                <Link to="/create-post">Créer un nouveau post</Link>
                </button>
            </div>
            <div className='container'>
                {
                    posts.map((post)=>
                        <Link key={post._id} to={"/post/"+ post._id} >
                            <h2>{post.title}</h2>
                        </Link>
                    )
                }
            </div>
        </>
    )
}

export default AllPosts