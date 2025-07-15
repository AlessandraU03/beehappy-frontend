import React, { useState, useEffect } from 'react';
import Button from '../../../shared/components/Button';

const ModalCalibracion = ({ isOpen, onClose, sensor, colmenaId, onSave }) => {
  const [factorCalibracion, setFactorCalibracion] = useState('');
  const [offsetCalibracion, setOffsetCalibracion] = useState('');
  const [valorMaximo, setValorMaximo] = useState('');
  const [valorMinimo, setValorMinimo] = useState('');
  const [fechaCalibracion, setFechaCalibracion] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setFactorCalibracion('');
      setOffsetCalibracion('');
      setValorMaximo('');
      setValorMinimo('');
      setFechaCalibracion('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

const handleSubmit = () => {
  if (!sensor || !colmenaId) {
    alert('Sensor o colmena no definidos');
    return;
  }

  if (
    factorCalibracion.trim() === '' ||
    offsetCalibracion.trim() === '' ||
    valorMaximo.trim() === '' ||
    valorMinimo.trim() === '' ||
    fechaCalibracion.trim() === ''
  ) {
    alert('Por favor completa todos los campos');
    return;
  }

  const macRaspberry = sessionStorage.getItem('mac_raspberry');

  if (!macRaspberry) {
    alert('MAC address no encontrada en sessionStorage');
    return;
  }

  const calibrationData = {
    id_colmena: parseInt(colmenaId),
    id_sensor: parseInt(sensor.id),
    factor_calibracion: parseFloat(factorCalibracion),
    offset_calibracion: parseFloat(offsetCalibracion),
    valor_maximo: parseFloat(valorMaximo),
    valor_minimo: parseFloat(valorMinimo),
    fecha_calibracion: new Date(fechaCalibracion).toISOString(),
    mac_raspberry: macRaspberry,
  };

  console.log('Datos enviados:', calibrationData);
  onSave(calibrationData);
};

  return (
   <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-[#06192D] p-6 rounded-lg text-white w-96 max-w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4">Calibrar Sensor: {sensor.nombre}</h2>

        <label className="block mb-2">
          Factor de calibración:
          <input
            type="number"
            step="0.01"
            value={factorCalibracion}
            onChange={(e) => setFactorCalibracion(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block mb-2">
          Offset de calibración:
          <input
            type="number"
            step="0.01"
            value={offsetCalibracion}
            onChange={(e) => setOffsetCalibracion(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block mb-2">
          Valor máximo:
          <input
            type="number"
            step="0.01"
            value={valorMaximo}
            onChange={(e) => setValorMaximo(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block mb-2">
          Valor mínimo:
          <input
            type="number"
            step="0.01"
            value={valorMinimo}
            onChange={(e) => setValorMinimo(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block mb-4">
          Fecha calibración:
          <input
            type="datetime-local"
            value={fechaCalibracion}
            onChange={(e) => setFechaCalibracion(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </label>

        <div className="flex justify-end text-[#F7B440] gap-4">
          <Button
            type="button"
            onClick={onClose}
            variant='primary'
            className="bg-gray-300 px-4  py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant='primary'
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalCalibracion;
