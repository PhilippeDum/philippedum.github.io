export type DemoReel = {
    id: number;
    title: string;
    link: string;
};

export type Project = {
    id: number;
    title: string;
    description: string;
    date: string;
    formation: number;
    color: string;
    genre: string;
    tag: number;
    tagline: string;
    images: string;
    video: string;
    category: number;
};

export type Category = {
    id: number;
    title: string;
}