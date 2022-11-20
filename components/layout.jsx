import Link from "next/link";
import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <div className="bg-background text-textcolor">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
