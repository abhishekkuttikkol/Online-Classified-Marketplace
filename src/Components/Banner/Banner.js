import React,{ useContext } from 'react';
import { useHistory } from 'react-router-dom'
import './Banner.css';
import Arrow from '../../assets/Arrow'
import { categoryContext } from '../../Store/CategoryContext';
import { AuthContext, FirebaseContext } from '../../Store/Context';
function Banner({banner_img}) {
    
  const {user} = useContext(AuthContext)
  const {Firebase} = useContext(FirebaseContext)
  const {setCategory_tab} = useContext(categoryContext)
  const history = useHistory()
  return (
    <div className="bannerParentDiv">
      <div className='navbar'>
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span style={{cursor : 'pointer'}} onClick={()=>{
                setCategory_tab('')
            }}>ALL CATEGORIES</span>
            <Arrow></Arrow> 
          </div>
          
          <div id="menuToggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu">
              <p><li onClick={()=> history.push('/login') }>{user ? '' : 'Login' }</li></p>
              {user && <p ><li onClick={()=> history.push('/favourite')} >Favourites</li></p>}
              {user && <p ><li onClick={()=> history.push('/my posts')} >My Posts</li></p>}
              {user && <p ><li onClick={()=> history.push('/chat home')} >ChatRoom</li></p>}
              <p><li onClick={()=> setCategory_tab('')}>All Category</li></p>
              <p ><li onClick={()=> setCategory_tab('Motorcycle')   }>Motorcycles</li></p>
              <p ><li onClick={()=> setCategory_tab('Gadgets')} >Gadgets</li></p>
              <p ><li onClick={()=> setCategory_tab('For sale')} >For Sale</li></p>
              <p ><li onClick={()=> setCategory_tab('Scooters')} >Scooters</li></p>
              <p ><li onClick={()=> setCategory_tab('Commercial')} >Commercial Vehicles</li></p>
              <p ><li onClick={()=> setCategory_tab('For rent')} >For Rent</li></p>
              <p><li onClick={()=>{
            Firebase.auth().signOut()
            history.push('/login')
            }}>{user && 'Logout'}</li></p>
            </ul>
          </div>
          <span className='login-name'>{user && `Welcome ${user.displayName}`}</span>
          <div className="otherQuickOptions">
            <span onClick={()=>{
                setCategory_tab('Car')
            }}>Cars</span>
            <span onClick={()=>{
                setCategory_tab('Motorcycle')
            }}>Motorcy...</span>
            <span onClick={()=>{
                setCategory_tab('Gadgets')
            }}>Gadgets</span>
            <span onClick={()=>{
                setCategory_tab('For sale')
            }}>For Sale:Houses & Apart...</span>
            <span onClick={()=>{
                setCategory_tab('Scooters')
            }}>Scoot...</span>
            <span onClick={()=>{
                setCategory_tab('Commercial')
            }}>Commercial & Other Ve...</span>
            <span onClick={()=>{
                setCategory_tab('For rent')
            }}>For Rent: House & Apart...</span>
            {user && <span onClick={()=>{
                history.push('/favourite')
            }}>Favourite</span>}
            {user && <span onClick={()=>{
                history.push('/my posts')
            }}>My Posts</span>}
            {user && <span onClick={()=>{
                history.push('/chat home')
            }}>Messages</span>}
            
          </div>
        </div>
        { banner_img &&
        <div className="banner">
          <img
            src="../../../Images/banner copy.png"
            alt=""
          />
        </div>
        }
      </div>
      
    </div>
    </div>
  );
}

export default Banner;
