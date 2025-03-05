import Link from "next/link";

interface NavbarProps {
    github_link?: string;
    linkedin_link?: string;
    itchio_link?: string;
}

export const Navbar = ({
       github_link = "#",
       linkedin_link = "#",
       itchio_link = "#"
    }: NavbarProps) => {
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
                   <Link href={github_link} className="mx-2">
                       Github
                   </Link>
                   <Link href={linkedin_link} className="mx-2">
                       LinkedIn
                   </Link>
                   <Link href={itchio_link} className="mx-2">
                       Itchio
                   </Link>
               </div>
           </div>
       </nav>
   )
};