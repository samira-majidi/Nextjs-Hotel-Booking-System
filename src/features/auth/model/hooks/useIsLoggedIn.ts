'use client';

import { useState } from "react";

function getCookie(name: string) {
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));

  return value ? decodeURIComponent(value.split("=")[1]) : null;
}

export function useIsLoggedIn() {
  const [isLoggedIn] = useState(() => {
    if (typeof window === "undefined") return false;

    const authStorage = getCookie("auth-storage");

    if (!authStorage) return false;

    try {
      const parsed = JSON.parse(authStorage);
      return parsed?.state?.isAuthenticated === true;
    } catch {
      return false;
    }
  });

  return isLoggedIn;
}
