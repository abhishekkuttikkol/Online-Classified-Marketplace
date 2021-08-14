import React, { useState, useContext, useEffect } from "react";
import { AuthContext, FirebaseContext } from "../../Store/Context";
import { PostContext } from "../../Store/PostContext";
import Heart from "../../assets/Heart";

import "./View.css";
import { useHistory } from "react-router-dom";
function View() {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { Firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const { userId } = postDetails;
    Firebase.firestore()
      .collection("users")
      .where("id", "==", postDetails.userId)
      .get()
      .then((result) => {
        result.forEach((doc) => {
          setUserDetails(doc.data());
        });
      });
  }, []);
  const favourite = (e) => {
    console.log("clicked");
    Firebase.firestore().collection("favourite").add({
      favid: user.uid,
      userId: userDetails.id,
      createdAt: postDetails.createdAt,
      category: postDetails.category,
      name: postDetails.name,
      price: postDetails.price,
      url: postDetails.url,
    });

    alert("The Product is added to Favourites");
  };

  console.log(postDetails.userId);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        {user && (
          <p>
            <button onClick={favourite} className="fav-button">
              <Heart />
              Add to Favourites
            </button>
          </p>
        )}
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <p> {postDetails.details}</p>
          <p>Place : {postDetails.place}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {user && (
          <p>
            <button
              onClick={() => history.push("/chat")}
              className="fav-button"
            >
              Contact
            </button>
          </p>
        )}
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <div className="contact-session">
              <img
                className="phone-icon"
                src="https://image.flaticon.com/icons/png/128/15/15895.png"
                alt=""
              ></img>
              <p>{userDetails.phone}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
