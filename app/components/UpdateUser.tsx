import { FormEvent, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { UserType } from "./hocs/withAuth";
import { userUrl } from "@/utils/network";
import { ActionTypes, store } from "./StoreProvider";
import useAxiosHandler from "@/utils/axiosHandler";

const UpdateUser = ({closeModal}: {closeModal: () => void}) => { 
  const [loading, setLoading] = useState(false)
  const form = useRef<HTMLFormElement>(null)
  const {dispatch} = useContext(store)
  const {axiosHandler} = useAxiosHandler()

  const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let arg = {
      username: form.current?.username.value,
    };

    const res = await axiosHandler<UserType>({
      method: "PATCH", url:userUrl.updateUsername, isAuthorized: true,
      data: arg
    })

    setLoading(false)

    if(res.data){
      toast("Updated username", {type: "success"})
      dispatch({type: ActionTypes.UpdateUser, payload: res.data})
      setTimeout(() => {
        closeModal()
      }, 1500)
    }
  }

  return (
    <div>
      <div className="modalHeading">
        <div className="title">Add Username</div>
      </div>
      <form ref={form} onSubmit={onSubmit}>
        <div className="modalBody userUpdate">
          <div className="formGroup">
            <label htmlFor="Username">Username</label>
            <input name="username" required />
          </div>
        </div>
        <div className="modalFooter">
          <button type="submit" disabled={loading}>
            Update{loading && "..."}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;