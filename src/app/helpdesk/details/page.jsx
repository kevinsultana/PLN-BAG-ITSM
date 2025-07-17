import { Suspense } from "react";
import DetailContent from "./DetailsContent";

export default function DetailPage() {
  return (
    <Suspense fallback={<div>Memuat detail tiket...</div>}>
      <DetailContent />
    </Suspense>
  );
}
