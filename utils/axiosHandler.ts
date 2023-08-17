import axios, { AxiosError, AxiosResponse } from "axios"
import { userTokenKey } from "./contants"
import { errorHandler } from "./errorHandler"
import useLogout from "@/app/components/hooks/useLogout"

interface AxiosHandlerType {
    method: "GET" | "POST" | "PATCH"
    url: string
    data?: {[key:string]: number | string}
    handleError?: boolean,
    isAuthorized?: boolean
}

interface ResponseType<T> {
    data?: T,
    error: AxiosError | null
}
const useAxiosHandler = () => {

    const {logout} = useLogout()

    const axiosHandler = async <T>({
        method, url, data, isAuthorized, handleError=true
    }:AxiosHandlerType):Promise<ResponseType<T>> => {
        const config = {
            url,
            method,
            data,
            headers: {}
        }
    
        if(isAuthorized){
            const userToken = localStorage.getItem(userTokenKey)
            config.headers = {
                "Authorization": `Bearer ${userToken}`
            }
        }
    
        let error = null
    
        const response = await axios(config).catch((e:AxiosError) => {
            if(e.response?.status === 401){
                logout()
            }
            if(handleError){
                errorHandler(e)
            }
            else{
                error = e
            }
        }) as AxiosResponse<T>
    
        return {
            data: response?.data,
            error
        }
    }

    return {
        axiosHandler
    }
}


export default useAxiosHandler