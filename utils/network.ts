const baseUrl = "http://localhost:8000"

export const authUrl = {
    register: baseUrl + "/auth" + "/register",
    login: baseUrl + "/auth" + "/login",
}

export const userUrl = {
    me: baseUrl + "/users" + "/me",
    updateUsername: baseUrl + "/users" + "/username"
}

export const accountUrl = {
    list: baseUrl + "/account",
    add: baseUrl + "/account" + "/create",
    transfer: baseUrl + "/account" + "/transfer",
    addMoney: baseUrl + "/account" + "/add-money"
}