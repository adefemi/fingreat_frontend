"use client";

import Auth from "@/app/components/Auth";
import { authUrl } from "@/utils/network";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import withoutAuth from "@/app/components/hoc/withoutAuth";
import axiosHandler from "@/utils/axiosHandler";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const Router = useRouter();

  const onSubmit = async (
    e: FormEvent<HTMLFormElement>,
    formRef: React.RefObject<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    let arg = {
      email: formRef.current?.email.value,
      password: formRef.current?.password.value,
    };
    const res = await axiosHandler({
      method: "POST",
      url: authUrl.register,
      data: arg,
    });
    setLoading(false);

    if (res.response) {
      toast("User created successfully", {
        type: "success",
      });
      Router.push("/login");
    }
  };

  return (
    <Auth
      onSubmit={onSubmit}
      title="Sign Up"
      loading={loading}
      buttonTitle="Register"
      accountInfoText={{
        initialText: "Have an account?",
        actionLink: "/login",
        actionText: "login",
      }}
    />
  );
};

export default withoutAuth(Register);
