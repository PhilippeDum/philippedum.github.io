'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import {Navbar} from "@/app/components/Navbar";
import {DemoReel, Project, Category} from "@/app/components/Data";
import Card from "@/app/components/Card";

function SetupProjects(projects: Project[], categories: Category[]) {
    const projectsPerCategory = [];

    for (let category of categories) {
        const categoryProject = [];

        for (let project of projects) {
            if (category.id == project.category) {
                categoryProject.push(project);
            }
        }

        projectsPerCategory.push({
            key: category.title,
            value: categoryProject
        });
    }

    return projectsPerCategory;
}

export default function Home() {

    const [content, setContent] = useState<{ [key: string]: string }>({});
    const [demo_reels, setDemo_reels] = useState<DemoReel[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectsPerCategory, setProjectsPerCategory] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const [contentResponse, demo_reelsResponse, projectsResponse, categoriesResponse] = await Promise.all([
                    fetch('/api/content'),
                    fetch('/api/demo_reels'),
                    fetch('/api/projects'),
                    fetch('/api/categories'),
                ]);

                if (!contentResponse.ok) {
                    throw new Error('Erreur lors de la récupération du contenu');
                }

                if (!demo_reelsResponse.ok) {
                    throw new Error('Erreur lors de la récupération des demo reels');
                }

                if (!projectsResponse.ok) {
                    throw new Error('Erreur lors de la récupération des projects');
                }

                if (!categoriesResponse.ok) {
                    throw new Error('Erreur lors de la récupération des catégories');
                }

                const contentData = await contentResponse.json();
                const contentDictionaryData = contentData.reduce((acc: { [key: string]: string }, item: { key: string, value: string }) => {
                    acc[item.key] = item.value;
                    return acc;
                }, {});
                const demo_reelsData = await demo_reelsResponse.json();
                const projectsData = await projectsResponse.json();
                const categoriesData = await categoriesResponse.json();

                setContent(contentDictionaryData);
                setDemo_reels(demo_reelsData);
                setProjects(projectsData);

                const projectsPerCategory = SetupProjects(projectsData, categoriesData);
                setProjectsPerCategory(projectsPerCategory);
            } catch (error) {
                console.error("Erreur au fetch : ", error, " (", error.message, ")");
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="relative container flex justify-center items-center flex-col">

            {/*Nuages bleus/violets en arrière-plan*/}
            <div className="absolute inset-0 z-0">
                {/*Première couche de tâches en nuances de bleu/violet*/}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.3),_transparent_60%),_radial-gradient(circle_at_top_left,_rgba(120,0,167,0.25),_transparent_60%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.3),_transparent_60%),_radial-gradient(circle_at_bottom_right,_rgba(26,29,164,0.25),_transparent_60%)]"></div>

                {/*Deuxième couche pour plus de profondeur*/}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.2),_transparent_70%),_radial-gradient(circle_at_center,_rgba(120,0,167,0.15),_transparent_70%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(168,85,247,0.2),_transparent_70%),_radial-gradient(circle_at_top_right,_rgba(26,29,164,0.15),_transparent_70%)]"></div>
            </div>

            <div className="relative z-10">
                <Image src="/game_developer_banner.png" alt="developer_banner" layout="responsive" width={100} height={100}/>
                <main className="m-5">

                    <Navbar github_link={content["github_link"]} linkedin_link={content["linkedin_link"]} itchio_link={content["itchio_link"]} />

                    <br/><br/><br/><br/><br/><br/>

                    {loading && <h1 className="text-3xl">Data loading...</h1>}
                    {error && <h1 className="text-3xl">Error : {error}</h1>}
                    {!loading && !error &&
                        <div>

                            <h1 className="flex justify-center text-center whitespace-pre-wrap text-2xl">
                                {content["website_description"].replace('\\n', '').trim()}
                            </h1>

                            <br/><br/><br/><br/>

                            <div className="demo_reels">
                                <br/>
                                <h1 className="text-3xl">Demo Reels ({demo_reels.length})</h1>
                                <br/>
                                <div className="h-0.5 bg-gray-600" />
                                <br/>
                                <div className="grid grid-cols-2 gap-5 m-5">
                                    {demo_reels.map((demo_reel) => (
                                        <div key={demo_reel.id}>
                                            <iframe
                                                src={demo_reel.link} title={demo_reel.title}
                                                className="w-full aspect-video self-stretch md:min-h-96"
                                                frameBorder="0" aria-hidden="true"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                                            />
                                            <h1>{demo_reel.id}. {demo_reel.title}</h1>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <br/><br/>

                            <div className="projects">
                                <br/>
                                <h1 className="text-3xl">Projects ({projects.length})</h1>
                                <div className="h-0.5 bg-gray-600" />
                                <br/>
                                {projectsPerCategory.map((category) => (
                                    <div key={category.key}>
                                        <h1 className="text-3xl">{category.title}</h1>
                                        <br/>
                                        <h2>{category.key}</h2>
                                        <div className="grid grid-cols-4 gap-5 m-5">
                                            {category.value.map((project) => (
                                                <div key={project.id}>
                                                    <Card project={project}/>
                                                </div>
                                            ))}
                                        </div>
                                        <br/>
                                    </div>
                                ))}
                            </div>

                        </div>
                    }

                </main>

                <br/><br/><br/><br/>

                <footer className="justify-items-center">

                    <h1>Footer</h1>
                    <p>This is the footer...</p>

                </footer>
            </div>
        </div>
    );
}
