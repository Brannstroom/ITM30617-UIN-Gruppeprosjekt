
export const isUserLoggedIn = () => {
    return localStorage.getItem("user") ? true : false;
}