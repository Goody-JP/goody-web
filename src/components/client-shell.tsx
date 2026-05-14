"use client";

import { useEffect, useState } from "react";
import { Cursor } from "./cursor";
import { LoadingScreen } from "./loading";
import { ScrollProvider } from "./scroll-context";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <ScrollProvider>
      <LoadingScreen done={loaded} />
      <Cursor />
      {children}
    </ScrollProvider>
  );
}
