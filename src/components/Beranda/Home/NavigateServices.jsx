import React from "react";

export default function NavigateServices({
  onApplicationClick,
  onIntegrationClick,
}) {
  return (
    <div className="flex bg-white px-5 space-x-4">
      <button
        onClick={onApplicationClick}
        className="text-black text-base font-bold py-6 border-b-2 border-[#65C7D5]"
      >
        BAg Aplication Services
      </button>
      <button
        onClick={onIntegrationClick}
        className="text-black px-5 py-6 text-base hover:border-b-2 hover:border-[#65C7D5] "
      >
        PLN Integration Services
      </button>
    </div>
  );
}
