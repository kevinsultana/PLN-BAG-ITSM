import Image from "next/image";
import React from "react";
import HeroImge from "../../assets/heroImg.png";

export default function HeroImg() {
  return (
    <div className="flex justify-center items-center py-6 px-14">
      <Image src={HeroImge} alt="Hero" width="auto" />
    </div>
  );
}
