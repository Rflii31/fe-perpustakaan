import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../image/logo.png";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../../features/authSlice";
import { IoCaretDown } from "react-icons/io5";
import userImage from "../../image/user.jpg";
import axios from "axios";
import API from "../../utils/api";

const Navbar = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getPicture();
  }, []);

  const getPicture = async () => {
    axios.get(API.PROFILE_URL)
      .then(response => {
        if (response.data && response.data.picture) {
          // console.log(response.data.picture)
          const imageUrl = response.data.picture;
          setImageSrc(imageUrl)
        } else {
          // console.log('Data picture tidak ditemukan dalam response.')
          setImageSrc(false)
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
  }

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink to="/profile" className="navbar-item">
            <img src={logo} width="160" height="40" alt="logo" />
          </NavLink>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                  <div className="is-flex is-justify-content-end is-align-items-center" aria-haspopup="true" aria-controls="dropdown-menu3" style={{ width: "80px" }}>
                    <figure className="image is-24x24 ">
                      {imageSrc === false ? (
                        <img className="is-rounded" src={userImage} alt="user profile" />
                      ) : (
                        <img className="is-rounded" src={imageSrc} alt="user profile" />
                      )}
                    </figure>
                    <span className="icon is-small">
                      <IoCaretDown />
                    </span>
                  </div>
                </div>
                <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                  <div className="dropdown-content">
                    <a href="/profile" className="dropdown-item">
                      Profile
                    </a>
                    <span onClick={logout} className="dropdown-item " style={{ cursor: "pointer" }}>
                      Logout
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
