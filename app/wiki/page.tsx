"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WikiRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the static mdBook index inside public/wiki
    // Use replace so navigation history isn't cluttered.
    router.replace("/wiki/index.html");
  }, [router]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Redirecting to Docs…</h1>
      <p>
        If you are not redirected automatically, <a href="/wiki/index.html">click here</a>.
      </p>
    </div>
  );
}
