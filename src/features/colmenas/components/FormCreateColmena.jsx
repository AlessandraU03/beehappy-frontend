import React, { useState } from 'react';
import StepDatosColmena from './StepDatosColmena';
import StepSensoresCalibracion from './StepSensoresCalibracion';
import { useColmenaForm } from '../hooks/useColmenaForm';
import Button from '../../../shared/components/Button';

const FormCreateColmena = () => {
  const [paso, setPaso] = useState(1);
  const {
    colmenaId,
    setColmenaId,
    nombreColmena,
    setNombreColmena,
    areaUbicacion,
    setAreaUbicacion,
    tipoColmena,
    setTipoColmena,
    sensores,
    setSensores,
    handleSensorChange,
  } = useColmenaForm();

  const formState = {
    colmenaId,
    setColmenaId,
    nombreColmena,
    setNombreColmena,
    areaUbicacion,
    setAreaUbicacion,
    tipoColmena,
    setTipoColmena,
    sensores,
    setSensores,
    handleSensorChange,
  };

  const handleColmenaCreada = () => {
    setPaso(2);
  };

  const handleFinalizar = () => {
    alert('Colmena y sensores guardados correctamente');
    setPaso(1); // o redireccionar a lista de colmenas
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Barra de pasos */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1 flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paso >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>1</div>
          <div className="ml-2 text-sm font-medium">Datos Colmena</div>
        </div>
        <div className="flex-1 h-1 bg-gray-300 mx-2">
          <div className={`h-1 ${paso > 1 ? 'bg-blue-600 w-full' : 'bg-blue-200 w-0'}`}></div>
        </div>
        <div className="flex-1 flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paso >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>2</div>
          <div className="ml-2 text-sm font-medium">Sensores y calibración</div>
        </div>
      </div>

      {/* Contenido del paso */}
      {paso === 1 ? (
        <StepDatosColmena formState={formState} onColmenaCreada={handleColmenaCreada} />
      ) : (
        <>
          <StepSensoresCalibracion formState={formState} onFinish={handleFinalizar} />
          <div className="mt-6">
            <Button variant="secondary" onClick={() => setPaso(1)}>← Volver a datos</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FormCreateColmena;
