import React from 'react';

const HiveCard = ({ hive, onClick }) => {
    return (
        <div
            className="flex flex-col sm:flex-row w-full max-w-[522px] rounded-lg shadow-lg cursor-pointer overflow-hidden"
            onClick={() => onClick(hive.id)}
        >
            {/* Left Section (Dark Blue) */}
            <div className="flex items-center justify-center w-full sm:w-1/4 bg-[#0B1D31] text-white p-4">
                <div className="text-6xl font-bold">{hive.id}</div>
            </div>

            {/* Right Section (Orange) */}
            <div className="w-full sm:flex-grow bg-yellow-500 text-blue-950 p-6">
                <h3 className="text-2xl font-semibold mb-2">Colmena {hive.id}</h3>
                <p className="text-lg mb-1">Área: {hive.area}</p>
                <p className="text-lg mb-4">Tipo: {hive.type}</p>
                <p className="text-base">Humedad, Peso, Sonido, Temperatura</p>
            </div>
        </div>
    );
};

export default HiveCard;
