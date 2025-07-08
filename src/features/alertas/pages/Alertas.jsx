import React, { useState } from 'react';
import AlertaCard from '../components/AlertaCard';
import TabsNav from '../../../shared/components/TabsNav';

const mockData = [
  {
    numeroColmena: 1,
    variable: 'Temperatura',
    valorActual: '38°C',
    valorCorrecto: '33°C',
    fechaHora: new Date(),
    checked: false,
  },
  {
    numeroColmena: 2,
    variable: 'Humedad',
    valorActual: '20%',
    valorCorrecto: '60%',
    fechaHora: new Date(),
    checked: false,
  },
];

export default function Alertas() {
  const [alertas, setAlertas] = useState(mockData);

  const handleCheck = (index) => {
    const newAlertas = [...alertas];
    newAlertas[index].checked = !newAlertas[index].checked;
    setAlertas(newAlertas);
  };

  return (
    <div className="p-6 space-y-4">
        <TabsNav/>
      <h1 className="text-3xl font-bold text-white">Alertas Generales</h1>
      {alertas.map((alerta, index) => (
        <AlertaCard
          key={index}
          {...alerta}
          onCheckedChange={() => handleCheck(index)}
          variant="default"
        />
      ))}
    </div>
  );
}

