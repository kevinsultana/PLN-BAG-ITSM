// src/app/api/sso/[...proxy]/route.js
import { NextResponse } from "next/server";

const SSO_API_URL = "https://itsm-helpdesk-be.unotek.co.id";

async function handler(req) {
  const { pathname, search } = new URL(req.url);
  console.log(search);
  const proxyPath = pathname.replace("/api/sso", "");
  const proxyUrl = `${SSO_API_URL}${proxyPath}${search}`;

  // Salin headers dari request yang masuk, termasuk cookie
  const headers = new Headers(req.headers);
  // Pastikan host header sesuai dengan API tujuan
  headers.set("host", new URL(SSO_API_URL).host);
  // Hapus header yang tidak relevan
  headers.delete("connection");

  try {
    const response = await fetch(proxyUrl, {
      method: req.method,
      headers: headers,
      body:
        req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
      redirect: "manual", // Penting agar Next.js tidak mengikuti redirect secara otomatis
    });

    // Buat respons baru berdasarkan respons dari backend
    const res = new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    // Jika backend mengirim cookie baru (seperti setelah login), teruskan ke client
    if (response.headers.has("set-cookie")) {
      res.headers.set("set-cookie", response.headers.get("set-cookie"));
    }

    return res;
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
