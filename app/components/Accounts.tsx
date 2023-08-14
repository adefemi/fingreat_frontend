"use client";

import axiosHandler from "@/utils/axiosHandler";
import { accountUrl } from "@/utils/network";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "./Modal";
import AddAccount from "./AddAccount";
import SendMoney from "./SendMoney";

export interface AccountType {
  balance: number;
  created_at: string;
  currency: string;
  id: string;
}

enum ModalController {
  AddAccount = "AddAccount",
  SendMoney = "SendMoney",
}

const Accounts = () => {
  const [accounts, setAccounts] = useState<AccountType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { getModalContent, showModal, closeModal } = useModal();
  const [modalControl, setModalControl] = useState(ModalController.AddAccount);

  const getAccounts = async () => {
    setLoading(true);
    const res = await axiosHandler<AccountType[]>({
      method: "GET",
      url: accountUrl.accounts,
      isAuthenticated: true,
      router,
    });
    setLoading(false);

    if (res.response) {
      setAccounts(res.response);
    }
  };

  const completeAddAccount = () => {
    getAccounts();
    closeModal();
  };

  const addAccount = () => {
    setModalControl(ModalController.AddAccount);
    showModal();
  };

  const sendMoney = () => {
    setModalControl(ModalController.SendMoney);
    showModal();
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div className="section accounts">
      <h3>Accounts</h3>
      <div className="accountsBlock">
        {loading && <i>loading accounts</i>}
        {accounts.map((account, index) => (
          <AccountCard
            key={index}
            currency={account.currency}
            amount={account.balance.toFixed(2).toString()}
          />
        ))}

        <button onClick={addAccount}>Add Account</button>
      </div>

      <div className="op-button">
        <button>Add Money</button>
        <button onClick={sendMoney}>Send Money</button>
      </div>

      {getModalContent(
        modalControl === ModalController.AddAccount ? (
          <AddAccount completeProcess={completeAddAccount} />
        ) : (
          <SendMoney completeProcess={completeAddAccount} accounts={accounts} />
        )
      )}
    </div>
  );
};

interface AccountCardType {
  currency: string;
  amount: string;
}

const AccountCard = (props: AccountCardType) => (
  <div className="accountCard">
    <h2>{props.currency}</h2>

    <div className="info">Balance</div>
    <h1>{props.amount}</h1>
  </div>
);

export default Accounts;
