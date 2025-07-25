import Image from "next/image";
import React from "react";
import HeroImge from "../../../assets/heroImg.png";

export default function HeroImg() {
  return (
    <div className="flex justify-center items-center">
      <Image src={HeroImge} alt="Hero" width="auto" className="w-full" />
    </div>
  );
}
