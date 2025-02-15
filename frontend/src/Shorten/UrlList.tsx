import React from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/url";

interface UrlListProps {
    shortUrls: { shortUrl: string; originalUrl: string }[];
    onDelete: (shortUrl: string) => void;
}

const UrlList: React.FC<UrlListProps> = ({ shortUrls, onDelete }) => {
    const handleDelete = async (shortUrl: string) => {
        await axios.delete(`${API_URL}/delete/${shortUrl}`);
        onDelete(shortUrl);
    };

    return (
        <ul>
            {shortUrls.map((url) => (
                <li key={url.shortUrl} className="border p-2 mb-2 flex justify-between items-center">
                    <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        {url.shortUrl}
                    </a>
                    <button
                        onClick={() => handleDelete(url.shortUrl)}
                        className="bg-red-500 text-white px-2 py-1 rounded ml-4"
                    >
                        Удалить
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default UrlList;
