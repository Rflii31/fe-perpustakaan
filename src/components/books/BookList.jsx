import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import API from "../../utils/api";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filterBook, setFilterBook] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const response = await axios.get(API.LIST_BOOK_URL);
    setBooks(response.data);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(filterBook.toLowerCase())
  );

  // const getDetail = () =>{
  //   navigate(`/books/detail/${book.id}`)
  // }

  return (
    <div>
      <h1 className="title">Books</h1>
      <h2 className="subtitle">List of Books</h2>
      {user && user.role === "Member" ? (
        <>
          <div className="is-flex is-justify-content-space-between is-align-items-center">
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
          
          <div className="columns is-multiline is-2">
            {filteredBooks.map((book) => (
              <div key={book.id} className="column is-one-fourth">
                <Link to={`/books/detail/${book.id}`}>
                  <div className="card" style={{ height: '400px', width: '240px' }}>
                    <div className="card-image is-flex has-text-centered">
                      <figure className="image" style={{ width: '240px', height: '300px' }}>
                        <img
                          src={book.cover}
                          alt="Cover Book"
                          style={{ width: '240px', height: '300px' }}
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <p className="title is-6">{book.title}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="is-flex is-justify-content-space-between">
            <div className="mb-2">
              <Link to="/books/add" className="button is-primary">
                Add New
              </Link>
            </div>

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
                <th>Cover</th>
                <th>Title</th>
                <th>Author</th>
                {/* <th>Publisher</th> */}
                <th>Book Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td><img src={book.cover} style={{ width: '80px', height: '100px' }} alt="Cover Book" /></td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  {/* <td>{book.publisher}</td> */}
                  <td>{book.book_status}</td>
                  <td>
                    <div>
                      <Link
                        to={`/books/detail/${book.id}`}
                        className="button is-small is-info mr-1"
                      >
                        Detail
                      </Link>
                      <Link
                        to={`/books/borrowing/${book.id}`}
                        className="button is-small is-success mr-1"
                      >
                        Borrow
                      </Link>
                      <Link
                        to={`/books/edit/${book.id}`}
                        className="button is-small is-warning mr-1"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/books/delete/${book.id}`}
                        className="button is-small is-danger"
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default BookList;
