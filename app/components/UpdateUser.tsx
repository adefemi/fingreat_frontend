"use client";

import { FormEvent, useContext, useRef, useState } from "react";
import { UserType } from "./hoc/withAuth";
import { userUrl } from "@/utils/network";
import { ActionTypes, store } from "@/utils/store";
import axiosHandler from "@/utils/axiosHandler";
import { useRouter } from "next/navigation";

const UpdateUser = ({ closeModal }: { closeModal: () => void }) => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(store);
  const router = useRouter()
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let arg = {
      username: form.current?.username.value,
    };
    const res = await axiosHandler<UserType>({
      method: "PATCH",
      data: arg,
      url: userUrl.updateUsername,
      isAuthenticated: true,
      router
    });

    if (res.response) {
      dispatch({ type: ActionTypes.UPDATE_USER, payload: res.response });
      closeModal();
    }
  };
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
