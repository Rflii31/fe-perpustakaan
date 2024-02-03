import React, { useEffect } from "react";
import Layout from "../Layout";
import PageDetailUser from "../../components/users/PageDetailUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const DetailUser = () => {
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
      <PageDetailUser />
    </Layout>
  );
};

export default DetailUser;
