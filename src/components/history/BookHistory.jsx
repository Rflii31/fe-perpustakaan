import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../../utils/api";

const HistoryList = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        const response = await axios.get(API.HISTORY_LIST_URL);
        setBooks(response.data);
    };

    return (
        <div>
            <h1 className="title">History</h1>
            <h2 className="subtitle">List of Book Borrowing History</h2>
            
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Book Title</th>
                        <th>Book Status</th>
                        <th>Borrow Date</th>
                        <th>Due Date</th>
                        <th>Returned Date</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book.borrowing_id}>
                            <td>{index + 1}</td>
                            <td>{book.book.title}</td>
                            <td>{book.borrowing_status}</td>
                            <td>{book.borrow_date}</td>
                            <td>{book.due_date}</td>
                            <td>{book.returned_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryList;
