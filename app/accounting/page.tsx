"use client";

import Accounts from "@/app/components/Accounts";
import Transaction from "@/app/components/Transaction";
import { useState } from "react";
import ContentHeading from "../components/ContentHeading";
import MainLayout from "../components/MainLayout";
import withAuth from "../components/hocs/withAuth";

enum AccountingKeys {
  accounts = "accounts",
  transaction = "transaction",
}

const Accounting = () => {
  const [activeTab, setActiveTab] = useState(AccountingKeys.accounts);
  const accountingComponents = {
    [AccountingKeys.accounts]: <Accounts />,
    [AccountingKeys.transaction]: <Transaction />,
  };
  return (
    <MainLayout>
      <main>
        <ContentHeading
          title="Accounting"
          sideSection={
            <SideSection activeTab={activeTab} onSetActiveTab={setActiveTab} />
          }
        />
        {accountingComponents[activeTab]}
      </main>
    </MainLayout>
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
