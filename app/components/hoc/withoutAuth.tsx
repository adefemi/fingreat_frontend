'use client'

import { userTokenKey } from "@/utils/contants";
import { ComponentType } from "react";
import {useRouter} from "next/navigation"

const withoutAuth = <P extends object>(WrapperComponent:ComponentType<P>) => {
    const Wrapper = (props:P) => {
        const Router = useRouter()

        // localStorage is only available with the client side
        const userToken = localStorage.getItem(userTokenKey)
        if(userToken){
            Router.push("/")
            return null
        }

        return <WrapperComponent {...props} />
    }

    return Wrapper
}

export default withoutAuth