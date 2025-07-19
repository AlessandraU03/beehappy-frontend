import React, { useState } from 'react';
import Button from '../../../shared/components/Button';
import ModalCalibracion from '../../sensores/components/ModalCalibracion';
import { useTiposSensores } from '../../sensores/hooks/useSensores';
import { createColmenaSensor } from '../../sensores/services/create_sensores';
import { createCalibracion } from '../../sensores/services/calibracion_sensores';
import Input from '../../../shared/components/Input';

const StepSensoresCalibracion = ({ formState, onFinish }) => {
  const { colmenaId, sensores, handleSensorChange } = formState;
  const { tiposSensores, loading, error } = useTiposSensores();

  const [sensorActivo, setSensorActivo] = useState(null);
  const [calibraciones, setCalibraciones] = useState({});

  // Checkbox sensors list según los sensores reales que tienes
  const sensoresLista = ['temperatura', 'humedad', 'piezoelectrico', 'frecuencia', 'peso'];

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    handleSensorChange(e);

    if (checked) {
      const sensor = tiposSensores.find((s) => s.nombre === name);
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

        const sensorApi = tiposSensores.find((s) => s.nombre === key);
        if (!sensorApi) continue;

        // Crear relación colmena-sensor
        await createColmenaSensor({
          id_colmena: colmenaId,
          nombre_sensor: sensorApi.nombre,
          estado: 'activo',
        });

        // Crear calibración si existe para este sensor
        const cal = calibraciones[sensorApi.id];
        if (cal) {
          await createCalibracion({
            ...cal,
            id_colmena: colmenaId,
            id_sensor: sensorApi.id,
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

  if (loading) return <p>Cargando tipos de sensores...</p>;
  if (error) return <p>Error cargando sensores: {error.message}</p>;

  return (
    <>
      <h2 className="text-2xl text-white font-bold mb-4">Paso 2: Asociar sensores y calibrar</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {sensoresLista.map((key) => (
          <Input
            key={key}
            type="checkbox"
            name={key}
            checked={sensores[key] || false}
            onChange={handleToggle}
            placeholder={key}
            containerClassName="text-lg"
            label={key.charAt(0).toUpperCase() + key.slice(1)}
          />
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
