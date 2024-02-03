import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import userImage from "../../image/user.jpg"
import API from "../../utils/api";

const ProfileUser = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getPicture();
  }, []);

  const getPicture = async () => {
    axios.get(API.PROFILE_URL)
      .then(response => {
        if (response.data && response.data.picture) {
          // console.log(response.data.picture);
          const imageUrl = response.data.picture;
          setImageSrc(imageUrl);
        } else {
          // console.log('Data picture tidak ditemukan dalam response.');
          setImageSrc(false);
        }
      })
      .catch(error => {
        setImageSrc(false);
        console.error('Error fetching data:', error);
      })
  }

  return (
    <div className="container" >
      <h1 className="title">Profile</h1>
      <h2 className="subtitle">
        Welcome Back <strong>{user && user.name}</strong>
      </h2>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box has-background-primary">
            <div className="content ">
              <div className="field has-text-white is-flex is-justify-content-center">
                <figure className="image is-128x128">
                  {imageSrc === false ? (
                    <img className="is-rounded" src={userImage} alt="user profile" />
                  ) : (
                    <img className="is-rounded" src={imageSrc} alt="user profile" />
                  )}
                </figure>
              </div>
              <div className="field has-text-white is-flex is-justify-content-center">
                <label className="label has-text-white ">Name: &nbsp;<label className="has-text-weight-semibold">
                  {user && user.name}
                </label></label>
              </div>
              <div className="field has-text-white is-flex is-justify-content-center">
                <label className="label has-text-white">Email: &nbsp;<label className="has-text-weight-semibold">
                  {user && user.email}
                </label></label>
              </div>
              <div className="field has-text-white is-flex is-justify-content-center">
                <label className="label has-text-white">NIK/NIS: &nbsp;<label className="has-text-weight-semibold">
                  {user && user.nik_nis}
                </label></label>
              </div>
              <div className="field">
                <label className="label has-text-white is-flex is-justify-content-center">Role: &nbsp;<label className="has-text-weight-semibold">
                  {user && user.role}
                </label></label>
              </div>
              {user && user.registration_status === "waiting-verification" && (
                <>
                  <div className="field">
                    <label className="label has-text-white is-flex is-justify-content-center">Status: &nbsp;<label className="has-text-weight-semibold ">
                      {user && user.registration_status}
                    </label></label>
                  </div>
                  <div className="field mt-5">
                    <label className="has-text-weight-semibold is-flex is-justify-content-center">
                      Your Account Is Still In The Verification Stage,<br />Wait Until The Admin Approves Your Registration Request
                    </label>
                  </div>
                </>
              )}
              {user && user.registration_status === "Rejected" && (
                <>
                  <div className="field">
                    <label className="label has-text-white is-flex is-justify-content-center">Status: &nbsp;<label className="has-text-weight-semibold ">
                      {user && user.registration_status}
                    </label></label>
                  </div>
                  <div className="field">
                    <label className="label has-text-white is-flex is-justify-content-center">Information: &nbsp;<label className="has-text-weight-semibold ">
                      {user && user.information}
                    </label></label>
                  </div>
                </>
              )}
              {user && user.registration_status === "Verified" && (
                <div className="is-flex is-justify-content-center">
                  <Link
                    to={`/profile/edit`}
                    className="button is-info mt-5 mr-2"
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to={`/profile/upload-profile`}
                    className="button is-success mt-5"
                  >
                    Upload Profile
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="columns is-centered" style={{marginTop : "30vh"}}>
        <a href="javascript:window.print()" className="is-centered mt-6">Download Profile Page as a PDF</a>
      </div> */}
    </div>
  );
};

export default ProfileUser;
