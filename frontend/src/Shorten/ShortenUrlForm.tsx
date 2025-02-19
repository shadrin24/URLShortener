import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/url";

interface ShortenUrlFormProps {
    onShorten: (newUrl: { id: number; shortUrl: string; originalUrl: string }) => void;
}

const ShortenUrlForm: React.FC<ShortenUrlFormProps> = ({ onShorten }) => {
    const [originalUrl, setOriginalUrl] = useState("");
    const [alias, setAlias] = useState(""); // Новое поле для алиаса
    const [expiresAt, setExpiresAt] = useState(""); // Новое поле для даты окончания

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await axios.post(`${API_URL}/shorten`, {
            originalUrl,
            alias: alias || undefined, // Отправляем только если заполнено
            expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined,
        });
        onShorten(response.data);
        setOriginalUrl("");
        setAlias("");
        setExpiresAt("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Введите URL"
                className="border p-2 w-full mb-2"
            />
            <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="Введите алиас (необязательно)"
                className="border p-2 w-full mb-2"
            />
            <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="border p-2 w-full mb-2"
            />
            <button type="submit" className="mt-2 bg-blue-500 text-white p-2 w-full">Сократить URL</button>
        </form>
    );
};

export default ShortenUrlForm;
