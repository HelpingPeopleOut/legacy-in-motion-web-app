"use client";

import { useEffect } from "react";

export default function CacheBuster() {
  useEffect(() => {
    // This forces the browser to delete the cached, broken version of the app
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (let registration of registrations) {
          registration.unregister();
          console.log("Deleted old Service Worker cache.");
        }
      });
      
      // Clear the session storage just in case it got stuck
      sessionStorage.removeItem("introPlayed");
    }
  }, []);

  return null;
}