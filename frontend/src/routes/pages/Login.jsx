import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../components/contexts/Contexts";
import axios from "axios";
import "../../styles/card.css";

function Login() {
  document.title = "Login";

  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Login:", { username, password });

    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,  
        }
      );
      window.alert("You have logged in");
      console.log("Login Response ------> ", response);
      const { token, userData } = response.data;
      
      setUser({
        _id: userData._id, 
        username: userData.username, 
        cart: userData.cart,
      });
      
      console.log("User by Login ------> ", userData)

      localStorage.setItem("authToken", token);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data || error.response?.data.msg);
      console.log(error, error.message);
    }
  }
  return (
    <>
      <div className="card-container">
        <section className="card">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="off"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">LOGIN</button>
            <div className="signup-text">
              <p>
                Don't have an account?<br></br>
                <Link to="/api/signup" className="signup-link">SIGN UP</Link>
              </p>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Login;


  