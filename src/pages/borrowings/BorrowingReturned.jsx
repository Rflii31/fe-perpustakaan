import React, { useEffect } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import BorrowingReturnedList from "../../components/borrowings/BorrowingReturnedList";

const BorrowingReturned = () => {
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

    if (user && user.role !== "Developer" && user.role !== "Librarian") {
      navigate("/profile");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <BorrowingReturnedList />
    </Layout>
  );
};

export default BorrowingReturned;
