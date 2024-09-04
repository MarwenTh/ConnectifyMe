import Link from "next/link";
import { FcBrokenLink } from "react-icons/fc";

export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <FcBrokenLink size={25} className=" flex-shrink-0" />
    </Link>
  );
};
