import React, { useEffect } from "react";
import Layout from "../Layout";
import BookList from "../../components/books/BookList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const Books = () => {
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
      <BookList />
    </Layout>
  );
};

export default Books;
