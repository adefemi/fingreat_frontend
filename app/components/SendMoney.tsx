"use client";

import { FormEvent, useRef, useState } from "react";
import { UserType } from "./hoc/withAuth";
import { accountUrl } from "@/utils/network";
import axiosHandler from "@/utils/axiosHandler";
import { useRouter } from "next/navigation";
import { AccountType } from "./Accounts";

const SendMoney = ({
  completeProcess,
  accounts,
}: {
  completeProcess: () => void;
  accounts: AccountType[];
}) => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let arg = {
      from_account_id: parseInt(form.current?.from_account_id.value),
      to_account_id: parseInt(form.current?.to_account_id.value),
      amount: parseFloat(form.current?.amount.value),
    };
    const res = await axiosHandler<UserType>({
      method: "POST",
      data: arg,
      url: accountUrl.transfer,
      isAuthenticated: true,
      router,
    });
    setLoading(false);

    if (res.response) {
      completeProcess();
    }
  };
  return (
    <div>
      <div className="modalHeading">
        <div className="title">Send Money</div>
      </div>
      <form ref={form} onSubmit={onSubmit}>
        <div className="modalBody userUpdate">
          <div className="formGroup">
            <label htmlFor="from_account_id">Account</label>
            <select name="from_account_id" required>
              <option value="">Choose Account</option>
              {accounts.map((account, index) => (
                <option key={index} value={account.id}>{`${
                  account.currency
                } - ${account.balance.toFixed(2)}`}</option>
              ))}
            </select>
          </div>
          <div className="formGroup">
            <label htmlFor="to_account_id">Receiving Account ID</label>
            <input name="to_account_id" required />
          </div>
          <div className="formGroup">
            <label htmlFor="amount">Amount</label>
            <input type="number" name="amount" required />
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

export default SendMoney;
