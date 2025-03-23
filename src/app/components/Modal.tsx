'use client'

import { useState } from "react";
import HtmlToText from "@/app/components/HtmlToText";
import Image from "next/image";
import {Project} from "@/app/components/Data";

export default function Modal({ project }: { project: Project }) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const projectImages = project.images.split(', ');

    return (
        <div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    onClick={openModal}>
                More...
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
                    <div className="bg-white rounded-md shadow-lg w-8/12 h-5/6 text-black overflow-auto border-8" style={{ borderColor: project.color }}
                         onClick={(e) => e.stopPropagation()}>

                        <div className="sticky top-0 bg-white z-10 p-8 pb-0">
                            <div className="flex flex-row justify-between">
                                <h2 className="sm:text-3xl"><strong style={{ color: project.color }}>{project.title}</strong></h2>
                                <button className="bg-red-500 text-white h-10 sm:py-2 sm:px-4 rounded-md hover:bg-red-600"
                                        onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                            <br/>
                            <div className="h-0.5 bg-gray-600" />
                        </div>

                        <div className="p-8">
                            <iframe
                                src={project.video}
                                className="w-5/6 md:w-1/2 aspect-video mx-auto md:min-h-96 mt-4"
                                frameBorder="0"
                                aria-hidden="true"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />

                            <br/><br/>

                            {project.images.length == 0 ? (
                                <div>
                                    <HtmlToText html={project.description} />
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-[60%_40%] mt-6 gap-4">
                                    <div>
                                        <HtmlToText html={project.description} />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        {projectImages.map((image: string, id: number) => (
                                            <div key={id} className="mb-4">
                                                <Image
                                                    className="object-cover rounded"
                                                    src={"/projects/" + image}
                                                    alt={image}
                                                    width={500}
                                                    height={500}
                                                />
                                                <br/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}