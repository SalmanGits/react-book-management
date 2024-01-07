import { NetworkConfiguration, APIURL } from "../network/NetworkConfiguration.js";
import { callAPI } from "../network/NetworkConnection.js"


const getAllBooks = (page, size) => {
    return callAPI(`${APIURL + NetworkConfiguration.GET_ALL_BOOKS}?page=${page}&limit=${size}`, "GET", null, {});
};
const getBooksOfUser = () => {
    return callAPI(`${APIURL + NetworkConfiguration.GET_BOOKS_USER}`, "GET", null, {});
};
const publishBook = (body) => {
    return callAPI(APIURL + NetworkConfiguration.PUBLISH_BOOK, "POST", body, {});
};
const unpublishBook = (id) => {
    return callAPI(`${APIURL + NetworkConfiguration.UNPUBLISH_BOOK + id}`, "PUT", JSON.stringify({}), {});
};
const searchBook = (title) => {
    return callAPI(`${APIURL + NetworkConfiguration.SEARCH_BOOKS}?title=${title}`, "GET", null, {});
};

export const BookService = {
    getAllBooks,
    getBooksOfUser,
    publishBook,
    unpublishBook,
    searchBook

};
