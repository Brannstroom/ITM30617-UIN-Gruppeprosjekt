
export const isUserLoggedIn = () => {
    return localStorage.getItem("user") ? true : false;
}

export const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
}