"use client";

import Auth from "@/app/components/Auth";
import { userTokenKey } from "@/utils/contants";
import { errorHandler } from "@/utils/errorHandler";
import { authUrl } from "@/utils/network";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FormEvent, useState } from "react";
import {useRouter} from "next/navigation"
import withoutAuth from "../components/hocs/withoutAuth";
import useAxiosHandler from "@/utils/axiosHandler";

interface LoginType {
  token: string
}

const Login = () => {
  const [loading, SetLoading] = useState(false);
  const Router = useRouter()
  const {axiosHandler} = useAxiosHandler()

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

    const response = await axiosHandler<LoginType>({
      method: "POST",
      url: authUrl.login,
      data: arg
    })

    SetLoading(false);

    if (response.data) {
      localStorage.setItem(userTokenKey, response.data.token)
      Router.push("/");
    }
  };

  return <Auth loading={loading} showRemembered onSubmit={onSubmit} />;
};

export default withoutAuth(Login);
