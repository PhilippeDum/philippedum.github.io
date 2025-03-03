'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

    const [demo_reels, setDemo_reels] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const [demo_reelsResponse, projectsResponse] = await Promise.all([
                    fetch('/api/demo_reels'),
                    fetch('/api/projects'),
                ]);

                if (!demo_reelsResponse.ok) {
                    throw new Error('Erreur lors de la récupération des demo reels');
                }

                if (!projectsResponse.ok) {
                    throw new Error('Erreur lors de la récupération des projects');
                }

                const demo_reelsData = await demo_reelsResponse.json();
                const projectsData = await projectsResponse.json();

                setDemo_reels(demo_reelsData);
                setProjects(projectsData);
            } catch (error) {
                console.error("Erreur au fetch : ", error, " (", error.message, ")");
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Chargement...</p>
    if (error) return <p>Erreur: {error}</p>;

    return (
        <div className="home">
        {/*<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">*/}
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

            <Image src="/game_developer_banner.png" alt="developer_banner" layout="responsive" width={100} height={100}/>

              <div className="demo_reels">
                  <h2>Demo Reels</h2>
                  <ul>
                      Count : {demo_reels.length}
                      {demo_reels.map((demo_reel) => (
                          // <li key={demo_reel['id']}> -- {demo_reel['id']}. {demo_reel['title']} : <a href={demo_reel['link']}>Click here</a></li>
                          <li key={demo_reel['id']}> -- {demo_reel['id']}. {demo_reel['title']}:
                              <Link key="link_default" href={demo_reel['link']} className="text-blue-500">
                                  Click here
                              </Link>
                              <iframe
                                  src={demo_reel['link']} title={demo_reel['title']}
                                  className="w-full aspect-video self-stretch md:min-h-96"
                                  frameBorder="0" aria-hidden="true"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                              />
                          </li>
                      ))}
                  </ul>
              </div>

                <div className="projects">
                    <h2>Projects</h2>
                    <ul>
                        Count : {projects.length}
                        {projects.map((project) => (
                            <li key={project['id']}> -- {project['id']}. {project['title']}</li>
                      ))}
                  </ul>
              </div>

              <div className="menu">
                  <ul>
                      <li>Home</li>
                      <li >About</li>
                      <li>Projects</li>
                      <li>Github</li>
                  </ul>
              </div>

              <Link key="link_default" href="/#">
                  <p className="hidden md:block">Link to default page</p>
              </Link>

            </main>

            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

                <h1>Footer</h1>
                <p>This is the footer...</p>

            </footer>
        </div>
    );
}
