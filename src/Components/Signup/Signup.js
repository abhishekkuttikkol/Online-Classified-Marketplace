import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../Store/Context';
import './Signup.css';
import SyncLoader from 'react-spinners/SyncLoader'

export default function Signup() {
  const [username, setUsename] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {Firebase} = useContext(FirebaseContext)
  const history = useHistory()
  const [loading, setLoading]  = useState(false)
 
  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  const handleLogin = (e)=> {
    e.preventDefault()
    setLoading(true)
    Firebase.auth().createUserWithEmailAndPassword(email, password).then((result)=>{
      result.user.updateProfile({displayName:username}).then(()=>{
        Firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phone
        }).then(()=>{
          setLoading(false)
          history.push('/login')
        })
      })
    })
   
   
  }
  
  return (
    <div>
      { loading ?  
      <div style={style}>
        < SyncLoader color={"#a2a4a6"} size={'30px'} margin={'10px'}/>
      </div>
        :
        <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value = {username}
            onChange={(e)=>setUsename(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
            />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value = {email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            value = {phone}
            onChange={(e)=>setPhone(e.target.value)}
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          
          <input
            className="input"
            value = {password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            />
          <br />
          <br />
          <p style={{color:'red'}}>password contain 6 letters</p>
          <button>Signup</button>
        </form>
        <a onClick={()=>{
          history.push('/login')
        }}>Login</a>
      </div>
      
       
  }
    </div>
  );
}
