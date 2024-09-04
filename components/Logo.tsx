import Link from "next/link";
import { FcBrokenLink } from "react-icons/fc";
import { motion } from "framer-motion";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <FcBrokenLink size={25} className=" flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold text-black dark:text-white whitespace-pre"
      >
        ConnectifyMe
      </motion.span>
    </Link>
  );
};
