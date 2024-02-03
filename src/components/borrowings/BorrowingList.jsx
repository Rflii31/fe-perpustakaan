import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import axios from "axios";
import API from "../../utils/api";
import { IoSearch } from "react-icons/io5";

const BorrowingBookList = () => {
    const [books, setBooks] = useState([]);
    const [filterBook, setFilterBook] = useState("");
    // const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        const response = await axios.get(API.LIST_BORROWING_URL);
        setBooks(response.data);
    };

    const filteredBooks = books.filter((book) =>
        book.bookId.title.toLowerCase().includes(filterBook.toLowerCase())
    );

    return (
        <div>
            <h1 className="title">Borrowing Books</h1>
            <h2 className="subtitle">List of Borrowing Books</h2>
            <div className="is-flex is-justify-content-space-between">
                <div className="is-flex is-align-items-center mb-2 mr-5">
                    <div className="panel-block">
                        <p className="control has-icons-left">
                            <input
                                className="input"
                                type="search"
                                placeholder="Filter by Title"
                                value={filterBook}
                                onChange={(e) => setFilterBook(e.target.value)}
                            />
                            <span className="icon is-left">
                                <IoSearch />
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Code</th>
                        <th>Book Title</th>
                        <th>Borrower Name</th>
                        <th>Borrow Date</th>
                        <th style={{width: '25vh'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map((book, index) => (
                        <tr key={book.borrowing_id}>
                            <td>{index + 1}</td>
                            <td>{book.code}</td>
                            <td>{book.bookId.title}</td>
                            <td>{book.userId.nama}</td>
                            <td>{book.borrow_date}</td>
                            <td>
                                <div>
                                    <Link
                                        to={`/borrowing-book/detail/${book.borrowing_id}`}
                                        className="button is-small is-info mr-1"
                                    >
                                        Detail
                                    </Link>
                                    <Link
                                        to={`/borrowing-book/returned/${book.borrowing_id}`}
                                        className="button is-small is-success"
                                    >
                                        Returned
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BorrowingBookList;
