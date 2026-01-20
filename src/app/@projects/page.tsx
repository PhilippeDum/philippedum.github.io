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
        <section id="projects">
            <br/>
            <h1>Projects</h1>
            <hr/>
            <br/>
            {projectsSetup.map((category, index) => (
                category.value.length > 0 && (
                    <section key={index}>
                        <h2>● {category.key.title}</h2>
                        <h3>{category.key.description}</h3>
                        <div className="projects-grid">
                            {category.value.map((project) => (
                                <div key={project.id}>
                                    <Card project={project}/>
                                </div>
                            ))}
                        </div>
                        <br/>
                    </section>
                )
            ))}
        </section>
    )
}