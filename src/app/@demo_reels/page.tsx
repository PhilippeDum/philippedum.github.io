'use client'

import { useEffect, useState } from "react";
import {DemoReel} from "@/app/components/Data";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DemoReels(){

    const [demoReels, setDemoReels] = useState<DemoReel[]>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchDemoReels() {
            try {
                const response = await fetch(`${API_URL}/api/demo_reels`, {cache: "no-store"});

                if (!response.ok) throw new Error('Erreur lors de la récupération des demo reels');

                const data = await response.json();

                setDemoReels(data);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchDemoReels();
    }, []);

    if (error) return <h1 className="text-red-500">Erreur : {error}</h1>;
    if (demoReels.length === 0) return <p>Chargement...</p>;

    return (
        <div className="demo_reels">
            <br/>
            <h1 className="sm:text-3xl">Demo Reels ({demoReels.length})</h1>
            <br/>
            <div className="h-0.5 bg-gray-600" />
            <br/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 m-5">
                {demoReels.map((demoReel) => (
                    <div key={demoReel.id}>
                        <iframe
                            key={demoReel.id} src={demoReel.link} title={demoReel.title}
                            className="w-full aspect-video self-stretch md:min-h-96"
                            aria-hidden="true"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            onError={() => console.log(` Erreur de chargement iframe : ${demoReel.link}`)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}