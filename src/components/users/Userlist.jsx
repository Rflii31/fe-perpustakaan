import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import API from "../../utils/api";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(API.LIST_USERS_URL);
    setUsers(response.data);
  };

  const filteredUsers = users.filter((user) => {
    const titleMatch = user.name.toLowerCase().includes(filterUser.toLowerCase());
    const roleMatch = filterRole === "all" || user.role === filterRole;
    return titleMatch && roleMatch;
  });

  const roleOptions = ["all", "Developer", "Admin", "Librarian", "Member"]

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">List of Users</h2>
      <div className="is-flex is-justify-content-space-between">
        <div className="is-flex is-align-items-center mb-2">
          <div className="panel-block">
            <label>Role : &nbsp;</label>
            <select
              className="p-2"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              {roleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="is-flex is-align-items-center mb-2">
          <div className="panel-block">
            <p className="control has-icons-left">
              <input
                className="input"
                type="search"
                placeholder="Filter by Name"
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
              />
              <span className="icon is-left">
                <IoSearch />
              </span>
            </p>
          </div>

        </div>
      </div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* <td>{user.nik_nis}</td> */}
              <td>{user.role}</td>
              <td>
                <Link
                  to={`/users/detail/${user.id}`}
                  className="button is-small is-info mr-2"
                >
                  Detail
                </Link>
                <Link
                  to={`/users/edit/${user.id}`}
                  className="button is-small is-warning mr-2"
                >
                  Edit Role
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
