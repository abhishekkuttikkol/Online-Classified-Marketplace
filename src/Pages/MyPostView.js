import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import { AuthContext, FirebaseContext } from "../Store/Context";
import { PostContext } from "../Store/PostContext";
import "./FavPost.css";
import SyncLoader from "react-spinners/SyncLoader";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MenuItem, Select } from "@material-ui/core";

function MyPostView() {
  const [loading, setLoading] = useState(false);
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const [open, setOpen] = React.useState(false);
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { Firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [place, setPlace] = useState("");
  const date = new Date();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const { userId } = postDetails;
    console.log(postDetails);
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
  console.log(postDetails);
  const deletePost = (e) => {
    console.log("clicked");
    Firebase.firestore()
      .collection("products")
      .doc(postDetails.id)
      .delete()
      .then(() => {
        alert("Succesfully Deleted..");
      });
    Firebase.firestore().collection("favourite").doc(postDetails.id).delete();
  };

  const editPost = (e) => {
    setLoading(true);
    Firebase.storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          Firebase.firestore()
            .collection("products")
            .doc(postDetails.id)
            .update({
              name,
              category,
              price,
              url,
              details,
              place,
              userId: user.uid,
              createdAt: date.toDateString(),
            });
        });
      });
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <div style={style}>
          <SyncLoader color={"#a2a4a6"} size={"30px"} margin={"10px"} />
        </div>
      ) : (
        <div>
          <Header />
          <div className="viewParentDiv">
            <div className="imageShowDiv">
              <img src={postDetails.url} alt="" />
            </div>
            <div className="rightSection">
              <div style={{ display: "flex" }}>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>
                  <DialogContent>
                    <form>
                      <label htmlFor="fname">Name</label>
                      <br />
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input"
                        type="text"
                        id="fname"
                        name="Name"
                        defaultValue="John"
                      />
                      <br />
                      <label htmlFor="fname">Category</label>
                      <br />

                      <Select
                        labelId=""
                        id="select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <MenuItem value="Car">Cars</MenuItem>
                        <MenuItem value="Motorcycle">Motorcycles</MenuItem>
                        <MenuItem value="For sale">
                          For sale : Houses and Apartments
                        </MenuItem>
                        <MenuItem value="Gadgets">Gadgets</MenuItem>
                        <MenuItem value="Scooters">Scooters</MenuItem>
                        <MenuItem value="Commercial">
                          Commercial and other
                        </MenuItem>
                        <MenuItem value="For rent">
                          For rent : Houses and Apartments
                        </MenuItem>
                      </Select>
                      <br />
                      <label htmlFor="fname">Place</label>
                      <br />
                      <input
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        className="input"
                        type="text"
                        id="fname"
                        name="Name"
                        defaultValue="John"
                      />
                      <br />
                      <label htmlFor="fname">Details</label>
                      <br />
                      <input
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="input"
                        type="text"
                        id="fname"
                        name="category"
                        defaultValue="John"
                      />
                      <br />
                      <label htmlFor="fname">Price</label>
                      <br />
                      <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="input"
                        type="number"
                        id="fname"
                        name="Price"
                      />
                      <br />
                    </form>
                    {image && (
                      <img
                        alt="Posts"
                        width="200px"
                        height="200px"
                        src={image && URL.createObjectURL(image)}
                      ></img>
                    )}

                    <br />
                    <input
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                      }}
                      type="file"
                    />
                    <br />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={(e) => {
                        editPost();
                        handleClose();
                      }}
                      color="primary"
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
                {user && (
                  <p>
                    <button
                      style={{
                        margin: "10px",
                        width: "140px",
                        marginBottom: "40px",
                      }}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure want to delete this post?"
                          )
                        ) {
                          deletePost();
                        }
                      }}
                      className="fav-button"
                    >
                      Delete Post
                    </button>
                  </p>
                )}
                {user && (
                  <p>
                    <button
                      style={{
                        margin: "10px",
                        width: "140px",
                        marginBottom: "40px",
                      }}
                      onClick={handleClickOpen}
                      className="fav-button"
                    >
                      Edit Post
                    </button>
                  </p>
                )}
              </div>
              <div className="productDetails">
                <p>&#x20B9; {postDetails.price} </p>
                <span>{postDetails.name}</span>
                <p>{postDetails.category}</p>
                <p> {postDetails.details}</p>
                <span>{postDetails.createdAt}</span>
              </div>
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
        </div>
      )}
    </div>
  );
}

export default MyPostView;
