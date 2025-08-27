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
    const webUrl = "https://itsm-helpdesk.unotek.co.id/beranda";
    window.open(webUrl, "_blank");
  };

  const onClickWhatsapp = () => {
    const waUrl = "https://wa.me/6285121053911";
    window.open(waUrl, "_blank");
  };

  const onClickCall = () => {
    const phoneUrl = "tel:+6285121053911";
    window.location.href = phoneUrl;
  };

  const iconButtonClass =
    "rounded-full p-2 bg-[#65C7D5]/10 hover:bg-[#65C7D5]/20 cursor-pointer transition-all duration-300";

  return (
    <div className="bg-white py-6 px-5 flex items-center gap-4">
      <h2 className="text-black text-sm font-normal">
        Pengguna Dapat Menghubungi Service Helpdesk :
      </h2>
      <button className={iconButtonClass} onClick={onClickMail}>
        <IoMailOpen className="text-[#65C7D5] text-2xl" />
      </button>
      <button className={iconButtonClass} onClick={onClickWebsite}>
        <BiWorld className="text-[#65C7D5] text-2xl" />
      </button>
      <button className={iconButtonClass} onClick={onClickWhatsapp}>
        <RiWhatsappFill className="text-[#65C7D5] text-2xl" />
      </button>
      <button className={iconButtonClass} onClick={onClickCall}>
        <IoCall className="text-[#65C7D5] text-xl" />
      </button>
    </div>
  );
}
