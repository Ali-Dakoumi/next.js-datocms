import Link from "next/link";
import Search from "./search";

export default function Navbar() {
  console.log("navbar rendered ");
  return (
    <ul className="maw-w-full flex justify-between items-center w-full">
      <li className="font-ilyas text-[3rem]">
        <Link href={"/"}>TATTICA</Link>
      </li>
      <li className="mx-8">
        <Search />
      </li>
    </ul>
  );
}
