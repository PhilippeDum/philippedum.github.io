import Image from "next/image";
import {Suspense} from "react";
import Link from "next/link";
import Projects from "@/app/@projects/page";
import DemoReels from "@/app/@demo_reels/page";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchContent() {

    const contentResponse = await fetch(`${API_URL}/api/content`, { cache: "no-store" });

    if (!contentResponse.ok) {
        throw new Error('Erreur lors de la récupération des contents');
    }

    return contentResponse.json();
}

export default async function Home() {

    try{
        const content = await fetchContent();

        const contentDictionary = content.reduce((acc: { [key: string]: string }, item: { key: string, value: string }) => {
            acc[item.key] = item.value;
            return acc;
        }, {});

        return (
            <div className="container flex justify-center items-center flex-col bg-gradient-to-br from-blue-900 via-purple-900 to-black">

                <div className="whitespace-normal break-words">
                    <Image src="/game_developer_banner.png" alt="developer_banner" width={3000} height={300}/>
                    <main className="m-5">

                        <br/><br/><br/>

                        <h1 className="flex justify-center text-center whitespace-pre-wrap sm:text-2xl">
                            {contentDictionary["website_description"].replace('\\n', '').trim()}
                        </h1>

                        <br/><br/><br/>

                        <Suspense fallback={<p>Chargement des demo reels...</p>}>
                            <DemoReels />
                        </Suspense>

                        <br/><br/>

                        <Suspense fallback={<p>Chargement des projets...</p>}>
                            <Projects />
                        </Suspense>

                    </main>

                    <br/><br/><br/><br/>

                    <div className="h-0.5 bg-gray-600" />

                    <footer className="justify-items-center m-5">

                        <h1 className="sm:text-2xl">Contact :</h1>
                        <br/>
                        <div className="flex flex-col sm:flex-row gap-5 underline text-blue-400">
                            <Link className="hover:text-blue-500" href={contentDictionary["github_link"] || "#"}>Github</Link>
                            <Link className="hover:text-blue-500" href={contentDictionary["linkedin_link"] || "#"}>LinkedIn</Link>
                            <Link className="hover:text-blue-500" href={contentDictionary["itchio_link"] || "#"}>Itch.io</Link>
                        </div>

                    </footer>
                </div>
            </div>
        )
    } catch (error) {
        if (error instanceof Error){
            return <h1 className="text-red-500">{error.message}</h1>;
        } else {
            return <h1 className="text-red-500">An unknown error occurred</h1>;
        }
    }
}
