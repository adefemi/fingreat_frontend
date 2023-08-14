"use client";

import Accounts from "@/app/components/Accounts";
import ContentHeading from "@/app/components/ContentHeading";
import Transaction from "@/app/components/Transaction";
import withAuth from "@/app/components/hoc/withAuth";
import { useState } from "react";

enum AccountingKeys {
  accounts = "accounts",
  transaction = "transaction"
}

const Accounting = () => {
  const [activeTab, setActiveTab] = useState(AccountingKeys.accounts);
  const accountingComponents = {
    [AccountingKeys.accounts]: <Accounts />,
    [AccountingKeys.transaction]: <Transaction />
  }
  return (
    <main>
      <ContentHeading
        title="Accounting"
        sideSection={
          <SideSection activeTab={activeTab} onSetActiveTab={setActiveTab} />
        }
      />
      {
        accountingComponents[activeTab]
      }
      
    </main>
  );
};

interface SideSectionType {
  activeTab: string;
  onSetActiveTab: (tab: AccountingKeys) => void;
}

const SideSection = (props: SideSectionType) => {
  const getIsActive = (tab: string) => {
    if (props.activeTab === tab) return "active";
    return "";
  };

  return (
    <div className="sideTab">
      <div
        className={`item ${getIsActive("accounts")}`}
        onClick={() => props.onSetActiveTab(AccountingKeys.accounts)}
      >
        Accounts
      </div>
      <div
        className={`item ${getIsActive("transaction")}`}
        onClick={() => props.onSetActiveTab(AccountingKeys.transaction)}
      >
        Transaction
      </div>
    </div>
  );
};

export default withAuth(Accounting);
