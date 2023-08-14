import { ActionTypes, store } from "@/utils/store";
import { useContext, useRef } from "react";
import { MdOutlineClose } from "react-icons/md";
import { ToastContainer } from "react-toastify";

export const useModal = (canClose = true) => {
  const modalRef = useRef<any>();
  const {dispatch, state:{modalStatus}} = useContext(store)

  const showModal = () => {
    dispatch({type: ActionTypes.MODAL_STATUS, payload:true})
    modalRef.current.showModal();
  };

  const closeModal = () => {
    dispatch({type: ActionTypes.MODAL_STATUS, payload:false})
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
        {modalStatus && <ToastContainer />}
      </dialog>
    );
  };

  return {
    getModalContent,
    showModal,
    closeModal,
  };
};
