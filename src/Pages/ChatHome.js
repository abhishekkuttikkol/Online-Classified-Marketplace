import React, { useContext, useEffect, useState } from "react";
import { AuthContext, FirebaseContext } from "../Store/Context";
import "./ChatHome.css";
import { PostContext } from "../Store/PostContext";
import { useHistory } from "react-router-dom";

function ChatHome() {
  const history = useHistory();
  const { setPostDetails } = useContext(PostContext);
  const { Firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState([]);
  useEffect(() => {
    Firebase.firestore()
      .collection("messages")
      .where("to", "==", user.uid)
      .onSnapshot((snapshot) => {
        setMessage(snapshot.docs.map((doc) => ({ ...doc.data() })));
      });
  }, []);
  console.log(message);
  return (
    <div className="container-chat">
      <h1 className="chat-head">Messages</h1>
      {message.map((obj) => (
        <p
          onClick={(e) => {
            setPostDetails({ userId: obj.from });
            history.push("/chat");
          }}
          className="names"
        >
          {obj.userName} : {obj.messages}
        </p>
      ))}
    </div>
  );
}

export default ChatHome;
