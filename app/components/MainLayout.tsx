import { FC } from "react";
import { Logo } from "./Utils";
import Link from "next/link";
import {useRouter} from "next/navigation"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { userTokenKey } from "@/utils/contants";

const MainLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="main-layout">
      <Header />
      <div className="content">{children}</div>
    </main>
  );
};

const logout = (router:AppRouterInstance) => {
  localStorage.removeItem(userTokenKey)
  router.push("/login")
}

const Header = () => {
  const Router = useRouter()
  return (
    <header>
      <Link className="brand" href="/">
        <Logo />
      </Link>
      <div className="logout" onClick={() => logout(Router)}>Logout</div>
    </header>
  );
};

export default MainLayout;
