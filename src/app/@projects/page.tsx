'use client'

import { useEffect, useState } from "react";
import Card from "@/app/components/Card";
import {Category, Project} from "@/app/components/Data";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function SetupProjects(projects: Project[], categories: Category[]) {
    const projectsPerCategory = [];

    for (const category of categories) {
        const categoryProject = [];

        for (const project of projects) {
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

export default function Projects(){

    const [projects, setProjects] = useState<Project[]>([])
    const [projectsPerCategory, setProjectsPerCategory] = useState<{ key: string; value: Project[]; }[]>([])
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const projectsResponse = await fetch(`${API_URL}/api/projects`, {cache: "no-store"});
                const categoriesResponse = await fetch(`${API_URL}/api/categories`, {cache: "no-store"});

                if (!projectsResponse.ok) throw new Error('Erreur lors de la récupération des projets');
                if (!categoriesResponse.ok) throw new Error('Erreur lors de la récupération des catégories');

                const projectsData = await projectsResponse.json();
                const categoriesData = await categoriesResponse.json();

                setProjects(projectsData);
                const projectsSetup = SetupProjects(projectsData, categoriesData);
                setProjectsPerCategory(projectsSetup);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred.");
                }
            }
        }

        fetchData();
    }, []);

    if (error) return <h1 className="text-red-500">Erreur : {error}</h1>;
    if (setProjects.length === 0) return <p>Chargement...</p>;

    return (
        <div className="projects">
                <h1 className="sm:text-3xl">Projects</h1>
                <div className="h-0.5 bg-gray-600" />
                <br/>
                {projectsPerCategory.map((category) => (
                    <div key={category.key}>
                        <h1 className="text-2xl">{category.key}</h1>
                        <br/>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5">
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
    )
}