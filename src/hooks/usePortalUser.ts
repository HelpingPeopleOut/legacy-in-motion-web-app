"use client";

import { useEffect, useState } from "react";
import type { Purchase, User } from "@prisma/client";
import { deserializePortalUser, type PortalUserJson } from "@/lib/portal-user-types";
import { isPreviewUnlockAll } from "@/lib/preview-access";

export type PortalUser = User & { purchases: Purchase[] };

const stripeLive = process.env.NEXT_PUBLIC_STRIPE_ENABLED === "true";

export function usePortalUser() {
  const preview = isPreviewUnlockAll();
  const needsFetch = stripeLive && !preview;
  const [user, setUser] = useState<PortalUser | null>(null);
  const [loading, setLoading] = useState(needsFetch);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!needsFetch) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/user/me", { credentials: "include" });
        if (!res.ok) {
          if (!cancelled) {
            setUser(null);
            setError(res.status !== 401);
          }
          return;
        }
        const data = (await res.json()) as { user: PortalUserJson | null };
        if (!cancelled) {
          setUser(data.user ? (deserializePortalUser(data.user) as PortalUser) : null);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [needsFetch]);

  return { user, loading, error, preview, stripeLive };
}
