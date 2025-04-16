import { ReactNode } from "react";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster closeButton duration={4000} position="top-center" />
      {children}
    </>
  );
}
