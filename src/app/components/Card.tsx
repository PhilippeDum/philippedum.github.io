// components/Card.js

export default function Card({ title, tagline, date, images }) {
    const imagesList = images.split(',').map(item => item.trim());
    const firstImage = imagesList[0];
    let cardImage = "/";
    if (!firstImage || firstImage === "") {
        cardImage += "globe.svg"; // default image
    }else{
        cardImage += images;
    }
    return (
        <div className="max-w-sm mx-auto rounded-2xl shadow-lg overflow-hidden">
            <img
                className="w-full h-auto object-cover"
                src={cardImage}
                alt="Card Image"
            />
            <div className="p-4 bg-gray-400 bg-opacity-30">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-gray-400">{tagline}</p>
                <div className="flex flex-row justify-between items-end">
                    <button className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-600 transition-colors">More...</button>
                    <h3>{date}</h3>
                </div>
            </div>
        </div>
    );
}