import { userTokenKey } from "@/utils/contants"
import { useEffect, useState } from "react"
import {useRouter} from "next/navigation"

const withoutAuth = <T extends Object>(WrapperComponent: React.ComponentType<T>) => {
    const Wrapper = (props:T) => {

        const [checking, setChecking] = useState(true)
        const Router = useRouter()

        useEffect(() => {
            const userToken = localStorage.getItem(userTokenKey)
            if(userToken){
                Router.push("/")
            }else{
                setChecking(false)
            }
        }, [])

        if(checking){
            return <h3>Loading... Please wait</h3>
        }

        return <WrapperComponent {...props} />
    }

    return Wrapper
}

export default withoutAuth