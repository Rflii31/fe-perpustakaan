import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../../utils/api";

const FormEditUser = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`${API.DETAIL_USERS_URL}${id}`);
        setName(response.data.name);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    setIsMutating(true)
    try {
      await axios.patch(`${API.EDIT_USERS_URL}${id}`, {
        role: role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg("Invalid Switch Role Account");
        // setMsg(error.response.data.msg);
      }
    }
    setIsMutating(false);
  };
  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Update Role {name}</h2>
      <Link to="/users" className="button is-danger mb-2">
        Cancel
      </Link>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateUser}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="Developer">Developer</option>
                      <option value="Admin">Admin</option>
                      <option value="Librarian">Librarian</option>
                      <option value="Member">Member</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  {!isMutating ? (
                    <button type="submit" className="button is-success">
                      Update
                    </button>
                  ) : (
                    <button type="submit" className="button is-success">
                      Updating...
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditUser;
