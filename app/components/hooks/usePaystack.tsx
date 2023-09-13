import { useContext } from "react";
import { store } from "../StoreProvider";
import { usePaystackPayment } from "react-paystack";

const TestPublicKey = "pk_test_2738ea7b83386afd8897e7092bbe084d785adc92";

export type Currency = "USD" | "NGN";

export interface MyPaystackProps {
  amount: number;
  currency: Currency;
}

const usePaystack = (data: MyPaystackProps) => {
  const {
    state: { activeUser },
  } = useContext(store);

  const initiateTrans = usePaystackPayment({
    email: activeUser?.email as string,
    amount: data.amount * 100,
    currency: data.currency,
    publicKey: TestPublicKey,
    label: "Fingreat Payment"
  });

  return {
    initiateTrans,
  };
};

export default usePaystack;
