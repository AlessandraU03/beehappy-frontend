// src/features/estadisticas/pages/EstadisticasDashboard.jsx

import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import TabsNavEstadisticas from '../components/TavsNabEstadisticas';
import Graficas from '../components/Graficas';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function EstadisticasDashboard() {
  const { hiveId } = useParams();
  const [activeTab, setActiveTab] = useState('dia');
  const reportRef = useRef();

  const formattedDate = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: es });

  const exportToPDF = () => {
    const element = reportRef.current;
    const opt = {
      margin:       0.5,
      filename:     `Colmena-${hiveId}-${activeTab}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="p-6">
      <TabsNavEstadisticas activeTab={activeTab} setActiveTab={setActiveTab} />


      <div
        ref={reportRef}
        className="bg-[#062343] text-white rounded-lg p-6 shadow-lg max-w-6xl mx-auto mt-4"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-yellow-400">Colmena {hiveId}</h2>
          <div className="text-xl font-semibold">{formattedDate}</div>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded"
            onClick={exportToPDF}
          >
            📝 Exportar pdf
          </button>
        </div>

        <Graficas activeTab={activeTab} />
      </div>
    </div>
  );
}
