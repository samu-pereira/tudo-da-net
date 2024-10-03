import { useContext, useEffect, useState } from "react";
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

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  function handleUsername(usernameString) {
    setUsernameError(
      usernameString.length < 4 
        ? true 
        : false
    );
    setUsername(usernameString);
  }

  function handlePassword(passowrdString) {
    setPasswordError(
      passowrdString.length < 8 
        ? true 
        : false
    );
    setPassword(passowrdString);
  }

  function handleConfirmPassword(confirmPassowrdString) {
    setConfirmPasswordError(
      confirmPassowrdString !== password 
        ? true 
        : false
    );
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
              Username 
              <span
                className="usernameError error" 
                style={{visibility: usernameError ? "visible" : "hidden"}}> 
                  <strong> Must be at leats 4 characters. </strong>
              </span>
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


            <div className="password-container">
              <label htmlFor="password">
                Password 
                <span 
                  className="passwordError error"
                  style={{visibility: passwordError ? "visible" : "hidden"}}> 
                    <strong> Must be at leats 8 characters. </strong>
                </span>
              </label>

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => handlePassword(e.target.value)}
                required
              />
              <div className="show-password" onClick={() => setShowPassword(!showPassword)}/>
            </div>

            <label htmlFor="matchPassword">
              Confirm Password 
              <span 
                className="confirmPasswordError error" 
                style={{visibility: confirmPasswordError ? "visible" : "hidden"}}>
                  <strong> Passwords don't match. </strong>
                </span> 
            </label>
            <input
              type={showPassword ? "text" : "password"}
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
