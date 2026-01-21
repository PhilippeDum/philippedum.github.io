import Link from "next/link";
import { Project, Tag, Category } from "@/app/components/Data";
import { getData } from "@/app/lib/data";
import HtmlToText from "@/app/components/HtmlToText";
import Slideshow from "@/app/components/Slideshow";

type Props = {
    params: Promise<{ id: string }>;
};

export function generateStaticParams() {
    const data = getData();
    return data.projects.map(project => ({
        id: project.id.toString(),
    }));
}

export default async function ProjectPage({ params }: Props) {    
    try{
        const { id } = await params;
        
        const data = getData();

        if (!data) {
            return (
                <div className="h-screen container flex justify-center items-center flex-col bg-gradient-to-br from-blue-900 via-purple-900 to-black">
                    <h1 className="sm:text-2xl">Erreur détectée !</h1>
                    <h1 className="sm:text-xl">Erreur lors de la récupération des données</h1>
                </div>
            )
        }
        
        const project: Project = data.projects.find(x => x.id.toString() === id);
        const tag: Tag = data.tags.find(x => x.id === project.tag);
        const category: Category = data.categories.find(x => x.id === project.category);

        if (!project) {
            return <div>Project not found</div>
        }

        const projectImages = project.images.split(', ');
        
        return (
            <div className="project-view">
                <a href="/#projects" className="scroll-top">Back</a>

                <div className="project-display">
                <Slideshow images={projectImages} video={project.video} />
                <div className="project-infos" style={{ border: `5px solid ${project.color}` }}>
                    <h1>{project.title}</h1>
                    <br/><br/>
                    <br/>
                    <div className="inline">
                        <h3>Tag</h3>
                        <h4>{tag.title}</h4>
                    </div>
                    <div className="inline">
                        <h3>Category</h3>
                        <h4>{category.title}</h4>
                    </div>
                    <div className="inline">
                        <h3>Color</h3>
                        <h4>{project.color}</h4>
                    </div>
                    <br/><br/>
                    <h3>{project.date}</h3>
                </div>
            </div>

            <br/><br/><br/><br/>

            <div className="project-description">
                <h1 style={{ textDecoration: `underline ${project.color}` }}>Description</h1>
                <br/>
                <HtmlToText html={project.description} />
            </div>
            </div>
        );
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return <h1 className="text-red-500">{error.message}</h1>;
        } else {
            return <h1 className="text-red-500">An unknown error occurred</h1>;
        }
    }
}