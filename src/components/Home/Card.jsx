import React from "react";

export default function Card({ item }) {
  return (
    <div className="flex flex-col justify-between h-60 bg-white/90 border-2 shadow-xl border-slate-200 p-5 rounded-2xl">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-red-500 rounded-xl p-2 text-3xl text-white">
            {item.icon}
          </div>
          <p className="text-base font-bold">{item.title}</p>
        </div>
        <p className="text-sm font-normal">{item.desc}</p>
      </div>
      <div className="">
        <button className="text-sm font-light">Download User Guide</button>
      </div>
    </div>
  );
}
