// src/app/api/sso/[...proxy]/route.js
import { NextResponse } from "next/server";

// const SSO_API_URL = "https://itsm-helpdesk-be.unotek.co.id";
const SSO_API_URL = "http://localhost:8080";

async function handler(req) {
  const { pathname, search } = new URL(req.url);
  let proxyPath = pathname.replace("/api/sso", "");

  // Jika path /logout, arahkan ke /auth/logout
  if (proxyPath === "/logout") {
    proxyPath = "/auth/logout";
  }

  const proxyUrl = `${SSO_API_URL}${proxyPath}${search}`;

  // Salin headers dari request yang masuk, ini akan menyertakan cookie sesi
  const headers = new Headers(req.headers);
  headers.set("host", new URL(SSO_API_URL).host);
  headers.delete("connection");

  // Handle body dengan benar
  let body;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.text();
  }

  try {
    const response = await fetch(proxyUrl, {
      method: req.method,
      headers: headers,
      body: body,
      redirect: "manual",
    });

    // Ambil response body sebagai arrayBuffer
    const resBody = await response.arrayBuffer();

    // Buat respons baru untuk dikirim kembali ke browser
    const res = new NextResponse(resBody, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    // Hapus header content-encoding agar browser tidak salah decode
    res.headers.delete("content-encoding");

    // Jika backend mengirim cookie baru (seperti saat login/logout), teruskan ke client
    if (response.headers.has("set-cookie")) {
      const setCookie = response.headers.get("set-cookie");
      res.headers.set("set-cookie", setCookie);
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
