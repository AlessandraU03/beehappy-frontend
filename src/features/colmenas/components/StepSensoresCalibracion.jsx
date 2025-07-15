import React, { useState } from 'react';
import Button from '../../../shared/components/Button';
import ModalCalibracion from '../../sensores/components/ModalCalibracion';
import { useTiposSensores } from '../../sensores/hooks/useSensores';
import { createColmenaSensor } from '../../sensores/services/create_sensores';
import { createCalibracion } from '../../sensores/services/calibracion_sensores';

const StepSensoresCalibracion = ({ formState, onFinish }) => {
  const { colmenaId, sensores, handleSensorChange } = formState;
  const { tiposSensores } = useTiposSensores();
  const [sensorActivo, setSensorActivo] = useState(null);
  const [calibraciones, setCalibraciones] = useState({});

  const mapNombres = {
    temperatura: 'DS18B20',
    humedad: 'HUM',
    peso: 'PESO',
    sonido: 'PIEZO',
  };

  const handleToggle = (e) => {
    handleSensorChange(e);
    const { name, checked } = e.target;
    if (checked) {
      const sensor = tiposSensores.find((s) => s.nombre === mapNombres[name]);
      if (sensor) setSensorActivo(sensor);
    }
  };

  const handleGuardarCalibracion = (cal) => {
    setCalibraciones((prev) => ({ ...prev, [cal.id_sensor]: cal }));
    setSensorActivo(null);
  };

  const handleFinalizar = async () => {
    try {
      for (const key in sensores) {
        if (!sensores[key]) continue;

        const sensorApi = tiposSensores.find((s) => s.nombre === mapNombres[key]);
        if (!sensorApi) continue;

        await createColmenaSensor({
          id_colmena: colmenaId,
          nombre_sensor: mapNombres[key],
          estado: 'activo',
        });

        const cal = calibraciones[sensorApi.id];
        if (cal) {
          await createCalibracion({
            ...cal,
            id_colmena: colmenaId,
            mac_raspberry: sessionStorage.getItem('mac_raspberry'),
          });
        }
      }

      onFinish();
    } catch (err) {
      alert('Error al guardar sensores/calibraciones');
      console.error(err);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">2. Asociar sensores y calibrar</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {['temperatura', 'humedad', 'sonido', 'peso'].map((key) => (
          <label key={key} className="flex items-center space-x-2 text-lg">
            <input
              type="checkbox"
              name={key}
              checked={sensores[key]}
              onChange={handleToggle}
            />
            <span>{key}</span>
          </label>
        ))}
      </div>

      <Button onClick={handleFinalizar}>Finalizar y guardar todo</Button>

      <ModalCalibracion
        isOpen={!!sensorActivo}
        onClose={() => setSensorActivo(null)}
        sensor={sensorActivo}
        colmenaId={colmenaId}
        onSave={handleGuardarCalibracion}
      />
    </>
  );
};

export default StepSensoresCalibracion;
