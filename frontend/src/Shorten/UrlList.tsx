import React from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/url";

interface UrlListProps {
    shortUrls: { shortUrl: string; originalUrl: string }[];
    onDelete: (shortUrl: string) => void;
    onAnalytics: (shortUrl: string) => void;
}

const UrlList: React.FC<UrlListProps> = ({ shortUrls, onDelete, onAnalytics }) => {
    const handleDelete = async (shortUrl: string) => {
        await axios.delete(`${API_URL}/delete/${shortUrl}`);
        onDelete(shortUrl);
    };

    const handleRedirect = async (event: React.MouseEvent<HTMLAnchorElement>, shortUrl: string) => {
        event.preventDefault(); // Останавливаем стандартный переход

            try {
                const response = await axios.get(`${API_URL}/${shortUrl}`);
                const originalUrl = response.data;

                // Открываем ссылку в новой вкладке
                window.open(originalUrl, "_blank", "noopener,noreferrer");
        } catch (error) {
            console.error("Ошибка при получении ссылки:", error);
            alert("Не удалось перейти по ссылке");
        }
    };

    return (
        <ul>
            {shortUrls.map((url) => (
                <li key={url.shortUrl} className="border p-2 mb-2 flex justify-between items-center">
                    <a
                        href="#"
                        onClick={(e) => handleRedirect(e, url.shortUrl)}
                        className="text-blue-500 underline cursor-pointer"
                    >
                        {url.shortUrl}
                    </a>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onAnalytics(url.shortUrl)}
                            className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                            Аналитика
                        </button>
                        <button
                            onClick={() => handleDelete(url.shortUrl)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Удалить
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default UrlList;
