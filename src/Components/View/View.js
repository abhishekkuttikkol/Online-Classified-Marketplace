import React,{ useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../../Store/Context';
import { PostContext } from '../../Store/PostContext';

import './View.css';
function View() {
  const [userDetails, setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)
  const {Firebase} = useContext(FirebaseContext)
  useEffect(() => {
    const {userId} = postDetails
    Firebase.firestore().collection('users').where('id', '==', userId).get().then((result)=>{
      result.forEach(doc => {
        setUserDetails(doc.data())
        console.log(doc.data())
      });
    })
  }, [])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        { userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
