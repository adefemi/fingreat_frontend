"use client";

import { FormEvent, useRef, useState } from "react";
import { UserType } from "./hoc/withAuth";
import { accountUrl } from "@/utils/network";
import axiosHandler from "@/utils/axiosHandler";
import { useRouter } from "next/navigation";

const AddAccount = ({ completeProcess }: { completeProcess: () => void }) => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let arg = {
      currency: form.current?.currency.value,
    };
    const res = await axiosHandler<UserType>({
      method: "POST",
      data: arg,
      url: accountUrl.create,
      isAuthenticated: true,
      router,
    });
    setLoading(false);

    if (res.response) {
      completeProcess();
    }
  };
  return (
    <div>
      <div className="modalHeading">
        <div className="title">Add New Account</div>
      </div>
      <form ref={form} onSubmit={onSubmit}>
        <div className="modalBody userUpdate">
          <div className="formGroup">
            <label htmlFor="currency">Currency</label>
            <select name="currency" required>
              <option value="">Choose Currency</option>
              <option value="NGN">NGN</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
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
