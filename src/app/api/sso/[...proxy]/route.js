// src/app/api/sso/[...proxy]/route.js
import { NextResponse } from "next/server";

const SSO_API_URL = "https://itsm-helpdesk-be.unotek.co.id";

async function handler(req) {
  const { pathname, search } = new URL(req.url);
  const proxyPath = pathname.replace("/api/sso", "");
  const proxyUrl = `${SSO_API_URL}${proxyPath}${search}`;

  // Salin headers dari request yang masuk, ini akan menyertakan cookie sesi
  const headers = new Headers(req.headers);
  headers.set("host", new URL(SSO_API_URL).host);
  headers.delete("connection");

  try {
    const response = await fetch(proxyUrl, {
      method: req.method,
      headers: headers,
      body:
        req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
      redirect: "manual", // Penting!
    });

    // Buat respons baru untuk dikirim kembali ke browser
    const res = new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    // Jika backend mengirim cookie baru (seperti saat login/logout), teruskan ke client
    if (response.headers.has("set-cookie")) {
      res.headers.set("set-cookie", response.headers.get("set-cookie"));
    }

    return res;
  } catch (error) {
    console.error("Kesalahan pada API Proxy:", error);
    return NextResponse.json(
      { error: "Kesalahan Internal Server" },
      { status: 500 }
    );
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
