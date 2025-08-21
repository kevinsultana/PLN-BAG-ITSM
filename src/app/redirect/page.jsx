"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Suspense } from "react";

function RedirectHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (code && state) {
      window.location.href = `/api/auth/callback/sso-bag?code=${code}&state=${state}`;
    } else {
      const error = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");
      if (error) {
        window.location.href = `/?error=${error}&error_description=${
          errorDescription || "SSO login failed"
        }`;
      }
    }
  }, [searchParams]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <p>Mengarahkan kembali, harap tunggu...</p>
    </div>
  );
}

export default function RedirectPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RedirectHandler />
    </Suspense>
  );
}
