"use client";

import { useEffect, useState } from "react";
import { mergeDemoMenu } from "@/lib/demo/merge-demo-menu";
import { API_BASE_URL } from "@/lib/constants";

export default function useMenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const url = `${API_BASE_URL}/menuItem`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Menu request failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          const api = Array.isArray(data) ? data : [];
          setMenu(mergeDemoMenu(api));
          setError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          const fallback = mergeDemoMenu([]);
          setMenu(fallback);
          // Do not block UI when demo dishes are available without the API
          setError(fallback.length === 0 ? e : null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return [menu, loading, error];
}
