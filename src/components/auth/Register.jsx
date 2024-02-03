import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

function RegisterPage() {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    nik_nis: Yup.number().required("NIK/NIS is required").positive().integer(),
    password: Yup.string().required("Password is required"),
    confPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      nik_nis: "",
      password: "",
      confPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(API.REGISTER_URL, {
          name: values.name,
          email: values.email,
          nik_nis: values.nik_nis,
          password: values.password,
          confPassword: values.confPassword,
        });
        if (response) {
          navigate("/login");
        } else {
          // console.log("gagal")
          setIsError(true);
          setMessage("Registration Failed.");
        }
      } catch (error) {
        setMessage(error.response.data.msg);
        console.error('There is an error', error);
      }
    },
  });

  return (
    <div className="columns is-centered mt-3">
      <div className="column is-4">
        <form onSubmit={formik.handleSubmit} className="box">
          <h1 className="title is-2">Registration</h1>
          {isError && <p className="has-text-centered has-text-danger">{message}</p>}
          {formik.errors && (
            <p className="has-text-centered has-text-danger">{formik.errors.message}</p>
          )}
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Name"
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="has-text-centered has-text-danger">{formik.errors.name}</p>
            )}
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="email"
                className="input"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="YourEmail@example.com"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="has-text-centered has-text-danger">{formik.errors.email}</p>
            )}
          </div>
          <div className="field">
            <label className="label">NIK/NIS</label>
            <div className="control">
              <input
                type="number"
                className="input"
                name="nik_nis"
                value={formik.values.nik_nis}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="12345"
              />
            </div>
            {formik.touched.nik_nis && formik.errors.nik_nis && (
              <p className="has-text-centered has-text-danger">{formik.errors.nik_nis}</p>
            )}
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                type="password"
                className="input"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="****"
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="has-text-centered has-text-danger">{formik.errors.password}</p>
            )}
          </div>
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                type="password"
                className="input"
                name="confPassword"
                value={formik.values.confPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="****"
              />
            </div>
            {formik.touched.confPassword && formik.errors.confPassword && (
              <p className="has-text-centered has-text-danger">{formik.errors.confPassword}</p>
            )}
          </div>
          <div className="field mt-5">
            <button type="submit" className="button is-success is-fullwidth">
              {formik.isSubmitting ? "Loading..." : "Register"}
            </button>
          </div>
          <p className="text-black">Already have an account?</p>
          <a href="/login">
            <span className="text-blue-300">Login here!</span>
          </a>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage