import { ReactNode } from "react";
import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import "./main.css";
import StoreProvider from "./components/StoreProvider";
import ToastLayout from "./components/ToastLayout";

export const metadata: Metadata = {
  title: "Fingreat - Financial App",
  description: "Fingreat - Financial App",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <StoreProvider>
        <body>
          {children}
          <ToastLayout />
        </body>
      </StoreProvider>
    </html>
  );
}
