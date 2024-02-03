import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API from "../../utils/api";

const ApplicantRejectedList = () => {
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        getApplicants();
    }, []);

    const getApplicants = async () => {
        const response = await axios.get(API.LIST_REJECTED_URL);
        setApplicants(response.data);
    };

    return (
        <div>
            <h1 className="title">Member Applicant Rejected</h1>
            <h2 className="subtitle">List of Member Applicants Rejected</h2>
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
                                    to={`/applicant-rejected/detail/${Applicant.id}`}
                                    className="button is-small is-info mr-2"
                                >
                                    Detail
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantRejectedList;
