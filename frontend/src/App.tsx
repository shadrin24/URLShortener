import React, { useState, useEffect } from "react";
import axios from "axios";
import ShortenUrlForm from "./Shorten/ShortenUrlForm";
import UrlList from "./Shorten/UrlList";
import AnalyticsPanel from "./Shorten/AnalyticsPanel";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/url";

const App: React.FC = () => {
    const [shortUrls, setShortUrls] = useState<{ shortUrl: string; originalUrl: string }[]>([]);
    const [analytics, setAnalytics] = useState<{ clickCount: number; lastIPs: string[] } | null>(null);
    const [selectedShortUrl, setSelectedShortUrl] = useState<string | null>(null);

    useEffect(() => {
        axios.get(API_URL).then((response) => setShortUrls(response.data));
    }, []);

    const addShortUrl = (newUrl: { shortUrl: string; originalUrl: string }) => {
        setShortUrls([...shortUrls, newUrl]);
    };

    const deleteShortUrl = (shortUrl: string) => {
        setShortUrls(shortUrls.filter((url) => url.shortUrl !== shortUrl));
    };

    const fetchAnalytics = async (shortUrl: string) => {
        const response = await axios.get(`${API_URL}/analytics/${shortUrl}`);
        setAnalytics(response.data);
        setSelectedShortUrl(shortUrl);
    };

    return (
        <div className="p-4 max-w-3xl mx-auto flex">
            <div className="w-2/3">
                <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
                <ShortenUrlForm onShorten={addShortUrl} />
                <UrlList shortUrls={shortUrls} onDelete={deleteShortUrl} onAnalytics={fetchAnalytics} />
            </div>
            <AnalyticsPanel analytics={analytics} shortUrl={selectedShortUrl} />
        </div>
    );
};

export default App;
