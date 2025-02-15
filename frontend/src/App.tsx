import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/url";

const App: () => React.ReactElement = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrls, setShortUrls] = useState<{ id: number; shortUrl: string; originalUrl: string }[]>([]);

  useEffect(() => {
    axios.get(API_URL).then((response) => setShortUrls(response.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post(API_URL, { originalUrl });
    setShortUrls([...shortUrls, response.data]);
    setOriginalUrl("");
  };

  return (
      <div className="p-4 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Введите URL"
              className="border p-2 w-full"
          />
          <button type="submit" className="mt-2 bg-blue-500 text-white p-2 w-full">
            Сократить URL
          </button>
        </form>
        <ul>
          {shortUrls.map((url) => (
              <li key={url.id} className="border p-2 mb-2">
                <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {url.shortUrl}
                </a>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default App;
