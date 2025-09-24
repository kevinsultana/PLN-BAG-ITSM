import React, { useEffect, useState } from "react";
import { IoMailOpen } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
import { RiWhatsappFill } from "react-icons/ri";
import { IoCall } from "react-icons/io5";
import { ProxyUrl } from "@/api/BaseUrl";
import { toast } from "sonner";

export default function HomeContactUs() {
  const [dataHelpdeskInfo, setDataHelpdeskInfo] = useState({});

  const getHelpdeskInfo = async () => {
    try {
      const res = await ProxyUrl.get("/helpdesk-info");
      const data = res.data.data;
      setDataHelpdeskInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHelpdeskInfo();
  }, []);

  const onClickMail = () => {
    if (
      !dataHelpdeskInfo.email ||
      dataHelpdeskInfo.email === "" ||
      dataHelpdeskInfo.email === "-"
    ) {
      toast.error("Email helpdesk tidak tersedia");
      return;
    }
    const mailToLink = `mailto:${dataHelpdeskInfo.email}`;
    window.open(mailToLink, "_blank");
  };

  const onClickWebsite = () => {
    if (
      !dataHelpdeskInfo.portal_url ||
      dataHelpdeskInfo.portal_url === "" ||
      dataHelpdeskInfo.portal_url === "-"
    ) {
      toast.error("Website helpdesk tidak tersedia");
      return;
    }
    const webUrl = dataHelpdeskInfo.portal_url;
    window.open(webUrl, "_blank");
  };

  const onClickWhatsapp = () => {
    if (
      !dataHelpdeskInfo.whatsapp ||
      dataHelpdeskInfo.whatsapp === "" ||
      dataHelpdeskInfo.whatsapp === "-"
    ) {
      toast.error("WhatsApp helpdesk tidak tersedia");
      return;
    }
    if (dataHelpdeskInfo.whatsapp.startsWith("+")) {
      dataHelpdeskInfo.whatsapp = dataHelpdeskInfo.whatsapp.slice(1);
    } else if (dataHelpdeskInfo.whatsapp.startsWith("0")) {
      dataHelpdeskInfo.whatsapp = "62" + dataHelpdeskInfo.whatsapp.slice(1);
    } else if (dataHelpdeskInfo.whatsapp.startsWith("62")) {
      dataHelpdeskInfo.whatsapp = dataHelpdeskInfo.whatsapp;
    } else {
      dataHelpdeskInfo.whatsapp = "62" + dataHelpdeskInfo.whatsapp;
    }
    const waUrl = `https://wa.me/${dataHelpdeskInfo.whatsapp}`;
    window.open(waUrl, "_blank");
  };

  const onClickCall = () => {
    if (
      !dataHelpdeskInfo.phone ||
      dataHelpdeskInfo.phone === "" ||
      dataHelpdeskInfo.phone === "-"
    ) {
      toast.error("Nomor telepon helpdesk tidak tersedia");
      return;
    }
    const phoneUrl = `tel:${dataHelpdeskInfo.phone}`;
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
