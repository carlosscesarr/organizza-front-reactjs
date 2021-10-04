
const isAuthenticated = () => {
    let userToken = localStorage.getItem("@controle-financeiro/token");
    if (userToken) {
        return true;
    }
    return false;
}

export default isAuthenticated;