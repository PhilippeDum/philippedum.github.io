import { Suspense } from "react";
import { getData } from "@/app/lib/data"
import Projects from "@/app/@projects/page";
import DemoReels from "@/app/@demo_reels/page";
import Navbar from "./components/Navbar";

type ContentItem = {
    id?: number;
    key?: string;
    Key?: string;
    value?: string;
    Value?: string;
};

export default function Home() {
    try{
        const data = getData();

        if (!data) {
            return (
                <div className="h-screen container flex justify-center items-center flex-col bg-gradient-to-br from-blue-900 via-purple-900 to-black">
                    <h1 className="sm:text-2xl">Erreur détectée !</h1>
                    <h1 className="sm:text-xl">Erreur lors de la récupération des données</h1>
                </div>
            )
        }
        const content = data?.content ?? [];
        const demo_reels = data?.demo_reels ?? [];
        const projects = data?.projects ?? [];
        const categories = data?.categories ?? [];

        const contentDictionary = Array.isArray(content)
        ? content.reduce((acc: { [key: string]: string }, item: ContentItem) => {
           const key = item.key ?? item.Key;
           const value = item.value ?? item.Value;
           if (key) acc[key] = value ?? "";
           return acc;
        }, {}) : {};

        return (
            <div>
                <a href="#" className="scroll-top">↑</a>

                <header className="flow-effect">
                    <Navbar />
                    <div className="header-content container">
                        <div>
                            <h1 className="title">Dumoulin Philippe</h1>
                            <hr/>
                            <h2 className="subtitle">Développeur Unity</h2>
                        </div>
                    </div>

                    <div>
                        <svg className="waves" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                            <defs>
                                <path id="gentle-wave"
                                      d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
                            </defs>
                            <g className="parallax">
                                <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"/>
                                <use href="#gentle-wave" x="48" y="3" fill="rgba(239, 240, 255, 0.5)"/>
                                <use href="#gentle-wave" x="48" y="5" fill="rgba(240, 235, 255, 0.3)"/>
                                <use href="#gentle-wave" x="48" y="7" fill="rgba(223, 220, 235, 1)"/>
                            </g>
                        </svg>
                    </div>

                    <div className="header-footer container">
                        <a href={contentDictionary["linkedin_link"] || "#"}>LinkedIn</a>
                        <a href={contentDictionary["github_link"] || "#"}>Github</a>
                        <a href={contentDictionary["itchio_link"] || "#"}>Itch.io</a>
                    </div>
                </header>

                <main className="content">

                    <br/><br/><br/>

                    {contentDictionary["website_description"] && (
                        <div className="content-description">
                            <br/>
                            <h2 style={{ whiteSpace: "pre-line" }}>
                                {contentDictionary["website_description"].replace(/\\n/g, "\n")}
                            </h2>
                            <br/>
                        </div>
                    )}

                    <br/><br/><br/>

                    <Suspense fallback={<p>Chargement des demo reels...</p>}>
                        <DemoReels demo_reels={demo_reels} />
                    </Suspense>

                    <br/><br/><br/>

                    <Suspense fallback={<p>Chargement des projets...</p>}>
                        <Projects projects={projects} categories={categories} />
                    </Suspense>
                </main>
            </div>
        )
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return <h1 className="text-red-500">{error.message}</h1>;
        } else {
            return <h1 className="text-red-500">An unknown error occurred</h1>;
        }
    }
}
