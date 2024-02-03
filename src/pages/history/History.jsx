import React, { useEffect } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import HistoryList from "../../components/history/BookHistory";

const History = () => {
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

    if (user && user.registration_status !== "Verified") {
      navigate("/profile");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <HistoryList />
    </Layout>
  );
};

export default History;
