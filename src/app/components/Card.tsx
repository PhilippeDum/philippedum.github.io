import {Project} from "@/app/components/Data";
import Image from "next/image";

export default function Card({ project }: { project: Project }) {

    const imagesList = project.images.split(',').map(item => item.trim());
    const firstImage = imagesList[0];
    const cardImage = "/projects/" + firstImage;
    const defaultImage = "/projects/a_venir.png";

    return (
        <div className="card" style={{ border: `5px solid ${project.color}` }}>
            <div className="card_head">
                <Image className="card_image"
                     src={firstImage ? cardImage : defaultImage}
                     alt={cardImage} width={100} height={100}
                />
            </div>
            <div className="card_body">
                <h1>{project.title}</h1>
                <p>{project.tagline}</p>
                <div className="inline">
                    <h4>{project.date}</h4>

                    <a key={project.id} href={`/project/${project.id}`}>
                        <button className="default_button">Details</button>
                    </a>
                </div>
            </div>
        </div>
    );
}