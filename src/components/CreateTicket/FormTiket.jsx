import React from "react";

export default function FormTiket({ title, placeholder }) {
  return (
    <div className="px-5 pb-6 flex justify-between items-center">
      <h3>{title}</h3>
      <input
        className="w-4/5 border-2 border-slate-200 rounded-lg p-2"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}
