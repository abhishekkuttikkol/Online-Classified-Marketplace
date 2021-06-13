import React,{ useContext, useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../Store/Context';
import { useHistory } from 'react-router';
import { SearchCategory } from '../../Store/SearchContext';
function Header() {
  const {user} = useContext(AuthContext)
  const {SetSearchTerm} = useContext(SearchCategory)
  const {Firebase} = useContext(FirebaseContext)
  const history = useHistory()
  const [search, setSearch] = useState('')
  const [products, getProducts] = useState([])

  const handleSearch = (e)=>{
    history.push(`/search:${search}`)
    e.preventDefault()
    SetSearchTerm(search)
    // Firebase.firestore().collection('products').get().then((snapshot)=>{
    //   getProducts(snapshot.docs.map((product)=>{
    //     return{...product.data(),
    //     id : product.id}
    //     }))
    //     console.log(products)
    // })
   
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={()=>{ history.push('/')} } className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" placeholder='India'/>
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div onClick={handleSearch} className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span className='login' onClick={()=>{
            history.push('/login')
          }}>{user ? `Welcome ${user.displayName}` : 'Login'}</span>
          <hr />
        </div>
        {user && <span className="logout" onClick={()=>{
            Firebase.auth().signOut()
            history.push('/login')
        }}>Logout</span>}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div  onClick={()=>{user ? history.push('/create') :  history.push('/login')}} className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
