import React,{useEffect,useContext} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { AuthContext, FirebaseContext } from './Store/Context';
import Reset from './Components/Reset/Reset';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import Post from './Store/PostContext';

function App() {
  const {setUser} = useContext(AuthContext)
  const {Firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    Firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
  })
  return (
    <div>
      <Post>
      <Router>
        <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/reset password'>
          <Reset />
        </Route>
        <Route path='/create'>
          <Create />
        </Route>
        <Route path='/view post'>
          <ViewPost />
        </Route>
        </Switch>
      </Router>
      </Post>
    </div>
  );
}

export default App;
