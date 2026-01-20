import Link from "next/link";
import { Project } from "@/app/components/Data";
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
/*function GetImagesCount(project: Project){
    if (!project.images)
        return 0;

    const imagesList = project.images.split(',').map(item => item.trim());
    return imagesList.length;
}*/

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

        if (!project) {
            return <div>Project not found</div>
        }

        const projectImages = project.images.split(', ');
        
        return (
            <div className="project">

                <Slideshow images={projectImages} video={project.video} />

                <br/><br/><br/><br/>
                
                <h1>{project.title}</h1>
                <HtmlToText html={project.description} />

                <Link href="/">← Retour aux projets</Link>
                
                <br/><br/>

                {/*<div>
                    {project.video == "" ?
                        <Image
                            className="object-cover rounded w-5/6 h-auto md:w-1/2 aspect-video mx-auto md:min-h-96 mt-4"
                            src={defaultImage}
                            alt={defaultImage}
                            width={500}
                            height={500}
                        />
                        :
                        <iframe
                            src={project.video}
                            className="w-5/6 h-auto md:w-1/2 aspect-video mx-auto md:min-h-96 mt-4"
                            aria-hidden="true"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    }

                    <div className="p-8">
                        {(() => {
                            const imageCount = GetImagesCount(project);

                            if (imageCount === 0) {
                                return <HtmlToText html={project.description} />;
                            }

                            if (imageCount == 1) {
                                return (
                                    <div className="grid md:grid-cols-[60%_40%] mt-6 gap-4">
                                        <div>
                                            <HtmlToText html={project.description} />
                                        </div>
                                        <div className="flex flex-col items-center">
                                            {projectImages.map((image: string, id: number) => (
                                                <Image
                                                    key={id}
                                                    className="object-cover rounded mb-4"
                                                    src={"/projects/" + image}
                                                    alt={image}
                                                    width={500}
                                                    height={500}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )
                            }

                            return (
                                <div>
                                    <HtmlToText html={project.description} />
                                    <br/>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
                                        {projectImages.map((image: string, id: number) => (
                                            <Image
                                                key={id}
                                                className="object-cover rounded mb-4"
                                                src={"/projects/" + image}
                                                alt={image}
                                                width={500}
                                                height={500}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>*/}
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