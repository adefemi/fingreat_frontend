import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { accountUrl } from "@/utils/network";
import { store } from "./StoreProvider";
import { AccountType } from "./Accounts";
import useAxiosHandler from "@/utils/axiosHandler";
import usePaystack, { Currency, MyPaystackProps } from "./hooks/usePaystack";

interface AddMoneyType {
  completeOperation: () => void;
  accounts: AccountType[];
}

const AddMoney = ({ completeOperation, accounts }: AddMoneyType) => {
  const [loading, setLoading] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const { axiosHandler } = useAxiosHandler();
  const [data, setData] = useState<MyPaystackProps>({
    amount: 0,
    currency: "NGN",
  });
  const { initTransaction } = usePaystack({
    amount: data.amount,
    currency: data.currency,
  });

  const onComplete = async (response: any) => {
    const arg = {
      reference: response.reference,
      status: response.status,
      to_account_id: parseInt(form.current?.to_account_id.value),
      amount: data.amount,
    };

    const res = await axiosHandler({
      method: "POST",
      url: accountUrl.addMoney,
      isAuthorized: true,
      data: arg,
    });

    setLoading(false);

    if (res.data) {
      form.current?.reset()
      toast("Transaction successful", { type: "success" });
      completeOperation();
    }
  };

  useEffect(() => {
    if(data.amount > 0){
      const tmp:any = (res:any) => {
        onComplete(res)
      }
      initTransaction(tmp, () => {setLoading(false)})
    }
  }, [data])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const amount = parseFloat(form.current?.amount.value);
    const currency = accounts.find(
      (account) => account.id.toString() === form.current?.to_account_id.value
    )?.currency as unknown as Currency;
    setData({amount, currency})
  };

  return (
    <div>
      <div className="modalHeading">
        <div className="title">Send Money</div>
      </div>
      <form ref={form} onSubmit={onSubmit}>
        <div className="modalBody userUpdate">
          <div className="formGroup">
            <label htmlFor="Username">To Account</label>
            <select name="to_account_id" required>
              <option value="">Select Account</option>
              {accounts.map((account, index) => (
                <option key={index} value={account.id}>{`${
                  account.currency
                } - ${account.balance.toFixed(2)}`}</option>
              ))}
            </select>
          </div>
          <div className="formGroup">
            <label htmlFor="Username">Amount</label>
            <input name="amount" type="number" required />
          </div>
        </div>
        <div className="modalFooter">
          <button type="submit" disabled={loading}>
            Submit{loading && "ting..."}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMoney;
