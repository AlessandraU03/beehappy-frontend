import React, { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import TabsNavEstadisticas from '../components/TavsNabEstadisticas';
import Graficas from '../components/Graficas';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getColmenaById } from '../../colmenas/services/get_colmena_byID';

export default function EstadisticasDashboard() {
  const { hiveId } = useParams();
  const [activeTab, setActiveTab] = useState('dia');
  const [colmena, setColmena] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reportRef = useRef();

  const formattedDate = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: es });

  useEffect(() => {
    const fetchColmena = async () => {
      try {
        const data = await getColmenaById(hiveId);
        setColmena(data);
      } catch (err) {
        console.error('Error al obtener la colmena:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchColmena();
  }, [hiveId]);

  const exportToPDF = () => {
    const element = reportRef.current;
    const opt = {
      margin: 0.5,
      filename: `Colmena-${colmena?.identificador || hiveId}-${activeTab}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  if (loading) {
    return <div className="text-white text-center text-xl mt-8">Cargando información de la colmena...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center text-xl mt-8">❌ {error}</div>;
  }

  return (
    <div className="p-6">
      <TabsNavEstadisticas activeTab={activeTab} setActiveTab={setActiveTab} />

      <div
        ref={reportRef}
        className="bg-[#062343] text-white rounded-lg p-6 shadow-lg max-w-6xl mx-auto mt-4"
      >
        {/* Header con diseño responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-3xl font-bold text-yellow-400">
            Colmena {colmena?.identificador || hiveId}
          </h2>

          <div className="text-xl font-semibold text-white">
            {formattedDate}
          </div>

          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded w-full sm:w-auto"
            onClick={exportToPDF}
          >
            📝 Exportar PDF
          </button>
        </div>

        <Graficas activeTab={activeTab} />
      </div>
    </div>
  );
}
