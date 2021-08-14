import React, { useContext, useEffect, useState } from "react";
import Heart from "../assets/Heart";
import { useHistory } from "react-router-dom";
import "./Favourite.css";
import Header from "../Components/Header/Header";
import { AuthContext, FirebaseContext } from "../Store/Context";
import { PostContext } from "../Store/PostContext";

function Favourite() {
  const history = useHistory();
  const [products, SetProducts] = useState([]);
  const { Firebase } = useContext(FirebaseContext);
  const { setPostDetails } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  console.log(user.uid);
  useEffect(() => {
    Firebase.firestore()
      .collection("favourite")
      .where("favid", "==", user.uid)
      .get()
      .then((snapshot) => {
        const allPosts = snapshot.docs.map((product) => {
          return { ...product.data(), id: product.id };
        });
        SetProducts(allPosts);
      });
  }, []);
  return (
    <div>
      <Header />
      <div className="postParentDiv">
        <div className="moreView">
          <div className="heading">
            <span>Favourites</span>
            <span>View more</span>
          </div>
          <div className="cards">
            {products.map((product) => {
              return (
                <div
                  onClick={() => {
                    setPostDetails(product);
                    history.push("/favourite post");
                  }}
                  className="card"
                >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div>
                    <div className="image">
                      <img src={product.url} alt="" />
                    </div>
                    <div className="content">
                      <p className="rate">&#x20B9; {product.price}</p>
                      <span className="kilometer">{product.category}</span>
                      <p className="name">{product.name}</p>
                    </div>
                    <div className="date">
                      <span>{product.createdAt}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favourite;
