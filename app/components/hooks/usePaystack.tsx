import { useContext } from "react"
import {usePaystackPayment} from "react-paystack"
import { store } from "../StoreProvider"

const TestPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY

export type Currency = "USD" | "NGN"

export interface MyPaystackProps {
    amount: number,
    currency: Currency
}

const usePaystack = ({amount, currency}: MyPaystackProps) => {
    const {state:{activeUser}} = useContext(store)

    const initTransaction = usePaystackPayment({
        email: activeUser?.email as string,
        amount: amount * 100,
        currency,
        publicKey: TestPublicKey as string,
        label: "Fingreat Payment"
    })

    return {
        initTransaction
    }
}

export default usePaystack