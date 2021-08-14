import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../Store/Context";
import Logo from "../../olx-logo.png";
import "./Login.css";
import { useHistory } from "react-router";
import SyncLoader from "react-spinners/SyncLoader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Firebase } = useContext(FirebaseContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div>
      {loading ? (
        <div style={style}>
          <SyncLoader color={"#a2a4a6"} size={"30px"} margin={"10px"} />
        </div>
      ) : (
        <div className="loginParentDiv">
          {/* <img width="200px" height="200px" src={Logo} alt=''></img> */}
          <img
            style={{
              width: "100px",
              marginBlock: "10px",
              marginInline: "40px",
            }}
            src="http://www.softmantra.com/img/classified-ad-posting-services.png"
            alt=""
          />
          <form onSubmit={handleLogin}>
            <label htmlFor="fname">Email</label>
            <br />
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="fname"
              name="email"
              defaultValue="John"
            />
            <br />
            <label htmlFor="lname">Password</label>
            <br />
            <input
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="lname"
              name="password"
              defaultValue="Doe"
            />
            <br />
            <br />
            <button>Login</button>
          </form>
          <p
            onClick={() => {
              history.push("/signup");
            }}
          >
            Signup
          </p>
          <p
            onClick={() => {
              history.push("/reset password");
            }}
          >
            Forgotten password ?
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;
