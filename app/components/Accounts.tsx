import useAxiosHandler from "@/utils/axiosHandler";
import { accountUrl } from "@/utils/network";
import { useEffect, useState } from "react";
import { useModal } from "./hooks/useModal";
import AddAccount from "./AddAccount";
import SendMoney from "./SendMoney";
import AddMoney from "./AddMoney";

export interface AccountType {
  id: string;
  balance: number;
  created_at: string;
  currency: string;
}

enum ModalState {
  AddAccount = "AddAccount",
  SendMoney = "SendMoney",
  AddMoney = "AddMoney",
}

const Accounts = () => {
  const [accounts, setAccounts] = useState<AccountType[]>([]);
  const [loading, setLoading] = useState(true);
  const { axiosHandler } = useAxiosHandler();
  const { getModalContent, showModal, closeModal } = useModal();
  const [modalState, setModalState] = useState(ModalState.AddAccount);

  const getAccounts = async () => {
    setLoading(true);
    const res = await axiosHandler<AccountType[]>({
      method: "GET",
      url: accountUrl.list,
      isAuthorized: true,
    });
    setLoading(false);
    if (res.data) {
      setAccounts(res.data);
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  const completeOperation = () => {
    closeModal();
    getAccounts();
  };

  const addAccount = () => {
    setModalState(ModalState.AddAccount);
    showModal();
  };

  const sendMoney = () => {
    setModalState(ModalState.SendMoney);
    showModal();
  };

  const addMoney = () => {
    setModalState(ModalState.AddMoney);
    showModal();
  };

  const comps = {
    [ModalState.AddAccount]: (
      <AddAccount completeOperation={completeOperation} />
    ),
    [ModalState.SendMoney]: (
      <SendMoney accounts={accounts} completeOperation={completeOperation} />
    ),
    [ModalState.AddMoney]: (
      <AddMoney accounts={accounts} completeOperation={completeOperation} />
    ),
  };

  return (
    <div className="section accounts">
      <h3>Accounts</h3>
      <div className="accountsBlock">
        {loading && "Loading accounts"}
        {accounts.map((account, index) => (
          <AccountCard
            key={index}
            currency={account.currency}
            amount={account.balance.toFixed(2).toString()}
          />
        ))}
        <button onClick={addAccount} className="addAccount">
          Add Account
        </button>
      </div>

      <div className="op-button">
        {accounts.length > 0 && (
          <>
            <button onClick={addMoney}>Add Money</button>
            <button onClick={sendMoney}>Send Money</button>
          </>
        )}
      </div>

      {getModalContent(comps[modalState])}
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
