import React, { useContext, useEffect, useState } from "react";
import { AuthContext, FirebaseContext } from "../Store/Context";
import { PostContext } from "../Store/PostContext";
import firebase from "firebase";
import "./Chat.css";

function Chat() {
  const [reply, setReply] = useState([]);
  const { postDetails } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const [messages, setMessage] = useState([]);
  const [input, setInput] = useState("");
  let collectionId = user.uid + postDetails.userId;
  let flag = true;
  const revCollectionId = postDetails.userId + user.uid;

  useEffect(() => {
    Firebase.firestore()
      .collection(collectionId)
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          setMessage(snapshot.docs.map((doc) => ({ ...doc.data() })));
        }
      });
    Firebase.firestore()
      .collection(revCollectionId)
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          setMessage(snapshot.docs.map((doc) => ({ ...doc.data() })));
        }
      });
  }, []);
  const { Firebase } = useContext(FirebaseContext);

  const saveMessage = (e) => {
    e.preventDefault();
    if (flag == true) {
      Firebase.firestore().collection(collectionId).add({
        userName: user.displayName,
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        id: collectionId,
      });

      Firebase.firestore().collection("messages").doc(collectionId).set({
        userName: user.displayName,
        from: user.uid,
        to: postDetails.userId,
        messages: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    if (flag == false) {
      Firebase.firestore().collection(revCollectionId).add({
        userName: user.displayName,
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        id: revCollectionId,
      });

      Firebase.firestore().collection("messages").doc(revCollectionId).set({
        userName: user.displayName,
        from: user.uid,
        to: postDetails.userId,
        messages: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    setInput("");
  };
  console.log(messages);
  return (
    <div className="container">
      <div className="chat-header">
        <h1>Chat to Seller</h1>
      </div>
      <div className="chats">
        {messages.map((obj) => {
          {
            const collectionCheck = obj.id;
            const firstHalf = collectionCheck.slice(0, 28);
            console.log(firstHalf);
            if (firstHalf == user.uid) {
              flag = true;
            } else {
              flag = false;
            }
          }
          return (
            <div className="scrollable">
              {obj.userName == user.displayName ? (
                <div className="message-orange">
                  <p className="message-content">Me : {obj.message}</p>
                </div>
              ) : (
                <div className="message-blue">
                  <p className="message-content">
                    {obj.userName} : {obj.message}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="input">
        <form>
          <input
            className="msg-text-box"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="submit-button" type="submit" onClick={saveMessage}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
