'use client'

import { useState } from "react";
import HtmlToText from "@/app/components/HtmlToText";
import Image from "next/image";
import {Project} from "@/app/components/Data";

function GetImagesCount(project: Project){
    if (!project.images)
        return 0;

    const imagesList = project.images.split(',').map(item => item.trim());
    return imagesList.length;
}

export default function Modal({ project }: { project: Project }) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const projectImages = project.images.split(', ');

    const defaultImage = "/projects/a_venir.png";

    return (
        <div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    onClick={openModal}>
                More...
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
                    <div className="bg-white rounded-md shadow-lg w-11/12 h-[90%] text-black overflow-auto border-8" style={{ borderColor: project.color }}
                         onClick={(e) => e.stopPropagation()}>

                        <div className="sticky top-0 bg-white z-10 p-8 pb-0">
                            <div className="flex flex-row justify-between">
                                <h2 className="text-3xl"><strong style={{ color: project.color }}>{project.title}</strong></h2>
                                <button className="bg-red-500 text-white w-10 h-10 sm:py-2 sm:px-4 rounded-md hover:bg-red-600"
                                        onClick={closeModal}>
                                    X
                                </button>
                            </div>
                            <br/>
                            <div className="h-0.5 bg-gray-600" />
                        </div>

                        <div>
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
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}