import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import API from "../../utils/api";
import { useSelector } from "react-redux";

const PageDetailBook = () => {
    const [cover, setCover] = useState("");
    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [publication, setPublication] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [msg, setMsg] = useState("");
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const getBookById = async () => {
            try {
                const response = await axios.get(
                    `${API.DETAIL_BOOK_URL}${id}`
                );
                setCover(response.data.cover);
                setCode(response.data.code);
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setPublisher(response.data.publisher);
                setPublication(response.data.publication_year);
                setDescription(response.data.description);
                setStatus(response.data.book_status);
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
            <h1 className="title">Books</h1>
            <h2 className="subtitle">Detail Book <label>{title}</label></h2>
            <div className="card is-shadowless">
                <div className="card-content" style={{ height: '75vh' }}>
                    <p className="has-text-centered">{msg}</p>
                    <div className="content is-flex">
                        <div>
                            <div className="field" style={{ width: '60vh' }}>
                                <figure className="image">
                                    <img width="110" height="138" src={cover} alt="cover book" style={{height: '65vh'}}/>
                                </figure>
                            </div>
                        </div>
                        <div className="column" style={{ height: '65vh', overflow: 'auto' }}>
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
                                    Title: &nbsp;
                                    <label className="has-text-weight-semibold">
                                        {title}
                                    </label>
                                </label>
                            </div>
                            <div className="field">
                                <label className="label">
                                    Author: &nbsp;
                                    <label className="has-text-weight-semibold">
                                        {author}
                                    </label>
                                </label>
                            </div>
                            <div className="field">
                                <label className="label">
                                    Publisher: &nbsp;
                                    <label className="has-text-weight-semibold">
                                        {publisher}
                                    </label>
                                </label>
                            </div>
                            <div className="field">
                                <label className="label">
                                    Publication Year: &nbsp;
                                    <label className="has-text-weight-semibold">
                                        {publication}
                                    </label>
                                </label>
                            </div>
                            <div className="field">
                                <label className="label">
                                    Description: &nbsp;
                                    <label className="has-text-weight-semibold">
                                        {description}
                                    </label>
                                </label>
                            </div>
                            <div className="field">
                                <label className="label">
                                    Current Status Of The Book: &nbsp;
                                    <label className="has-text-weight-semibold">
                                        {status}
                                    </label>
                                </label>
                            </div>
                            <div className="field " style={{ marginTop: '1vh' }}>
                                {user && user.role === "Member" && (
                                    <>
                                        <div className="control">
                                            <Link to={`/books/borrowing/${id}`} className="button is-success mr-1">
                                                Borrow
                                            </Link>
                                            <Link to="/books" className="button is-danger">
                                                Close
                                            </Link>
                                        </div>
                                    </>
                                )}
                                {user && user.role !== "Member" && (
                                    <div className="control">
                                        <Link to="/books" className="button is-info">
                                            Close
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PageDetailBook;
