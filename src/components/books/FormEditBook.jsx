import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as yup from 'yup';
import API from "../../utils/api";

const FormEditBook = () => {
  const [titleEdit, setTitleEdit] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publication, setPublication] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [publisherError, setPublisherError] = useState("");
  const [publicationError, setPublicationError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [msg, setMsg] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    author: yup.string().required('Author is required'),
    publisher: yup.string().required('Publisher is required'),
    publication: yup.string().required('Publication Year is required'),
    description: yup.string().required('Description is required'),
  })

  useEffect(() => {
    const getBookById = async () => {
      try {
        const response = await axios.get(
          `${API.DETAIL_BOOK_URL}${id}`
        );
        setTitleEdit(response.data.title);
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

  const updateBook = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(
        {
          title,
          author,
          publisher,
          publication,
          description,
        },
        { abortEarly: false }
      );

      setTitleError('');
      setAuthorError('');
      setPublisherError('');
      setPublicationError('');
      setDescriptionError('');

      setIsMutating(true)

      try {
        await axios.patch(`${API.EDIT_BOOK_URL}${id}`, {
          title: title,
          author: author,
          publisher: publisher,
          publication_year: publication,
          description: description,
        });

        navigate("/books");
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    } catch (error) {
      const errorMessages = error.inner.reduce((messages, err) => {
        messages[err.path] = err.message;
        return messages;
      }, {});

      setTitleError(errorMessages.title || '');
      setAuthorError(errorMessages.author || '');
      setPublisherError(errorMessages.publisher || '');
      setPublicationError(errorMessages.publication || '');
      setDescriptionError(errorMessages.description || '');

      setIsMutating(false)
    }
  };

  return (
    <div>
      <h1 className="title">Books</h1>
      <h2 className="subtitle">Edit Book <label>{titleEdit}</label></h2>
      <Link to="/books" className="button is-danger mb-2">
        Cancel
      </Link>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateBook}>
              <p className="has-text-centered has-text-danger">{msg}</p>
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Book Title"
                  />
                </div>
                {titleError && <p className="has-text-centered has-text-danger">{titleError}</p>}
              </div>
              <div className="field">
                <label className="label">Author</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                  />
                </div>
                {authorError && <p className="has-text-centered has-text-danger">{authorError}</p>}
              </div>
              <div className="field">
                <label className="label">Publisher</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    placeholder="Publisher"
                  />
                </div>
                {publisherError && <p className="has-text-centered has-text-danger">{publisherError}</p>}
              </div>
              <div className="field">
                <label className="label">Publication Year</label>
                <div className="control">
                  <input
                    type="date"
                    className="input"
                    value={publication}
                    onChange={(e) => setPublication(e.target.value)}
                    placeholder="Publication"
                  />
                </div>
                {publicationError && <p className="has-text-centered has-text-danger">{publicationError}</p>}
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea
                    type="text"
                    cols={3}
                    row={50}
                    className="input"
                    style={{ height: '90px' }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>
                {descriptionError && <p className="has-text-centered has-text-danger">{descriptionError}</p>}
              </div>

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

export default FormEditBook;
