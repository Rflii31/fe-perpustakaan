import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import API from "../../utils/api";

const PageDetailUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [msg, setMsg] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(
                    `${API.DETAIL_USERS_URL}${id}`
                );
                setName(response.data.name);
                setEmail(response.data.email);
                setRole(response.data.role);
                setStatus(response.data.registration_status);
                // console.log(response.data)
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getUserById();
    }, [id]);


    return (
        <div>
            <h1 className="title">Users</h1>
            <h2 className="subtitle">Detail User <label>{name}</label></h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <p className="has-text-centered">{msg}</p>
                        <div className="field">
                            <label className="label">
                                Name: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {name}
                                </label>
                            </label>
                        </div>
                        <div className="field">
                            <label className="label">
                                Email: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {email}
                                </label>
                            </label>
                        </div>
                        <div className="field">
                            <label className="label">
                                Role: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {role}
                                </label>
                            </label>
                        </div>
                        <div className="field">
                            <label className="label">
                                Status: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {status}
                                </label>
                            </label>
                        </div>
                        <div className="field" style={{ marginTop: '30vh' }}>
                            <div className="control">
                                <Link to="/users" className="button is-info is-fullwidth">
                                    Close
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageDetailUser;
