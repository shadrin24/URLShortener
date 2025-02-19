import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/url";

interface ShortenUrlFormProps {
    onShorten: (newUrl: { id: number; shortUrl: string; originalUrl: string }) => void;
}

const ShortenUrlForm: React.FC<ShortenUrlFormProps> = ({ onShorten }) => {
    const [originalUrl, setOriginalUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [expiresAt, setExpiresAt] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await axios.post(`${API_URL}/shorten`, {
            originalUrl,
            alias: alias || undefined,
            expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined,
        });
        onShorten(response.data);
        setOriginalUrl("");
        setAlias("");
        setExpiresAt("");
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Сократить URL</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="Введите URL"
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="text"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    placeholder="Введите алиас (необязательно)"
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="date"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 active:scale-95"
                >
                    Сократить URL
                </button>
            </form>
        </div>
    );
};

export default ShortenUrlForm;
