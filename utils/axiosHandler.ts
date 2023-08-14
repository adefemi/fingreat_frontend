import axios, { AxiosError, AxiosResponse } from "axios"
import { userTokenKey } from "./contants"
import { errorHandler } from "./errorHandler"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"

interface AxiosReturnType<T> {
    response: T,
    error: AxiosError | null,
}

const axiosHandler = async <T> ({
    method,url, data, isAuthenticated, router, handleError = true
}: {
    method: "GET" | "POST" | "PATCH",
    url: string,
    data?: {[key:string]: string | number}
    isAuthenticated?: boolean
    handleError?: boolean
    router?:AppRouterInstance
}):Promise<AxiosReturnType<T>> => {

    const config = {
        url,
        method,
        data,
        headers: {}
    }

    if(isAuthenticated){
        const userToken = localStorage.getItem(userTokenKey)
        config.headers = {
            "Authorization": "Bearer " + userToken
        }
    }

    let _error:AxiosError|null = null

    const response = await axios(config).catch((e: AxiosError) => {
        if(router && e.response?.status === 401){
            localStorage.removeItem(userTokenKey)
            router.push("/login")
        }
        if(handleError){
            errorHandler(e)
        }
        else{
            _error = e
        }
    }) as AxiosResponse<T>

    return {
        response: response?.data,
        error: _error
    }
}

export default axiosHandler