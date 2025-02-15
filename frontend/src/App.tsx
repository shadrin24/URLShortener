import React, { useState, useEffect } from "react";
import axios from "axios";
import ShortenUrlForm from "./Shorten/ShortenUrlForm";
import UrlList from "./Shorten/UrlList";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/url";

const App: React.FC = () => {
    const [shortUrls, setShortUrls] = useState<{ shortUrl: string; originalUrl: string }[]>([]);

    useEffect(() => {
        axios.get(API_URL).then((response) => setShortUrls(response.data));
    }, []);

    const addShortUrl = (newUrl: { shortUrl: string; originalUrl: string }) => {
        setShortUrls([...shortUrls, newUrl]);
    };

    const deleteShortUrl = (shortUrl: string) => {
        setShortUrls(shortUrls.filter((url) => url.shortUrl !== shortUrl));
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
            <ShortenUrlForm onShorten={addShortUrl} />
            <UrlList shortUrls={shortUrls} onDelete={deleteShortUrl} />
        </div>
    );
};

export default App;
