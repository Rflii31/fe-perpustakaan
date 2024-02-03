import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../../utils/api";

const FormEditApplicant = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [rejectedReason, setRejectedReason] = useState("");
  const [msg, setMsg] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getApplicantById = async () => {
      try {
        const response = await axios.get(`${API.DETAIL_APPLICANT_URL}${id}`);
        setName(response.data.name);
        setStatus(response.data.registration_status);
        if (response.data.registration_status === "Rejected") {
          setRejectedReason(response.data.rejected_reason || ""); // Tambahkan handling untuk alasan rejection
        }
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getApplicantById();
  }, [id]);

  const updateApplicant = async (e) => {
    e.preventDefault();
    setIsMutating(true);
    try {
      await axios.patch(`${API.EDIT_APPLICANT_URL}${id}`, {
        registration_status: status,
        information: rejectedReason,
      });
      navigate("/applicants");
    } catch (error) {
      if (error.response) {
        setMsg("Invalid Switch Status Account");
        // setMsg(error.response.data.msg);
      }
    }
    setIsMutating(false);
  };
  return (
    <div>
      <h1 className="title">Applicants</h1>
      <h2 className="subtitle">Update Registration Status {name}</h2>
      <Link to="/applicants" className="button is-danger mb-2">
        Cancel
      </Link>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateApplicant}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={status}
                      onChange={(e) => {setStatus(e.target.value)
                        if (e.target.value !== "Rejected") {
                          setRejectedReason("");
                        }
                        }}
                    >
                      <option value="waiting-verification">Waiting Verification</option>
                      <option value="Verified">Verified</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
              {status === "Rejected" && (
                <div className="field">
                  <label className="label">Reason for Rejection</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={rejectedReason}
                      onChange={(e) => setRejectedReason(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
              <div className="field">
                <div className="control">
                  {!isMutating ? (
                    <button type="submit" className="button is-success">
                      Update
                    </button>
                  ) : (
                    <button type="submit" className="button is-success">
                      Updating...
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditApplicant;
