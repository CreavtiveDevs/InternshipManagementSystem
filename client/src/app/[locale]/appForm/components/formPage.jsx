"use client";

import { AppForm } from "./appForm";
import AuthConnect from "@/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TopNav } from "../../internDashboard/components/topNav";
import { PcSideNav } from "../../globalComponents/pcSideNav";
import { MobileNav } from "../../globalComponents/mobileNav";
import { ProtectedRoute } from "../../globalComponents/stdProtectedRoute";

export const ApplicationForm = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await AuthConnect.get("/token");
        setToken(response);
        console.log(response);
      } catch (error) {
        console.error("User not authenticated", error);
        router.push("/login");
      }
    };

    getToken();
  }, []);

  if (!token) {
    return null; // Prevent rendering the dashboard until token is fetched
  }

  return (
    <main className="bg-white dark:bg-dark_1 h-screen">
      <div className={"flex flex-nowrap"}>
        <PcSideNav />
        <div className={"h-full w-full"}>
          <TopNav />
          <ProtectedRoute>
            <AppForm />
          </ProtectedRoute>
        </div>

        <MobileNav />
      </div>
    </main>
  );
};
