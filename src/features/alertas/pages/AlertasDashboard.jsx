import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AlertaCard from '../components/AlertaCard';

const mockHiveAlertas = [
  {
    numeroColmena: 1,
    variable: 'CO2',
    valorActual: '900ppm',
    valorCorrecto: '600ppm',
    fechaHora: new Date(),
    checked: false,
  },
];

export default function AlertsDashboard() {
  const { hiveId } = useParams();
  const [alertas, setAlertas] = useState(mockHiveAlertas);

  const handleCheck = (index) => {
    const newAlertas = [...alertas];
    newAlertas[index].checked = !newAlertas[index].checked;
    setAlertas(newAlertas);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Alertas para Colmena {hiveId}</h2>
      <div className="space-y-4">
        {alertas.map((alerta, index) => (
          <AlertaCard
            key={index}
            {...alerta}
            onCheckedChange={() => handleCheck(index)}
            variant="compact"
          />
        ))}
      </div>
    </div>
  );
}
