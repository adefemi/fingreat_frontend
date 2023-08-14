'use client'
import {store} from "@/utils/store";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";

const LayoutToast = () => {
    const {state:{modalStatus}} = useContext(store)
    if(!modalStatus){
        return <ToastContainer />
    }
    return null
}

export default LayoutToast