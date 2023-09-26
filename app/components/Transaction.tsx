import TransactionTable from "./common/MyTable";

const Transaction = () => {
  return (
    <div>
        <br /><br />
      <h2>Transaction History</h2>
      <TransactionTable body={[]} />
    </div>
  );
};

export default Transaction;
