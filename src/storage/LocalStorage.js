

export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};



export const getLocalStorage = (key) => {
    const response = {};
    response.token = localStorage.getItem(
        key
    );
    return response;
};
