import React, { useEffect } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import ApplicantList from "../../components/applicants/ApplicantList";

const Applicants = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
        if (user && user.role !== "Developer" && user.role !== "Admin") {
            navigate("/profile");
        }
    }, [isError, user, navigate]);
    return (
        <Layout>
            <ApplicantList />
        </Layout>
    );
};

export default Applicants;
