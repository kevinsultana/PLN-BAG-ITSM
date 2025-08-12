import Image from "next/image";
import React from "react";

export default function HeroImg() {
  return (
    <div className="flex justify-center items-center">
      <Image
        src="/heroImg.png"
        alt="Hero"
        width={1328}
        height={526}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
