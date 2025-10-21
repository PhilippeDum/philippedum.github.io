import Card from "@/app/components/Card";
import {Category, Project} from "@/app/components/Data";

function SetupProjects(projects: Project[], categories: Category[]) {
    const projectsPerCategory = [];

    let categoryId = 1;
    for (const category of categories) {
        const categoryProject = [];

        for (const project of projects) {
            if (categoryId == project.category) {
                categoryProject.push(project);
            }
        }

        projectsPerCategory.push({
            key: category,
            value: categoryProject
        });

        categoryId++;
    }

    return projectsPerCategory;
}

interface ProjectsSetupProps {
    projects: Project[];
    categories: Category[];
}

export default function Projects({ projects, categories }: ProjectsSetupProps){
    const projectsList = projects ?? [];
    const categoriesList = categories ?? [];

    const projectsSetup = SetupProjects(projectsList, categoriesList) ?? [];

    if (!projectsSetup || projectsSetup.length === 0) return <p>Aucun projet disponible.</p>;

    return (
        <div className="projects">
            <h1 className="sm:text-3xl">Projects</h1>
            <div className="h-0.5 bg-gray-600" />
            <br/>
            {projectsSetup.map((category, index) => (
                category.value.length > 0 && (
                    <div key={index} className="m-5">
                        <h1 className="text-2xl">● {category.key.title}</h1>
                        <h1 className="text-lg">{category.key.description}</h1>
                        <br/>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {category.value.map((project) => (
                                <div key={project.id}>
                                    <Card project={project}/>
                                </div>
                            ))}
                        </div>
                        <br/>
                    </div>
                )
            ))}
        </div>
    )
}