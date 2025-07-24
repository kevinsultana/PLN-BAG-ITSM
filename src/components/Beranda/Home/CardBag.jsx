import React from "react";
import { IoMdMore } from "react-icons/io";

export default function CardBag({ item }) {
  return (
    <div className="flex flex-col justify-between bg-white border-2 shadow-xl p-5 border-slate-200  rounded-2xl">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <div className="bg-[#65C7D5] rounded-xl p-2 text-3xl text-white">
              {item.icon}
            </div>
            <p className="text-base font-bold">{item.title}</p>
          </div>
          <button>
            <IoMdMore className="text-2xl" />
          </button>
        </div>
        <p className="text-sm ">{item.desc}</p>
      </div>
    </div>
  );
}
