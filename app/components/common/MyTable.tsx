const headingTitle = [
  "Date",
  "Type",
  "Counterpart and Description",
  "Amount",
  "Status",
];

interface MyTableProps {
  headingTitles: string[];
  bodyContent: any[][];
}

const MyTable = ({ headingTitles, bodyContent }: MyTableProps) => {
  for (let i of bodyContent) {
    if (i.length !== headingTitles.length) {
      throw "Body content should have the same length as the headers";
    }
  }

  return (
    <div className="myTable">
      <div className="heading">
        {headingTitles.map((name, i) => (
          <div className="headerInfo" key={i}>
            {name}
          </div>
        ))}
      </div>
      <div className="content">
        {bodyContent.map((items, i) => (
          <section key={i}>
            {items.map((item, i) => (
              <div className="contentInfo" key={i}>
                {item}
              </div>
            ))}
          </section>
        ))}
        {
            bodyContent.length < 1 && <i>No data</i>
        }
      </div>
    </div>
  );
};

interface TransactionTableProps {
  body: {
    date: string;
    type: string;
    counterpart: string;
    description: string;
    amount: number;
    currency: string;
    status: string;
  }[];
}

const TransactionTable = ({ body }: TransactionTableProps) => {
  const getBodyInfo = () => {
    const container = [];
    for (let i of body) {
      container.push([
        <div className="date" key={1}>
          <div className="top">Jun 24, 2023</div>
          <div>10:00 am</div>
        </div>,
        <div className="credit" key={2}>
          {i.type}
        </div>,
        <div className="desc" key={3}>
          <div className="top">{i.counterpart}</div>
          <div>{i.description}</div>
        </div>,
        <div className="amount" key={4}>
          {i.amount} {i.currency}
        </div>,
        <div className="badge" key={5}>
          {i.status}
        </div>,
      ]);
    }
    return container
  };

  return <MyTable headingTitles={headingTitle} bodyContent={getBodyInfo()} />;
};

export default TransactionTable;
