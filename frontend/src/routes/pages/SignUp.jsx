import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/contexts/Contexts";
import axios from "axios";
import "../../styles/card.css";

function SignUp() {
  document.title = "Sign Up";

  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const navigate = useNavigate();

  function handleUsername(usernameString) {
    setUsernameError(false);
    if(usernameString.length < 4) setUsernameError(true);
    setUsername(usernameString);
  }

  function handlePassword(passowrdString) {
    setPasswordError(false);
    if(passowrdString.length < 8) setPasswordError(true);
    setPassword(passowrdString);
  }

  function handleConfirmPassword(confirmPassowrdString) {
    setConfirmPasswordError(false);
    if(confirmPassowrdString !== password) setConfirmPasswordError(true);
    setConfirmPassword(confirmPassowrdString);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = usernameError || passwordError || confirmPasswordError;
    console.log(usernameError, passwordError, confirmPasswordError);
    console.log(errors);

    if(!errors) {
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
        navigate("/");
      } catch (error) {
        window.alert(error.response.data.msg);
        console.log(error);
      }
    }
  }

  return (
    <>
      <div className="card-container">
        <section>
          <h1>Sign Up</h1>
          <form className="signupForm" onSubmit={handleSubmit}>
            <label htmlFor="username"> 
              Username <span className="usernameError error"> Must be at leats 4 characters. </span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="off"
              value={username}
              placeholder="Username"
              onChange={(e) => handleUsername(e.target.value)}
              required
            />
            <label htmlFor="password">
              Password <span className="passwordError error"> Must be at leats 8 characters. </span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => handlePassword(e.target.value)}
              required
            />
            <label htmlFor="matchPassword">
              Confirm Password <span className="confirmPasswordError error"> Passwords don't match. Try again. </span> 
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="off"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => handleConfirmPassword(e.target.value)}
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
