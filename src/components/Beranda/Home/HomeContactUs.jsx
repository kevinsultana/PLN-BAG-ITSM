import React from "react";
import { IoMailOpen } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
import { RiWhatsappFill } from "react-icons/ri";
import { IoCall } from "react-icons/io5";

export default function HomeContactUs() {
  return (
    <div className="bg-white py-6 px-5 flex items-center gap-4">
      <h2 className="text-black font-normal text-sm">
        Pengguna Dapat Menghubungi Service Helpdesk :
      </h2>
      <button className="rounded-full p-2 bg-[#65C7D514]">
        <IoMailOpen className="text-[#65C7D5] text-2xl" />
      </button>
      <button className="rounded-full p-2 bg-[#65C7D514]">
        <BiWorld className="text-[#65C7D5] text-2xl" />
      </button>
      <button className="rounded-full p-2 bg-[#65C7D514]">
        <RiWhatsappFill className="text-[#65C7D5] text-2xl" />
      </button>
      <button className="rounded-full p-2 bg-[#65C7D514]">
        <IoCall className="text-[#65C7D5] text-xl" />
      </button>
    </div>
  );
}
