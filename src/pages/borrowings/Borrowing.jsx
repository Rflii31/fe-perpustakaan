import React, { useEffect } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import BorrowingBookList from "../../components/borrowings/BorrowingList";

const BorrowingBook = () => {
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
      <BorrowingBookList />
    </Layout>
  );
};

export default BorrowingBook;
