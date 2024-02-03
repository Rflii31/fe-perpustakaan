import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API from "../../utils/api";

const ApplicantList = () => {
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        getApplicants();
    }, []);

    const getApplicants = async () => {
        const response = await axios.get(API.LIST_APPLICANT_URL);
        setApplicants(response.data);
    };

    // const deleteUser = async (userId) => {
    //   await axios.delete(`http://localhost:2000/member-list/users/${userId}`);
    //   getUsers();
    // };

    return (
        <div>
            <h1 className="title">Member Applicant</h1>
            <h2 className="subtitle">List of Applicants</h2>
            {/* <Link to="/users/add" className="button is-primary mb-2">
                Add New
            </Link> */}
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>NIK/NIS</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants.map((Applicant, index) => (
                        <tr key={Applicant.uuid}>
                            <td>{index + 1}</td>
                            <td>{Applicant.name}</td>
                            <td>{Applicant.email}</td>
                            <td>{Applicant.nik_nis}</td>
                            <td>{Applicant.registration_status}</td>
                            <td>
                                <Link
                                    to={`/applicants/detail/${Applicant.id}`}
                                    className="button is-small is-info mr-2"
                                >
                                    Detail
                                </Link>
                                <Link
                                    to={`/applicants/edit/${Applicant.id}`}
                                    className="button is-small is-warning mr-2"
                                >
                                    Edit Registration Status
                                </Link>
                                {/* <button
                                    onClick={() => deleteUser(user.uuid)}
                                    className="button is-small is-danger"
                                >
                                    Delete
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantList;
