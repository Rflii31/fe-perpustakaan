import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../../features/authSlice";
import * as Yup from "yup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  })

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/profile");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(
        {
          email,
          password
        },
        { abortEarly: false }
      );

      setEmailError('');
      setPasswordError('');


      dispatch(LoginUser({ email, password }));
    } catch (error) {
      const errorMessages = error.inner.reduce((messages, err) => {
        messages[err.path] = err.message;
        return messages;
      }, {});

      setEmailError(errorMessages.email || '');
      setPasswordError(errorMessages.password || '');
    }
  };

  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={Auth} className="box">
                <h1 className="title is-2">Login</h1>
                {isError && <p className="has-text-centered has-text-danger">{message}</p>}
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="YourEmail@example.com"
                    />
                  </div>
                  {emailError && <p className="has-text-centered has-text-danger">{emailError}</p>}
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="****"
                    />
                  </div>
                  {passwordError && <p className="has-text-centered has-text-danger">{passwordError}</p>}
                </div>
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
                <p className="text-black">Don&apos;t have an account?</p>
                <a href="register" ><span className="text-blue-300">Register here!</span></a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
