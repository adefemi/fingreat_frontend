import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import "./main.css";
import StoreProvider from "@/utils/store";
import LayoutToast from "@/app/components/LayoutToast";

export const metadata: Metadata = {
  title: "Fingreat - Financial App",
  description: "Fingreat - Financial App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StoreProvider>
        <body>
          {children}
          <LayoutToast />
        </body>
      </StoreProvider>
    </html>
  );
}
