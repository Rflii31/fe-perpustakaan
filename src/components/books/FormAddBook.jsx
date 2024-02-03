import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import * as yup from 'yup';
import API from "../../utils/api";

const FormAddBook = () => {
  const [cover, setCover] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publication, setPublication] = useState("");
  const [description, setDescription] = useState("");
  const [coverError, setCoverError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [publisherError, setPublisherError] = useState("");
  const [publicationError, setPublicationError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [msg, setMsg] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    cover: yup.string().required('Cover is required'),
    title: yup.string().required('Title is required'),
    author: yup.string().required('Author is required'),
    publisher: yup.string().required('Publisher is required'),
    publication: yup.string().required('Publication Year is required'),
    description: yup.string().required('Description is required'),
  });

  const saveProduct = async (e) => {
    e.preventDefault();

    setIsMutating(true)
    try {
      await validationSchema.validate(
        {
          cover,
          title,
          author,
          publisher,
          publication,
          description,
        },
        { abortEarly: false }
      );

      const dataToSend = new FormData ();
      dataToSend.append('title', title);
      dataToSend.append('author', author);
      dataToSend.append('publisher', publisher);
      dataToSend.append('publication_year', publication);
      dataToSend.append('description', description);
      dataToSend.append('bookCover', cover);

      // console.log(dataToSend)
      await axios.post(API.ADD_BOOK_URL, dataToSend);
      navigate("/books");
    } catch (error) {
      if (error.inner) {
        const errorMessages = error.inner.reduce((messages, err) => {
          messages[err.path] = err.message;
          return messages;
        }, {});

        setCoverError(errorMessages.cover || '');
        setTitleError(errorMessages.title || '');
        setAuthorError(errorMessages.author || '');
        setPublisherError(errorMessages.publisher || '');
        setPublicationError(errorMessages.publication || '');
        setDescriptionError(errorMessages.description || '');
        setMsg(JSON.stringify(errorMessages));
      } else {
        setMsg(error.message);
      }
    }
    setIsMutating(false)
  };

  return (
    <div>
      <h1 className="title">Books</h1>
      <h2 className="subtitle">Add New Book</h2>
      <Link to="/books" className="button is-danger mb-2">
        Cancel
      </Link>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveProduct}>
              <p className="has-text-centered has-text-danger">{msg}</p>
              <div className="field">
                <label className="label">Cover</label>
                <div className="control">
                  <input
                    type="file"
                    className="input"
                    accept="image/*"
                    onChange={(e) => setCover(e.target.files[0])}
                    placeholder="Cover"
                  />
                </div>
                {coverError && <p className="has-text-centered has-text-danger">{coverError}</p>}
              </div>
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
                    <button
                      type="submit"
                      className="button is-success is-fullwidth"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="button is-success is-fullwidth"
                    >
                      Saving...
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

export default FormAddBook;