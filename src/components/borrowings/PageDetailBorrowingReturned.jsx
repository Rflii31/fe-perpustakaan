import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import API from "../../utils/api";

const PageDetailBorrowingReturned = () => {
    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [borrowDate, setBorrowDate] = useState("");
    const [returnedDate, setReturnedDate] = useState("");
    const [status, setStatus] = useState("");
    const [msg, setMsg] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const getBookById = async () => {
            try {
                const response = await axios.get(
                    `${API.DETAIL_BORROWING_RETURNED_URL}${id}`
                );
                setCode(response.data.code);
                setTitle(response.data.bookId.title);
                setName(response.data.userId.nama);
                setBorrowDate(response.data.borrow_date);
                setReturnedDate(response.data.returned_date);
                setStatus(response.data.borrowing_status);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getBookById();
    }, [id]);


    return (
        <div>
            <h1 className="title">Borrowing Returned Book</h1>
            <h2 className="subtitle">Detail Borrowing Returned Book <label>{title}</label></h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <p className="has-text-centered">{msg}</p>
                        <div className="field">
                            <label className="label">
                                Code: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {code}
                                </label>
                            </label>
                        </div>
                        <div className="field">
                            <label className="label">
                                Book Title: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {title}
                                </label>
                            </label>
                        </div>
                        <div className="field">
                            <label className="label">
                                Borrower Name: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {name}
                                </label>
                            </label>
                        </div>
                        <div className="field">
                            <label className="label">
                                Book Status: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {status}
                                </label>
                            </label>
                        </div>
                        <div className="field">
                            <label className="label">
                                Borrow Date: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {borrowDate}
                                </label>
                            </label>
                        </div>
                        <div className="field">
                            <label className="label">
                                Returned Date: &nbsp;
                                <label className="has-text-weight-semibold">
                                    {returnedDate}
                                </label>
                            </label>
                        </div>
                        <div className="field" style={{ marginTop: '30vh' }}>
                            <div className="control">
                                <Link to="/borrowing-returned" className="button is-info is-fullwidth">
                                    Close
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageDetailBorrowingReturned;
