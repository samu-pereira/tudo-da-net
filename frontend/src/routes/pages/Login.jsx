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
  const [showPassword, setShowPassword] = useState(false);
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
      console.log(error);
      window.alert(error.response.data.msg)
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

            
            <div className="password-container">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="show-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword 
                  ? <img 
                      width="20" 
                      height="20" 
                      src="https://img.icons8.com/fluency-systems-regular/24/311847/visible--v1.png" 
                      alt="visible--v1"
                      title="Hide password"
                    />
                  : <img 
                      width="20" 
                      height="20" 
                      src="https://img.icons8.com/fluency-systems-regular/24/311847/closed-eye.png"
                      alt="closed-eye"
                      title="Show password"
                    />  
                }
              </div>
            </div>


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


  