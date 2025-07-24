import React, { Suspense } from "react";

export default function DetailForms() {
  return (
    <Suspense fallback={<div>Memuat detail tiket...</div>}>
      <div>DetailForms</div>
    </Suspense>
  );
}
