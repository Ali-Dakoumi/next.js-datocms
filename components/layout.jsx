import Navbar from './navbar'

export default function Layout({ children }) {
  return (
    <div className=" min-h-[100vh] w-full  bg-background text-textcolor">
      <div className="col-span-1  border-b-2 border-bordercolor w-full">
        <Navbar />
      </div>
      <main className="">{children}</main>
    </div>
  )
}
