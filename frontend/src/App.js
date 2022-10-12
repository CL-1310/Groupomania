import './App.css';
import {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/UserContext';
import Home from './pages/Home';
import SignUp from './pages/Register'
import Login from './pages/Login'
//import Profil from './pages/Profile';
import Error from './components/Error/'
import React from 'react';
import NewPost from './pages/NewPost';
import Logout from './pages/Logout';
import ViewPost from './pages/ViewPost';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';


function App() {
  const[currentUser, setCurrentUser] = useState("")
  return (
    <DataProvider value={{currentUser, setCurrentUser}}>
        <Router>
          <Routes>
              <Route exact path="/" element={<Home />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<SignUp />}/>
              <Route path="/profile" element={<Profile />}/>
              <Route path="/create-post" element={<NewPost />}/>
              <Route path="/post/:id" element={<ViewPost />}/>
              <Route path="/edit-post/:id" element={<EditPost />}/>
              <Route path="/logout" element={<Logout />}/>
              <Route path="*" element={<Error/>}/>
          </Routes>
        </Router>
    </DataProvider>
  )
}

export default App
