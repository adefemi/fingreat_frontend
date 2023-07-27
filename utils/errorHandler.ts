import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const errorHandler = (e:AxiosError) => {
    toast(JSON.stringify(e.response?.data) || e.message, {
        type: 'error',
      })
}