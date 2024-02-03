import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import API from "../../utils/api";

const PageDetailApplicant = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [niknis, setNiknis] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [msg, setMsg] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const getApplicantById = async () => {
            try {
                const response = await axios.get(
                    `${API.DETAIL_APPLICANT_URL}${id}`
                );
                setName(response.data.name);
                setEmail(response.data.email);
                setNiknis(response.data.nik_nis);
                setRole(response.data.role);
                setStatus(response.data.registration_status);
                // console.log(response.data)
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getApplicantById();
    }, [id]);


    return (
        <div>
            <h1 className="title">Applicants</h1>
            <h2 className="subtitle">Detail Applicant <label>{name}</label></h2>
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
                                NIK/NIS: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {niknis}
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
                                <Link to="/applicants" className="button is-info is-fullwidth">
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

export default PageDetailApplicant;
