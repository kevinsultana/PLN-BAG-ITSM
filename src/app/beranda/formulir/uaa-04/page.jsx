"use client";
import MainLayout from "@/components/Beranda/Layout/MainLayout";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Page() {
  const refForm = useRef(null);

  // --- Helper: tunggu font & gambar loaded
  const waitAssetsReady = async (rootEl) => {
    const imgs = Array.from(rootEl.querySelectorAll("img"));
    await Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      ...imgs.map(
        (img) =>
          new Promise((res) => {
            if (img.complete) return res();
            img.onload = img.onerror = () => res();
          })
      ),
    ]);
  };

  // --- Helper: buat clone printable (input → div teks)
  const makePrintableClone = (node) => {
    const clone = node.cloneNode(true);

    // input
    clone.querySelectorAll("input").forEach((el, i) => {
      const original = node.querySelectorAll("input")[i];
      const value =
        original.type === "checkbox" || original.type === "radio"
          ? original.checked
            ? "✓"
            : "✗"
          : original.value || original.placeholder || "";

      const rep = document.createElement("div");
      rep.textContent = value;
      rep.style.cssText = `
        border: 1px solid #d1d5db;
        border-radius: 6px;
        padding: 10px 12px;
        min-height: 40px;
        line-height: 1.4;
        font-size: 14px;
        color: #111827;
        background:#fff;
        white-space: pre-wrap;
      `;
      el.replaceWith(rep);
    });

    // textarea
    clone.querySelectorAll("textarea").forEach((el, i) => {
      const original = node.querySelectorAll("textarea")[i];
      const rep = document.createElement("div");
      rep.textContent = original.value || original.placeholder || "";
      rep.style.cssText = `
        border: 1px solid #d1d5db;
        border-radius: 6px;
        padding: 10px 12px;
        min-height: 96px;
        line-height: 1.5;
        font-size: 14px;
        color: #111827;
        background:#fff;
        white-space: pre-wrap;
      `;
      el.replaceWith(rep);
    });

    // select
    clone.querySelectorAll("select").forEach((el, i) => {
      const original = node.querySelectorAll("select")[i];
      const label = original.selectedOptions?.[0]?.textContent || "";
      const rep = document.createElement("div");
      rep.textContent = label;
      rep.style.cssText = `
        border: 1px solid #d1d5db;
        border-radius: 6px;
        padding: 10px 12px;
        min-height: 40px;
        line-height: 1.4;
        font-size: 14px;
        color: #111827;
        background:#fff;
      `;
      el.replaceWith(rep);
    });

    return clone;
  };

  // --- Capture canvas dari clone printable (off-screen)
  const captureCanvas = async (node) => {
    const printable = makePrintableClone(node);
    printable.style.position = "fixed";
    printable.style.left = "-10000px";
    printable.style.top = "0";
    printable.style.zIndex = "-1";
    document.body.appendChild(printable);

    await waitAssetsReady(printable);

    const canvas = await html2canvas(printable, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#fff",
      scale: 2.5,
      scrollY: -window.scrollY,
      logging: false,
      imageTimeout: 0,
    });

    document.body.removeChild(printable);
    return canvas;
  };

  const handleExportPdf = async (e) => {
    e.preventDefault();
    const node = refForm.current;
    if (!node) return;

    const canvas = await captureCanvas(node);

    const pdf = new jsPDF({ orientation: "p", unit: "px", format: "a4" });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();

    const margin = 24;
    const imgW = pageW - margin * 2;
    const imgH = (canvas.height * imgW) / canvas.width;

    const imgData = canvas.toDataURL("image/png");

    pdf.addImage(imgData, "PNG", margin, margin, imgW, imgH, undefined, "FAST");

    // multipage
    let heightLeft = imgH - (pageH - margin * 2);
    let position = margin - (pageH - margin * 2);

    while (heightLeft > 0) {
      pdf.addPage();
      pdf.addImage(
        imgData,
        "PNG",
        margin,
        position,
        imgW,
        imgH,
        undefined,
        "FAST"
      );
      heightLeft -= pageH - margin * 2;
      position -= pageH - margin * 2;
    }

    pdf.save("form-uaa-04.pdf");
  };

  return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "100vh" }}>
      <MainLayout>
        <style jsx global>{`
          .print-sheet {
            width: 794px;
            margin: 0 auto;
            background: #fff;
          }
          table,
          tr,
          td,
          th {
            page-break-inside: avoid;
          }
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .no-transform {
            transform: none !important;
          }
          .print-sheet img {
            max-width: 100%;
            height: auto;
          }
          input,
          textarea,
          select {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            background: #fff;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            padding: 10px 12px;
            line-height: 1.4;
            height: 40px;
            box-shadow: none;
            color: #111827;
            font-size: 14px;
          }
          textarea {
            height: auto;
            min-height: 96px;
            line-height: 1.5;
          }
          input::placeholder,
          textarea::placeholder {
            color: #9ca3af;
          }
        `}</style>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem 3.5rem",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Formulir
          </h1>
          <div
            className="print-sheet no-transform"
            style={{
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,.08)",
            }}
          >
            <form
              ref={refForm}
              style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                fontSize: "0.875rem",
                color: "#374151",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <p style={{ fontWeight: "bold" }}>Kode:</p>
                  <p style={{ fontWeight: 600 }}>UAA-04</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontWeight: 600 }}>FORMULIR PERMINTAAN</p>
                  <p style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}>
                    PENGHAPUSAN USER ACCOUNT APLIKASI
                  </p>
                </div>
                <img
                  src="/logoNavbar.png"
                  alt="logo"
                  width={127}
                  height={44}
                  crossOrigin="anonymous"
                  style={{
                    width: "7rem",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>

              <p style={{ fontSize: "0.75rem", textAlign: "center" }}>
                (Formulir ini diisi oleh User Aplikasi / calon User Aplikasi dan
                perlu disetujui oleh supervisor atau manager yang bersangkutan
                atau Business Process Owner sebelum diberikan kepada Service
                Desk / Help Desk)
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "1rem",
                }}
              >
                <Input label="Nama Aplikasi" required full />
                <Input label="Lokasi" required />
                <Input label="Nomor Induk Pegawai" required />
                <Input label="Nama Lengkap" required />
                {/* <Input label="Email Korporat" placeholder="Company@gmail.com" /> */}
                <Input label="Jabatan" required />
                <Input label="Phone/Ext/HP" required adminOnly />
                <Input label="Unit/Bidang/Bagian" />
                <Input label="User Account" required adminOnly full />
              </div>

              <p style={{ fontSize: "0.75rem", color: "#4b5563" }}>
                User Account akan dinonaktifkan jika tidak digunakan selama 3
                bulan, mutasi, pensiun atau permintaan dari manager terkait.
              </p>

              <div>
                <Label text="Alasan Penghapusan User Account" required />
                <textarea
                  rows={3}
                  style={{
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    padding: "10px 12px",
                    marginTop: "4px",
                  }}
                />
              </div>

              <div
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  padding: "16px",
                }}
              >
                <Label text="Konfirmasi" />
                <table
                  style={{
                    width: "100%",
                    fontSize: "0.875rem",
                    marginTop: "8px",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "1px solid #d1d5db" }}>
                      <th
                        style={{
                          width: "25%",
                          height: "4rem",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                      </th>
                      <th
                        style={{
                          width: "25%",
                          height: "4rem",
                          textAlign: "center",
                        }}
                      >
                        Nama
                      </th>
                      <th
                        style={{
                          width: "25%",
                          height: "4rem",
                          textAlign: "center",
                        }}
                      >
                        Tanda Tangan
                      </th>
                      <th
                        style={{
                          width: "25%",
                          height: "4rem",
                          textAlign: "center",
                        }}
                      >
                        Tanggal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <CellFirst>Dimintai Oleh *</CellFirst>
                      <CellInput />
                      <CellInput />
                      <CellInput type="date" />
                    </tr>
                    <tr>
                      <CellFirst>
                        Disetujui oleh Supervisor / Manager / PH Manager / BPO *
                      </CellFirst>
                      <CellInput />
                      <CellInput />
                      <CellInput type="date" />
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#6b7280",
                  marginTop: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <p>
                  * : Harus diisi oleh User, jika tidak diisi maka permintaan
                  tidak akan diproses
                </p>
                <p>** : Diisi oleh User Admin</p>
              </div>
            </form>
            <div style={{ padding: "0 24px 24px" }}>
              <button
                onClick={handleExportPdf}
                style={{
                  background: "#0ea5e9",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  marginTop: "16px",
                  cursor: "pointer",
                  border: "none",
                  fontWeight: 600,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#0369a1")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#0ea5e9")
                }
              >
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

function Input({
  label,
  required,
  adminOnly,
  full,
  type = "text",
  placeholder = "",
}) {
  return (
    <div style={full ? { gridColumn: "span 2 / span 2" } : {}}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: "0.75rem",
            fontWeight: 600,
            marginBottom: "4px",
          }}
        >
          {label}
          {required && (
            <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>
          )}
          {adminOnly && (
            <span style={{ color: "#ef4444", marginLeft: "4px" }}>**</span>
          )}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        style={{
          width: "100%",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          padding: "10px 12px",
          fontSize: "0.875rem",
        }}
      />
    </div>
  );
}

function Label({ text, required }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: "0.75rem",
        fontWeight: 600,
        marginBottom: "4px",
      }}
    >
      {text}
      {required && (
        <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>
      )}
    </label>
  );
}

function CellFirst({ children }) {
  return (
    <td
      style={{
        padding: "8px 6px",
        fontWeight: 500,
        height: "6rem",
        border: "1px solid #d1d5db",
      }}
    >
      {children}
    </td>
  );
}

function CellInput() {
  return <td style={{ height: "6rem", border: "1px solid #d1d5db" }} />;
}
