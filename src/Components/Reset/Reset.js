import React,{useState, useContext} from 'react'
import './Reset.css'
import Logo from '../../olx-logo.png';
import { useHistory } from 'react-router';
import { FirebaseContext } from '../../Store/Context';


function Reset() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const {Firebase} = useContext(FirebaseContext)

    const handleReset = (e)=>{
        e.preventDefault()
        Firebase.auth().sendPasswordResetEmail(email).then(()=>{
            alert('Email is sented to your mail id')
        })

    }
    return (
       <div>
           <div className="loginParentDiv">
            <img width="200px" height="200px" src={Logo} alt=''></img>
            <form onSubmit={handleReset}>
                <label htmlFor="fname">Email id</label>
                <br />
                <input
                    className="input"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    type="email"
                    id="fname"
                    name="email"
                    defaultValue="John"
                />
                <br />
                <br/>
                <button>Reset password</button>
                </form>
                <p id='login' onClick={()=>{
                    history.push('/login')
                 }}>Log in</p>
                </div>
        </div>
      
    )
}

export default Reset
