"use client";

import { useEffect, useContext } from "react";
import { MdAccountBalance } from "react-icons/md";
import { useModal } from "./components/hooks/useModal";
import ProcessCard from "./components/ProcessCard";
import UpdateUser from "./components/UpdateUser";
import MainLayout from "./components/MainLayout";
import withAuth from "./components/hocs/withAuth";
import { store } from "./components/StoreProvider";

const Home = () => {
  const { getModalContent, showModal, closeModal } = useModal(false);
  const {state:{activeUser}} = useContext(store)
  useEffect(() => {
    if(!activeUser?.username){
      showModal();
    }
    
  }, []);
  return (
    <MainLayout>
      <main>
        <h1 className="title">
          Welcome, <span>{activeUser?.username || "user"}</span>
        </h1>
        <div className="processBlock">
          <ProcessCard
            icon={<MdAccountBalance className="accountIcon" size={30} />}
            title="Accounting"
            linkTo="/accounting"
            description="Manager account, send and receive money"
          />
        </div>
        {getModalContent(<UpdateUser closeModal={closeModal} />)}
      </main>
    </MainLayout>
  );
};

export default withAuth(Home);
