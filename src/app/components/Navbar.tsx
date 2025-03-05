import Link from "next/link";

export const Navbar = () => {
   return (
       <nav className="bg-gray-800 text-white p-4 sm:p-6 md:flex md:justify-between md:items-center rounded-2xl">
           <div className="container mx-auto flex items-center justify-between">
               <a href="" className="text-2xl font-bold">
                   Website
               </a>
               <div className="hidden md:flex">
                   <Link href="/" className="mx-2">
                       Home
                   </Link>
                   <Link href="/about" className="mx-2">
                       About
                   </Link>
                   <Link href="/github" className="mx-2">
                       Github
                   </Link>
               </div>
           </div>
       </nav>
   )
};