import {useRef, useState} from 'react'
import axios from "axios";
import Header from "../components/Header"
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
    const titleRef = useRef();
    const errRef = useRef();
    const [title, setTitle] = useState("");
    const [setValidTitle] = useState(false);
    const [description, setDescription] = useState("");
    const [setValidDescription] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [setSuccess] = useState(false);
    const [postImgInput, setPostImgInput] = useState();
    const [imgPostFile, setImgPostFile] = useState();
    const token = localStorage.getItem("userToken")
    let navigate = useNavigate();
    const POST_REGEX = /#^[a-z0-9._-]{3}$#/
    
    const handlePostImg = (e) => {
        e.preventDefault();
        setPostImgInput(e.target.value)
        setImgPostFile(e.target.files[0])
    }
    const postSubmit = async (e) => {
        e.preventDefault();
        const checkTitle  = POST_REGEX.test(title);
        if(checkTitle === true){
        setValidTitle(true)
        }
        const checkDescription = POST_REGEX.test(description)
        if(checkDescription === true){
        setValidDescription(true)
        }
        if(checkTitle === true && checkDescription === true){
            const formData = new formData()
            formData.append("title",title)
            formData.append("description",description)
            formData.append("image",imgPostFile)
        axios.post(
            "http://localhost:4000/api/posts/create",
            formData,
            {headers:{"Authorization":`Bearer ${token}`}}
        ).then(()=>{
            setSuccess(true);
            setTitle("");
            setDescription("");
            navigate("/"); 
        }).catch((err)=>{
            if (!err?.response) {
            setErrMsg("No Server Response");
            } else {
            setErrMsg("Error");
            }
            errRef.current.focus();
        });
        }
        
    };

    return (
        <>
        <Header/>
        <section>
            <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
            >
            {errMsg}
            </p>
            <h1>Nouveau post</h1>
            <form onSubmit={postSubmit} encType="multipart/form-data">
            <label htmlFor="title">
                Titre:
            </label>
            <input
                type="text"
                ref={titleRef}
                autoComplete="off"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
            />
            <label htmlFor="description">
                Description
            </label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
            />
            <label htmlFor="image">
                Image
            </label>
            <input
                type="file"
                id="imagePost"
                name="imagePost"
                accept="image/png,image/jpeg,image/jpg,image/gif"
                onChange={handlePostImg}
                value={postImgInput}
                required
            />
            <button>
                Publier
            </button>
            </form>
        </section>
        </>
    );
};
    


export default NewPost;