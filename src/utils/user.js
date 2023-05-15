export const getUser = () => {
    let user = localStorage.getItem("user");
    return user ? JSON.parse(user)[0] : null;
}