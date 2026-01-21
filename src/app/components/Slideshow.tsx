"use client";

import { useRef } from "react";
import Image from "next/image";

interface Props {
    images: string[];
    video?: string | null;
}

function getYouTubeId(embedUrl: string): string | null {
    try {
        const url = new URL(embedUrl);
        const parts = url.pathname.split("/");
        return parts[parts.length - 1] || null;
    } catch {
        return null;
    }
}

export default function Slideshow({ images, video }: Props) {
    const defaultImage = "a_venir.png";
    const validImages = images.map(img => (img && img.trim() !== "" ? img : defaultImage));
    let videoThumbnail = undefined;
    
    if (video) {
        const id = getYouTubeId(video);
        videoThumbnail = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
    }

    const elements = video
        ? [{ type: "iframe", src: video, thumb: videoThumbnail }, 
            ...validImages.map(src => ({ type: "image", src, thumb: '' }))]
        : validImages.map(src => ({ type: "image", src, thumb: '' }));

    const dynamicCSS = elements
        .map(
            (_, i) => `
            #slide${i + 1}:checked ~ .slides .slide:nth-of-type(${i + 1}) {
              opacity: 1; z-index: 1;
            }
            #slide${i + 1}:checked ~ .thumbnails .thumb:nth-of-type(${i + 1}) {
              opacity: 1; border-color: #333;
            }`
        )
        .join("\n");

    const thumbsRef = useRef<HTMLDivElement>(null);

    const scrollThumbs = (direction: number) => {
        if (!thumbsRef.current) return;

        const scrollAmount = 200;
        thumbsRef.current.scrollBy({
            left: direction * scrollAmount,
            behavior: "smooth"
        })
    }
    
    return (
        <div className="slideshow">
            {elements.map((_, i) => (
                <input key={i} type="radio" name="slider" id={`slide${i + 1}`} className="slide-radio" defaultChecked={i == 0} />
            ))}
        
            <div className="slides">
                {elements.map((element, i) => (
                    <div key={i} className="slide">
                        {element.type === "image" ? (
                            <Image src={`/projects/${element.src}`} alt={`Slide ${i + 1}`}  width={100} height={100} />
                        ) : (
                            <iframe src={element.src}
                                aria-hidden="true"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen 
                            />
                        )}
                    </div>
                ))}
            </div>

            <br/>
            <div className="thumbnails-wrapper">
                <button className="thumb-arrow left" onClick={() => scrollThumbs(-1)}>
                    ◀
                </button>

                <div className="thumbnails" ref={thumbsRef}>
                    {elements.map((element, i) => (
                        <label key={i} className="thumb" htmlFor={`slide${i + 1}`}>
                            <Image src={element.type === "image" ? `/projects/${element.src}` : element.thumb ?? defaultImage}
                            alt={`Thumbnail ${i + 1}`}  width={100} height={100} />
                        </label>
                    ))}
                </div>

                <button className="thumb-arrow right" onClick={() => scrollThumbs(1)}>
                    ▶
                </button>
            </div>
            <style>{dynamicCSS}</style>
        </div>
    )
}