// components/Card.js

import Modal from "@/app/components/Modal";

export default function Card({ project }) {

    const imagesList = project.images.split(',').map(item => item.trim());
    const firstImage = imagesList[0];
    const cardImage = "/projects/" + firstImage;
    const defaultImage = "/projects/a_venir.png";

    return (
        <div className="max-w-sm mx-auto rounded-2xl shadow-lg overflow-hidden">
            <img
                className="w-full h-auto object-cover"
                src={firstImage ? cardImage : defaultImage}
                alt="Card Image"
            />
            <div className="p-4 bg-gray-400 bg-opacity-30">
                <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                <p className="text-gray-400">{project.tagline}</p>
                <br/>
                <div className="flex flex-row justify-between items-end flex-wrap">
                    <Modal project={project}/>
                    <h3>{project.date}</h3>
                </div>
            </div>
        </div>
    );
}