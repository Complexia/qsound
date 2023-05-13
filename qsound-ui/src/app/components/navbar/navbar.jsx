import ConnectButton from "@/app/components/metamask/connectButton/connectButton";
import Link from "next/link";

export default function Navbar({ children }) {
  return (
    <div className="max-w-[1260px] mx-auto">
      <nav className="bg-gray-900 text-gray-100 rounded-b-lg">
        <Link href="/" className="text-2xl font-bold">
            Purchase Pass
        </Link>
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          {/* <Link href="/" className="text-2xl font-bold">
            Qsound
          </Link> */}
          <ConnectButton />
        </div>
      </nav>
      {children}
    </div>
  );
}
