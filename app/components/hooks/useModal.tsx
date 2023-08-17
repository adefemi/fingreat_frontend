import { useContext, useRef } from "react";
import { MdOutlineClose } from "react-icons/md";
import { ActionTypes, store } from "../StoreProvider";
import { ToastContainer } from "react-toastify";

export const useModal = (canClose = true) => {
  const modalRef = useRef<any>();
  const {dispatch, state:{modalState}} = useContext(store)

  const showModal = () => {
    dispatch({type:ActionTypes.SetModalState, payload:true})
    modalRef.current.showModal();
  };

  const closeModal = () => {
    dispatch({type:ActionTypes.SetModalState, payload:false})
    modalRef.current.close();
  };

  const getModalContent = (content: React.ReactNode) => {
    return (
      <dialog ref={modalRef} className="modalDialog">
        <div className="body">{content}</div>
        {canClose && (
          <div className="close">
            <MdOutlineClose onClick={closeModal} />
          </div>
        )}
        {
          modalState && <ToastContainer />
        }
      </dialog>
    );
  };

  return {
    getModalContent,
    showModal,
    closeModal,
  };
};