"use client";

import { showErrorToast } from "@/components/error-toast";
import { showSuccessToast } from "@/components/success-toast";
import { useEffect } from "react";

interface ToastHandlerProps {
  items: number;
}
export function ToastHandler({ items }: ToastHandlerProps) {
  useEffect(() => {
    const getToastFromCookie = () => {
      const cookieString = document.cookie
        .split("; ")
        .find((row) => row.startsWith("toast="));

      if (cookieString) {
        const toastValue = cookieString.split("=")[1];
        if (toastValue) {
          try {
            return JSON.parse(decodeURIComponent(toastValue));
          } catch (e) {
            console.error("Failed to parse toast cookie:", e);
          }
        }
      }
      return null;
    };

    const toastData = getToastFromCookie();
    if (toastData) {
      // Display the toast
      if (toastData?.status === "success") {
        showSuccessToast(toastData?.message);
      } else if (toastData?.status === "error") {
        showErrorToast(toastData?.message, "Por favor, tente novamente.");
      }

      // Clear the cookie
      document.cookie = "toast=; Max-Age=0; path=/;";
    }
  }, [items]);

  return null;
}
