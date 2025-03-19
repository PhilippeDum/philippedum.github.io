// components/Card.js

export default function Card({ project }) {

    const imagesList = project.images.split(',').map(item => item.trim());
    const firstImage = imagesList[0];
    const cardImage = "/projects/" + firstImage;
    const defaultImage = "/projects/a_venir.png";

    return (
        <div className="max-w-sm mx-auto rounded-2xl shadow-lg overflow-hidden">
            <img
                className="w-full h-auto object-cover"
                src={cardImage}
                alt="Card Image"
                onError={(e) => e.currentTarget.src = defaultImage} // default image
            />
            <div className="p-4 bg-gray-400 bg-opacity-30">
                <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                <p className="text-gray-400">{project.tagline}</p>
                <div className="flex flex-row justify-between items-end">
                    <button className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-600 transition-colors">More...</button>
                    <h3>{project.date}</h3>
                </div>
            </div>
        </div>
    );
}