import React from "react";
import { IoMailOpen } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
import { RiWhatsappFill } from "react-icons/ri";
import { IoCall } from "react-icons/io5";

export default function HomeContactUs() {
  const onClickMail = () => {
    const mailToLink = "mailto:servicedesk@bahteradhiguna.co.id";
    window.open(mailToLink, "_blank");
  };

  const onClickWebsite = () => {
    const webUrl = "URL_WEBSITE_ITSM";
    window.open(webUrl, "_blank");
  };

  const onClickWhatsapp = () => {
    const waUrl = "https://wa.me/NOMOR_WHATSAPP_HELPDESK";
    window.open(waUrl, "_blank");
  };

  const onClickCall = () => {
    const phoneUrl = "tel:NOMOR_TELEPON_HELPDESK";
    window.location.href = phoneUrl;
  };

  return (
    <div className="bg-white py-6 px-5 flex items-center gap-4">
      <h2 className="text-black font-normal text-sm">
        Pengguna Dapat Menghubungi Service Helpdesk :
      </h2>
      <button className="rounded-full p-2 bg-[#65C7D514] hover:bg-sky-100 cursor-pointer transition-all duration-300 ">
        <IoMailOpen onClick={onClickMail} className="text-[#65C7D5] text-2xl" />
      </button>
      <button className="rounded-full p-2 bg-[#65C7D514] hover:bg-sky-100 cursor-pointer transition-all duration-300">
        <BiWorld onClick={onClickWebsite} className="text-[#65C7D5] text-2xl" />
      </button>
      <button className="rounded-full p-2 bg-[#65C7D514] hover:bg-sky-100 cursor-pointer transition-all duration-300">
        <RiWhatsappFill
          onClick={onClickWhatsapp}
          className="text-[#65C7D5] text-2xl"
        />
      </button>
      <button className="rounded-full p-2 bg-[#65C7D514] hover:bg-sky-100 cursor-pointer transition-all duration-300">
        <IoCall onClick={onClickCall} className="text-[#65C7D5] text-xl" />
      </button>
    </div>
  );
}
