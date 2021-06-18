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
import Search from './Pages/Search';

import CatgoryContext from './Store/CategoryContext';
import SearchContext from './Store/SearchContext';
import Favourite from './Pages/Favourite';
import FavPosts from './Pages/FavPosts';



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
      <CatgoryContext>
        <SearchContext>
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
        <Route path='/search:searchTerm'>
          <Search />
        </Route>
        <Route path='/favourite'>
          <Favourite />
        </Route>
        <Route path='/favourite posts'>
          <Favourite />
        </Route>
          <FavPosts/>
        </Switch>
      </Router>
      </SearchContext>
      </CatgoryContext>
      </Post>
    </div>
  );
}

export default App;
