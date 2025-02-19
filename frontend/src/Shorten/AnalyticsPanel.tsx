import React from "react";

interface AnalyticsProps {
    analytics: { clickCount: number; lastIPs: string[] } | null;
    shortUrl: string | null;
}

const AnalyticsPanel: React.FC<AnalyticsProps> = ({ analytics, shortUrl }) => {
    if (!analytics || !shortUrl) return <div className="p-4 text-gray-500">Выберите ссылку для просмотра аналитики</div>;

    return (
        <div className="p-4 border-l w-64">
            <h2 className="text-lg font-bold">Аналитика</h2>
            <p className="text-sm text-gray-600">Ссылка: <strong>{shortUrl}</strong></p>
            <p className="mt-2">Количество переходов: <strong>{analytics.clickCount}</strong></p>
            <h3 className="mt-2 font-semibold">Последние 5 IP:</h3>
            <ul className="text-sm text-gray-700">
                {analytics.lastIPs.length > 0 ? (
                    analytics.lastIPs.map((ip, index) => <li key={index}>{ip}</li>)
                ) : (
                    <li>Нет данных</li>
                )}
            </ul>
        </div>
    );
};

export default AnalyticsPanel;
