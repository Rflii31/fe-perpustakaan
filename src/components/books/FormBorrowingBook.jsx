import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../../utils/api";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { IoCalendar } from "react-icons/io5";

const FormBorrowingBook = () => {
    const [dueDate, setDueDate] = useState(null);
    const [dateError, setDateError] = useState("");
    const [cover, setCover] = useState("");
    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [publication, setPublication] = useState("");
    const [description, setDescription] = useState("");
    const [isMutating, setIsMutating] = useState(false);
    const [msg, setMsg] = useState("");
    const maxDate = moment().add(7, 'days').toDate();
    const navigate = useNavigate();
    const { id } = useParams();

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
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getBookById();
    }, [id]);

    const borrowingBook = async (bookId) => {
        
        if(!dueDate) {
            setDateError("Due Date is required")
            return;
        }
        
        setIsMutating(true)
        try {
            await axios.post(API.BORROWING_BOOK_URL, {
                due_date: dueDate,
                bookId: id
            });
            setIsMutating(false);
            alert("Book successfully borrowed");
            navigate("/books");
        } catch (error) {
            setIsMutating(false);
            setMsg(error.response.data.msg);
            console.error("Error borrowing book:", error);
        }
    }

    return (
        <div>
            <h1 className="title">Borrowing Books</h1>
            <h2 className="subtitle">Are you sure to borrow <label>{title}</label></h2>

            <div className="card is-shadowless">
                <div className="card-content" style={{ height: '75vh' }}>
                    <p className="has-text-centered has-text-danger">{msg}</p>
                    <div className="content is-flex">
                        <div>
                            <div className="field has-text-white is-flex is-justify-content-center" style={{ marginBottom: '9vh' }}>
                                <figure className="image">
                                    <img width="110" height="138" src={cover} alt="cover book" style={{ height: '65vh' }} />
                                </figure>
                            </div>
                        </div>
                        <div className="column mr-2" style={{ height: '65vh', overflow: 'auto' }}>
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
                        </div>
                        <div className="mx-1 mt-2" style={{ width: '28vh' }}>
                            <div className="has-text-centered">
                                {!isMutating ? (
                                    <>
                                    <p className="has-text-centered has-text-danger">{dateError}</p>
                                        <div className="panel-block">
                                            <div className="control has-icons-right my-2">
                                                <DatePicker
                                                    selected={dueDate}
                                                    onChange={date => setDueDate(date)}
                                                    dateFormat="yyyy-MM-dd"
                                                    className="form-control py-2"
                                                    minDate={new Date()}
                                                    maxDate={maxDate}
                                                    placeholderText="Select due date"
                                                />
                                                <span className="icon is-small is-right">
                                                    <IoCalendar />
                                                </span>
                                            </div>
                                        </div>
                                        <button onClick={borrowingBook} type="submit" className="button is-success is-fullwidth ms-2 mb-2">
                                            Borrow
                                        </button>
                                    </>
                                ) : (
                                    <button type="submit" className="button is-success is-fullwidth ms-2 mb-2">
                                        Borrowing...
                                    </button>
                                )}
                                <Link to="/books" className="button is-danger is-fullwidth ms-2">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormBorrowingBook