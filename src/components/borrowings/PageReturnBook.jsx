import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../../utils/api";

const PageReturnedBook = () => {
    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [borrowDate, setBorrowDate] = useState("");
    const [status, setStatus] = useState("");
    const [isMutating, setIsMutating] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getBookById = async () => {
            try {
                const response = await axios.get(
                    `${API.DETAIL_BORROWING_URL}${id}`
                );
                setCode(response.data.code);
                setTitle(response.data.bookId.title);
                setName(response.data.userId.nama);
                setBorrowDate(response.data.borrow_date);
                setStatus(response.data.borrowing_status);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getBookById();
    }, [id]);

    const returnedBook = async (borrowingId) => {
        setIsMutating(true);
        try {
            await axios.patch(`${API.RETURNED_BOOK_URL}${id}`);
            setIsMutating(false);
            alert("Book successfully returned")
            navigate("/borrowing-book")
        } catch (error) {
            setIsMutating(false);
            setMsg(error.response.data.msg);
            console.error("Error returned book:", error);
        }
    }

    return (
        <div>
            <h1 className="title">Returned Books</h1>
            <h2 className="subtitle">Returned Book <label>{title}</label></h2>
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
                        <div className="field is-fullwidth">
                            <div className="control has-text-centered">
                                {!isMutating ? (
                                    <button onClick={returnedBook} type="submit" className="button is-success mr-2">
                                        Returned
                                    </button>
                                ) : (
                                    <button type="submit" className="button is-success mr-2">
                                        Returned...
                                    </button>
                                )}
                                <Link to="/borrowing-book" className="button is-danger">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageReturnedBook;
