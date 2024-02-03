const BASE_URL = 'http://localhost:2000';

export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const PROFILE_URL = `${BASE_URL}/user/profile`;
export const EDIT_PROFILE_URL = `${BASE_URL}/user/edit-profile/`;
export const UPLOAD_PROFILE_URL = `${BASE_URL}/user/upload-picture`;
export const LIST_BOOK_URL = `${BASE_URL}/books`;
export const ADD_BOOK_URL = `${BASE_URL}/books`;
export const DETAIL_BOOK_URL = `${BASE_URL}/books/`;
export const EDIT_BOOK_URL = `${BASE_URL}/books/`;
export const DELETE_BOOK_URL = `${BASE_URL}/books/`;
export const LIST_APPLICANT_URL = `${BASE_URL}/member-applicant`;
export const DETAIL_APPLICANT_URL = `${BASE_URL}/member-applicant/`;
export const LIST_REJECTED_URL = `${BASE_URL}/member-applicant-rejected`;
export const DETAIL_REJECTED_URL = `${BASE_URL}/member-applicant-rejected/`;
export const EDIT_APPLICANT_URL = `${BASE_URL}/member-applicant/`;
export const LIST_BORROWING_URL = `${BASE_URL}/borrow`;
export const DETAIL_BORROWING_URL = `${BASE_URL}/borrow/`;
export const LIST_BORROWING_RETURNED_URL = `${BASE_URL}/borrow-returned`;
export const DETAIL_BORROWING_RETURNED_URL = `${BASE_URL}/borrow-returned/`;
export const LIST_USERS_URL = `${BASE_URL}/member-list/users`;
export const DETAIL_USERS_URL = `${BASE_URL}/member-list/users/`;
export const EDIT_USERS_URL = `${BASE_URL}/member-list/update-role/`;
export const BORROWING_BOOK_URL = `${BASE_URL}/borrow`; 
export const HISTORY_LIST_URL = `${BASE_URL}/history`; 
export const RETURNED_BOOK_URL = `${BASE_URL}/return-book/`; 

const API = {
    // Auth
    LOGIN_URL,
    REGISTER_URL,
    LOGOUT_URL,
    // Profile
    PROFILE_URL,
    EDIT_PROFILE_URL,
    UPLOAD_PROFILE_URL,
    // Books
    LIST_BOOK_URL,
    ADD_BOOK_URL,
    DETAIL_BOOK_URL,
    EDIT_BOOK_URL,
    DELETE_BOOK_URL,
    BORROWING_BOOK_URL,
    // History
    HISTORY_LIST_URL,
    // Applicants
    LIST_APPLICANT_URL,
    DETAIL_APPLICANT_URL,
    LIST_REJECTED_URL,
    DETAIL_REJECTED_URL,
    EDIT_APPLICANT_URL,
    // Borrowings
    LIST_BORROWING_URL,
    DETAIL_BORROWING_URL,
    LIST_BORROWING_RETURNED_URL,
    DETAIL_BORROWING_RETURNED_URL,
    RETURNED_BOOK_URL,
    // Users
    LIST_USERS_URL,
    DETAIL_USERS_URL,
    EDIT_USERS_URL,
};

export default API;