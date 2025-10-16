import {DemoReel} from "@/app/components/Data";

interface DemoReelsProps {
    demo_reels: DemoReel[];
}

export default function DemoReels({ demo_reels }: DemoReelsProps) {
    if (!demo_reels || demo_reels.length === 0) return <p>Aucune démo disponible.</p>;

    return (
        <div className="demo_reels">
            <br/>
            <h1 className="sm:text-3xl">Demo Reels</h1>
            <br/>
            <div className="h-0.5 bg-gray-600" />
            <br/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 m-5">
                {demo_reels.map((demoReel) => (
                    <div key={demoReel.title}>
                        <iframe
                            key={demoReel.id} src={demoReel.link} title={demoReel.title}
                            className="w-full aspect-video self-stretch md:min-h-96"
                            aria-hidden="true"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}