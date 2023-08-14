"use client";

import Auth from "@/app/components/Auth";
import withoutAuth from "@/app/components/hoc/withoutAuth";
import axiosHandler from "@/utils/axiosHandler";
import { userTokenKey } from "@/utils/contants";
import { authUrl } from "@/utils/network";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface LoginType {
  token: string;
}

const Login = () => {
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
    const res = await axiosHandler<LoginType>({
      method: "POST",
      url: authUrl.login,
      data: arg,
    });
    setLoading(false);

    if (res.response) {
      localStorage.setItem(userTokenKey, res.response.token);
      Router.push("/");
    }
  };

  return <Auth loading={loading} showRemembered onSubmit={onSubmit} />;
};

export default withoutAuth(Login);
