import Link from "next/link";

export default function Navbar() {
  return (
    <ul className="flex justify-between	w-full border-b-2 border-bordercolor ">
      <li className="font-ilyas text-[3rem]">
        <Link href={"/"}>TATTICA</Link>
      </li>
      <li>{/* <Link href={"/allposts"}></Link> */}</li>
    </ul>
  );
}
