const baseUrl = "http://localhost:8000"

export const authUrl = {
    register: baseUrl + "/auth" + "/register",
    login: baseUrl + "/auth" + "/login",
}

export const userUrl = {
    me: baseUrl + "/users" + "/me",
    updateUsername: baseUrl + "/users" + "/username",
}

export const accountUrl = {
    accounts: baseUrl + "/account",
    create: baseUrl + "/account" + "/create",
    transfer: baseUrl + "/account" + "/transfer",
}