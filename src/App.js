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
import CarsCategory from './Pages/CarsCategory';
import CatgoryContext from './Store/CategoryContext';


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
        <Route path='/cars'>
          <CarsCategory />
        </Route>

        </Switch>
      </Router>
      </CatgoryContext>
      </Post>
    </div>
  );
}

export default App;
