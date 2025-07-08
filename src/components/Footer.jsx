import Image from "next/image";
import React from "react";
import logoFooter from "../assets/footer.png";
import { FaFacebookSquare } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-white flex justify-between py-6">
      <div className="flex flex-col gap-4  ml-14">
        <Image
          src={logoFooter}
          alt="Footer"
          width="auto"
          className="w-20 h-12 object-contain"
        />
        <p className="text-sm">
          Gedung Prudential Centre <br />
          Lantai 11 unit A B C D E Kota Kasablanka <br />
          Jl. Casablanca Raya Kav.88, Jakarta Selatan 12870
        </p>
      </div>
      <div className="self-end mr-14 flex flex-col items-center gap-2">
        <h1>Social Media</h1>
        <div>
          <ul className="flex gap-4">
            <li>
              <FaFacebookSquare />
            </li>
            <li>
              <RiInstagramFill />
            </li>
            <li>
              <FaSquareXTwitter />
            </li>
            <li>
              <FaLinkedin />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
