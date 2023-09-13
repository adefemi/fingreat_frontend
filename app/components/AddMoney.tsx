import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { accountUrl } from "@/utils/network";
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
  const [data, setData] = useState<MyPaystackProps>({
    amount: 0,
    currency: "NGN",
  });
  const { initiateTrans } = usePaystack({
    amount: data.amount,
    currency: data.currency,
  });
  const { axiosHandler } = useAxiosHandler();

  const onComplete: any = async (result: any) => {
    const arg = {
      to_account_id: parseInt(form.current?.to_account_id.value),
      amount: data.amount,
      status: result.status,
      reference: result.reference,
    };
    const res = await axiosHandler({
      method: "POST",
      url: accountUrl.addMoney,
      isAuthorized: true,
      data: arg,
    });
    setLoading(false);
    if (res.data) {
      toast("Transfer successful", { type: "success" });
      completeOperation();
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const amount = parseFloat(form.current?.amount.value);
    const currency = accounts.find(
      (account) => account.id.toString() === form.current?.to_account_id.value
    )?.currency as unknown as Currency;
    setData({ amount, currency });
  };

  useEffect(() => {
    const onFinish:any = (res:any) => {
      onComplete(res)
    }
    if (data.amount > 0) {
      initiateTrans(
        onFinish,
        () => setLoading(false)
      );
    }
  }, [data]);

  return (
    <div>
      <div className="modalHeading">
        <div className="title">Add Money</div>
      </div>
      <form ref={form} onSubmit={onSubmit}>
        <div className="modalBody userUpdate">
          <div className="formGroup">
            <label htmlFor="Username">To Account</label>
            <select name="to_account_id" required>
              <option value="">Select Account to add money</option>
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
            Submit{loading && "..."}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMoney;
