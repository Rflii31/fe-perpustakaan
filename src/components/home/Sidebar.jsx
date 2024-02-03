import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoBookOutline, IoPerson, IoHome, IoLogOut, IoBook, IoPersonAdd, IoPersonRemove } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../features/authSlice";
import { GoHistory } from "react-icons/go";
import { MdOutlineAssignmentReturn } from "react-icons/md";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div style={{ position: "fixed", top: 60, bottom: 0, left: 0, width: "200px", overflowY: "auto"}}>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list is-align-items-center">
          <li>
            <NavLink to={"/profile"}>
              <IoHome /> Profile
            </NavLink>
          </li>
          {user && user.registration_status === "Verified" && (
            <>
              <li>
                <NavLink to={"/books"}>
                  <IoBook /> Books
                </NavLink>
              </li>
              <li>
                <NavLink to={"/history"}>
                  <GoHistory /> History
                </NavLink>
              </li>
            </>
          )}
        </ul>
        {user && user.role !== "Member" && user.role !== "Admin" && (
          <div>
            <p className="menu-label">Administration</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/borrowing-book"}>
                  <IoBookOutline /> Borrowing Books
                </NavLink>
                <NavLink to={"/borrowing-returned"}>
                  <MdOutlineAssignmentReturn /> Borrowing Returned
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        {user && user.role !== "Member" && user.role !== "Librarian" && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/applicants"}>
                  <IoPersonAdd /> Member Applicants
                </NavLink>
                <NavLink to={"/users"}>
                  <IoPerson /> Users
                </NavLink>
                <NavLink to={"/applicant-rejected"}>
                  <IoPersonRemove /> Applicant Rejected
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
