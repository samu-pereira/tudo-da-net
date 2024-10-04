import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import axios from "axios";
import "../styles/header.css";


function Header() {
  const [username, setUsername] = useState("Guest");
  const [searchBar, setSearchBar] = useState("");
  const [headerWidth, setHeaderWidth] = useState(null);
  const token = localStorage.getItem("authToken");
  const formRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const headerContainer = document.querySelector(".home-header");
    setHeaderWidth(headerContainer.clientWidth);
  }, [])

  useEffect(() => {
    async function getUsername() {
      try {
        const response = await axios.get("http://localhost:3001/api/user", 
          {
            headers: { Authorization: token},
            withCredentials: true,  
          }
        );

        setUsername(response.data.username)

      } catch (error) {
        console.log(error)
      }
    }

    if (localStorage.getItem("authToken")) getUsername();

  }, [token]);



  function DisplayName() {
    return (
      <h2 className="displayname" title="Clique para deslogar">
        {username[0].toUpperCase() + username.substring(1)}
      </h2>
    );
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    const search = searchBar.trim().replace(" ", "+")
    navigate(`/?search=${search}`);
  }

  function handleCart() {
    navigate("/api/cart");
  }
  
  function handleLogout() {
    localStorage.clear();
    window.alert("Logged Out");
  }

  return (
    <header
     className="home-header" 
     style={{
       height: headerWidth < 1400 ? "100px" : "140px",
       padding: headerWidth < 1400 ? "0 20px 0 20px" : "20px",
     }}>
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <img src="/logo-pc.png" alt="Logo" className="logo" />
          </Link>
          
          <h1>Tudo da Net</h1>
          {window.location.pathname ==="/api/login" 
          ? <h1 className="subtitle">| Login</h1>
          : window.location.pathname === "/api/signup"
          ? <h1 className="subtitle">| Sign Up</h1>
          : window.location.pathname === "/api/cart"
          ? <h1 className="subtitle">| Cart</h1>
          : <></>}

        </div>



        {window.location.pathname === "/" 
          ? (<div className="search-bar-container">
              <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
                <input
                  type="text"
                  id="search-bar-input"
                  className="search-bar-input"
                  name="search-bar"
                  autoComplete="off"
                  value={searchBar}
                  placeholder="Pesquise por um produto"
                  onChange={(e) => setSearchBar(e.target.value)}
                  
                />
                <div
                  className="search-icon"
                  type="button"
                  onClick={(e) => handleSubmit(e)}
                >
                  <img
                    width="25"
                    height="25"
                    src="https://img.icons8.com/fluency-systems-regular/25/311847/search--v1.png"
                    alt="search--v1"
                  />
                </div>
              </form>
              <div className="cart-section">
                <CartIcon handleCart={handleCart} />
              </div>
            </div>) 
          : <></>
        }

        <div className="navigate-container">
          {localStorage.getItem("authToken") ? (
            <div className="navigate-username" onClick={handleLogout}>
              <Link to="/">
                <DisplayName />
              </Link>
            </div>
          ) : (
            <nav className="navigate-links">
              <ul>
                <li>
                  <Link to="/api/login">Login</Link>
                </li>
                <li>|</li>
                <li>
                  <Link to="/api/signup">Sign Up</Link>
                </li>
              </ul>
            </nav>
          )}
        </div>


      </div>
    </header>
  );
}

export default Header;
