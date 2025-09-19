import React from "react";

export default function renderDescription(html) {
  // Buat elemen DOM dari string HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Modifikasi semua <img>
  tempDiv.querySelectorAll("img").forEach((img) => {
    img.width = 120;
    img.height = 120;
    img.style.objectFit = "contain";
    img.style.cursor = "pointer";
  });

  // Modifikasi semua <a> (untuk file)
  tempDiv.querySelectorAll("a").forEach((a) => {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = "Preview/Download file";
  });

  return <span dangerouslySetInnerHTML={{ __html: tempDiv.innerHTML }} />;
}
