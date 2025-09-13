import { NextResponse } from "next/server";

const BACKEND_URL = "https://itsm-helpdesk-be.unotek.co.id";
// const BACKEND_URL = "http://localhost:8080";

async function handler(req) {
  const { pathname, search } = new URL(req.url);
  const proxyPath = pathname.replace("/api/proxy", "");
  const proxyUrl = `${BACKEND_URL}${proxyPath}${search}`;

  // Salin headers dari request yang masuk, termasuk cookie
  const headers = new Headers(req.headers);
  headers.set("host", new URL(BACKEND_URL).host);
  headers.delete("connection");
  // headers.delete("content-length"); // kalau prod di komen

  // Handle body jika bukan GET/HEAD
  let body;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = req.body;
  }

  try {
    const response = await fetch(proxyUrl, {
      method: req.method,
      headers,
      body,
      redirect: "manual",
      duplex: "half",
    });

    // Ambil response body sebagai arrayBuffer
    const resBody = await response.arrayBuffer();

    // Buat respons baru untuk dikirim ke browser
    const res = new NextResponse(resBody, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    // Hapus content-encoding agar browser tidak salah decode
    res.headers.delete("content-encoding");

    // Teruskan set-cookie jika ada
    if (response.headers.has("set-cookie")) {
      const setCookie = response.headers.get("set-cookie");
      res.headers.set("set-cookie", setCookie);
    }

    return res;
  } catch (error) {
    console.error("Proxy API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
