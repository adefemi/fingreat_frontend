'use client'

import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { store } from "./StoreProvider";

const ToastLayout = () => {

    const {state:{modalState}} = useContext(store)

    if(!modalState){
        return <ToastContainer />
    }

    return null
}

export default ToastLayout