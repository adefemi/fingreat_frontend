import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { UserType } from "./hocs/withAuth";
import { accountUrl, userUrl } from "@/utils/network";
import { ActionTypes, store } from "./StoreProvider";
import useAxiosHandler from "@/utils/axiosHandler";

const AddAccount = ({completeOperation}: {completeOperation: () => void}) => { 
  const [loading, setLoading] = useState(false)
  const form = useRef<HTMLFormElement>(null)
  const {dispatch} = useContext(store)
  const {axiosHandler} = useAxiosHandler()

  const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let arg = {
      currency: form.current?.currency.value,
    };

    const res = await axiosHandler<UserType>({
      method: "POST", url:accountUrl.add, isAuthorized: true,
      data: arg
    })

    setLoading(false)

    if(res.data){
      toast("Account created successfully", {type: "success"})
      dispatch({type: ActionTypes.UpdateUser, payload: res.data})
      completeOperation()
    }
  }

  return (
    <div>
      <div className="modalHeading">
        <div className="title">Add Account</div>
      </div>
      <form ref={form} onSubmit={onSubmit}>
        <div className="modalBody userUpdate">
          <div className="formGroup">
            <label htmlFor="currency">Currency</label>
            <select name="currency" required >
              <option value="">Choose currency</option>
              <option value="NGN">NGN</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
        <div className="modalFooter">
          <button type="submit" disabled={loading}>
            Submit{loading && "..."}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAccount;