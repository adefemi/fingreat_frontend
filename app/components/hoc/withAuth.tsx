"use client";

import { userTokenKey } from "@/utils/contants";
import { ComponentType, useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "../MainLayout";
import { userUrl } from "@/utils/network";
import { ActionTypes, store } from "@/utils/store";
import axiosHandler from "@/utils/axiosHandler";

export interface UserType {
  created_at: string;
  email: string;
  id: string;
  updated_at: string;
  username?: string;
}

const withAuth = <P extends object>(WrapperComponent: ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const Router = useRouter();
    const [loading, setLoading] = useState(true);
    const {
      state: { activeUser },
      dispatch,
    } = useContext(store);

    const goToLogin = () => {
      localStorage.removeItem(userTokenKey);
      Router.push("/login");
    };

    const handleUserAuth = async () => {
      // localStorage is only available with the client side
      const userToken = localStorage.getItem(userTokenKey);
      if (!userToken) {
        goToLogin();
      } else {
        if (activeUser) {
          setLoading(false);
          return;
        }

        // make request to the server to get active user
        const res = await axiosHandler<UserType>({
          method: "GET",
          url: userUrl.me,
          isAuthenticated: true,
          router: Router
        });
        if (res.response) {
          dispatch({ type: ActionTypes.UPDATE_USER, payload: res.response });
          setLoading(false);
        }
      }
    };

    useEffect(() => {
      handleUserAuth();
    }, []);

    if (loading) {
      return <h3>Loading... please wait</h3>;
    }

    return (
      <MainLayout>
        <WrapperComponent {...props} />
      </MainLayout>
    );
  };

  return Wrapper;
};

export default withAuth;
