import {DemoReel} from "@/app/components/Data";

interface DemoReelsProps {
    demo_reels: DemoReel[];
}

export default function DemoReels({ demo_reels }: DemoReelsProps) {
    if (!demo_reels || demo_reels.length === 0) return <p>Aucune démo disponible.</p>;

    return (
        <section id="demoreels">
            <br/>
            <h1>Demo-Reels</h1>
            <hr/>
            <br/>
            <section>
                <h3>Voici mes différentes demo-reels</h3>
                <div className="demoreels-grid">
                    {demo_reels.map((demoReel) => (
                        <div key={demoReel.id} className="video_wrapper">
                            <iframe
                                key={demoReel.id} src={demoReel.link} title={demoReel.title}
                                className="card_video"
                                aria-hidden="true"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                    ))}
                </div>
            </section>
        </section>
    )
}