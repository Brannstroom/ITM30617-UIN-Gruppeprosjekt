
export const isUserLoggedIn = () => {
    let user = localStorage.getItem("user");
    return user ? true : false;
}

export const handleLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "/library";
}

export const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
}