// src/features/monitoreo/components/HiveCard.jsx
import React from 'react';

const HiveCard = ({ hive, onClick }) => {
    return (
        <div
            className="flex w-full max-w-[522px] rounded-lg shadow-lg cursor-pointer overflow-hidden"
            onClick={() => onClick(hive.id)}
        >
            {/* Left Section (Dark Blue) */}
            <div className="flex-shrink-0 flex items-center justify-center w-1/4 bg-blue-950 text-white p-4">
                <div className="text-6xl font-bold">{hive.id}</div> {/* Assuming hive.id will be '1' for this specific card */}
            </div>

            {/* Right Section (Orange) */}
            <div className="flex-grow bg-yellow-500 text-blue-950 p-6">
                <h3 className="text-2xl font-semibold mb-2">Colmena {hive.id}</h3>
<p className="text-lg mb-1">Área: {hive.area}</p>
<p className="text-lg mb-4">Tipo: {hive.type}</p>
                <p className="text-base">Humedad, Peso, Sonido, Temperatura</p>
            </div>
        </div>
    );
};

export default HiveCard;