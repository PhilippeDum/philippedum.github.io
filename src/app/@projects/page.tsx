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

async function fetchCategories() {

    const categoriesResponse = await fetch(`${API_URL}/api/categories`, { cache: "no-store" });

    if (!categoriesResponse.ok) {
        throw new Error('Erreur lors de la récupération des catégories');
    }

    return categoriesResponse.json();
}

async function fetchProjects() {

    const projectsResponse = await fetch(`${API_URL}/api/projects`, { cache: "no-store" });

    if (!projectsResponse.ok) {
        throw new Error('Erreur lors de la récupération des projects');
    }

    return projectsResponse.json();
}

export default async function Projects(){

    try{

        const projects = await fetchProjects();
        const categories = await fetchCategories();

        const projectsPerCategory = SetupProjects(projects, categories);

        return (
            <div className="projects">
                    <h1 className="sm:text-3xl">Projects ({projects.length})</h1>
                    <div className="h-0.5 bg-gray-600" />
                    <br/>
                    {projectsPerCategory.map((category) => (
                        <div key={category.key}>
                            <h1 className="text-3xl">{category.title}</h1>
                            <br/>
                            <h2>{category.key}</h2>
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
    } catch (error) {
        return <h1 className="text-red-500">Erreur : {error.message}</h1>;
    }
}