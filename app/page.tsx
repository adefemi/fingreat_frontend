"use client";

import ProcessCard from "@/app/components/ProcessCard";
import withAuth from "@/app/components/hoc/withAuth";
import { useModal } from "@/app/components/Modal";
import { useContext, useEffect } from "react";
import { MdAccountBalance } from "react-icons/md";
import UpdateUser from "@/app/components/UpdateUser";
import { store } from "@/utils/store";

const Home = () => {
  const { getModalContent, showModal, closeModal } = useModal(false);
  const {state:{activeUser}} = useContext(store)
  useEffect(() => {
    if(!activeUser?.username){
      showModal()
    }
  }, []);
  return (
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
      {getModalContent(
        <UpdateUser closeModal={closeModal} />
      )}
    </main>
  );
};

export default withAuth(Home);
