import React, { useContext, useState } from "react";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext, FirebaseContext } from "../../Store/Context";
import { useHistory } from "react-router";
import { SearchCategory } from "../../Store/SearchContext";
function Header() {
  const { user } = useContext(AuthContext);
  const { SetSearchTerm } = useContext(SearchCategory);
  const { Firebase } = useContext(FirebaseContext);
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [place, setPlace] = useState("");
  // const [products, getProducts] = useState([])
  const handlePlace = (e) => {
    e.preventDefault();
    history.push(`/search:${place}`);
    SetSearchTerm(place);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search:${search}`);
    SetSearchTerm(search);
    // Firebase.firestore().collection('products').get().then((snapshot)=>{
    //   getProducts(snapshot.docs.map((product)=>{
    //     return{...product.data(),
    //     id : product.id}
    //     }))
    //     console.log(products)
    // })
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div
          onClick={() => {
            history.push("/");
          }}
          className="brandName"
        >
          {/* <OlxLogo></OlxLogo> */}
          <img
            style={{ width: "40px" }}
            src="http://www.softmantra.com/img/classified-ad-posting-services.png"
            alt=""
          />
        </div>
        <form onSubmit={handlePlace}>
          <div className="placeSearch">
            <Search></Search>
            <input
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              type="text"
              placeholder="India"
            />
            <Arrow type="submit"></Arrow>
          </div>
        </form>
        <form onSubmit={handleSearch}>
          <div className="productSearch">
            <div className="input">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Find car,mobile phone and more..."
              />
            </div>
            <div type="submit" onClick={handleSearch} className="searchAction">
              <Search color="#ffffff"></Search>
            </div>
          </div>
        </form>
        {/* <div className="language">
          <span > ENGLISH </span>
          <Arrow></Arrow>
        </div> */}
        {user && (
          <div
            onClick={(e) => {
              history.push("/chat home");
            }}
            className="language"
          >
            <span> CHATS </span>
            <Arrow></Arrow>
          </div>
        )}
        <div className="loginPage">
          <span
            className="login"
            onClick={() => {
              history.push("/login");
            }}
          >
            {user ? `Welcome ${user.displayName}` : "Login"}
          </span>
          <hr />
        </div>
        {user ? (
          <span
            className="logout"
            onClick={() => {
              Firebase.auth().signOut();
              history.push("/login");
            }}
          >
            Logout
          </span>
        ) : (
          <span
            className="logout"
            onClick={() => {
              history.push("/signup");
            }}
          >
            Sign Up
          </span>
        )}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div
            onClick={() => {
              user ? history.push("/create") : history.push("/login");
            }}
            className="sellMenuContent"
          >
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
