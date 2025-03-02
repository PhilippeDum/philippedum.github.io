import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home">
    {/*<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">*/}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <Image src="/game_developer_banner.png" alt="developer_banner" layout="responsive" width={100} height={100}/>

        <ul>
          <li>Home</li>
          <li >About</li>
          <li>Projects</li>
          <li>Github</li>
        </ul>

          <Link key="link_default" href="/#">
              <p className="hidden md:block">Link to default page</p>
          </Link>

        <div className="projects">
          <h1>List of my projects</h1>
        </div>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

        <h1>Footer</h1>

      </footer>
    </div>
  );
}
