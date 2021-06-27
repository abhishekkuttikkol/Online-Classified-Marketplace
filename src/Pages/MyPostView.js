import React, { useContext, useEffect, useState } from 'react'
import Heart from '../assets/Heart'
import Header from '../Components/Header/Header'
import { AuthContext, FirebaseContext } from '../Store/Context'
import { PostContext } from '../Store/PostContext'
import './FavPost.css'

function MyPostView() {
    const [userDetails, setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)
  const {Firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  useEffect(() => {
    const {userId} = postDetails
    console.log(postDetails)
    Firebase.firestore().collection('users').where('id', '==', postDetails.userId).get().then((result)=>{
      result.forEach(doc => {
        setUserDetails(doc.data())
      });
    })
  }, [])
  console.log(postDetails)
  const deletePost = (e)=>{
    console.log('clicked')
    Firebase.firestore().collection("products").doc(postDetails.id).delete().then(()=>{
        alert('Succesfully Deleted..')
    })
    Firebase.firestore().collection("favourite").doc(postDetails.id).delete()
  }

  return (
    <div>
    <Header/>
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        {user && <p><button onClick={() => {if(window.confirm('Are you sure want to delete this post?')){deletePost()};}} className='fav-button'><Heart/>Delete Post</button></p>}
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <p> {postDetails.details}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        { userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <div className='contact-session'>
          <img className='phone-icon' src="https://image.flaticon.com/icons/png/128/15/15895.png" alt=''></img>
          <p>{userDetails.phone}</p>
          </div>
        </div>}
      </div>
    </div>
    </div>

  );
}


export default MyPostView
