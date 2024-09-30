import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/Contexts";
import axios from "axios";
import "../../styles/card.css";

function SignUp() {
  document.title = "Sign Up";

  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Sign Up:", { username, password, confirmPassword });
    try {
      const response = await axios.post(
        "http://localhost:3001/api/signup",
        {
          username,
          password,
          confirmPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      window.alert("You have successfully registered");
      console.log("Sign Up Response ------> ", response);
      const { token, userData } = response.data;

      setUser({
        _id: userData._id, 
        username: userData.username, 
        cart: userData.cart,
      });

      console.log("User by Signup ------> ", user)

      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      navigate("/");
    } catch (error) {
      window.alert(error.response.data.message || error.response.data.msg);
      console.log(error);
    }
  }

  return (
    <>
      <div className="card-container">
        <section>
          <h1>Sign Up</h1>
          <form className="signupForm" onSubmit={handleSubmit}>
            <label htmlFor="username"> Username </label>
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
            <label htmlFor="matchPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="off"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">SIGN UP</button>
          </form>
        </section>
      </div>{" "}
    </>
  );
}

export default SignUp;
