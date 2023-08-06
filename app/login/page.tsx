"use client";

import Auth from "@/components/Auth";
import withoutAuth from "@/components/hoc/withoutAuth";
import { userTokenKey } from "@/utils/contants";
import { errorHandler } from "@/utils/errorHandler";
import { authUrl } from "@/utils/network";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type LoginType = AxiosResponse<{token: string}>

const Login = () => {
  const [loading, SetLoading] = useState(false);
  const Router = useRouter()

  const onSubmit = async (
    e: FormEvent<HTMLFormElement>,
    formRef: React.RefObject<HTMLFormElement>
  ) => {
    e.preventDefault();
    SetLoading(true);
    let arg = {
      email: formRef.current?.email.value,
      password: formRef.current?.password.value,
    };
    const response:LoginType = await axios
      .post(authUrl.login, arg)
      .catch((e: AxiosError) => errorHandler(e)) as LoginType;
    SetLoading(false);

    if (response) {
      localStorage.setItem(userTokenKey, response.data.token)
      Router.push("/");
    }
  };

  return <Auth loading={loading} showRemembered onSubmit={onSubmit} />;
};

export default withoutAuth(Login);
