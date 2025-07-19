import React, { useState, useEffect } from 'react';
import Button from '../../../shared/components/Button';

const ModalCalibracion = ({ isOpen, onClose, sensor, colmenaId, onSave }) => {
  const [factor, setFactor] = useState('');
  const [offset, setOffset] = useState('');
  const [valorMax, setValorMax] = useState('');
  const [valorMin, setValorMin] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Inicializar valores, por ejemplo fecha actual en ISO
      setFecha(new Date().toISOString().slice(0, 16)); // formato YYYY-MM-DDTHH:mm
      setFactor('');
      setOffset('');
      setValorMax('');
      setValorMin('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Validaciones básicas
    if (!factor || !offset || !valorMax || !valorMin || !fecha) {
      alert('Por favor llena todos los campos');
      return;
    }

    const calibracion = {
      factor_calibracion: parseFloat(factor),
      offset_calibracion: parseFloat(offset),
      valor_maximo: parseFloat(valorMax),
      valor_minimo: parseFloat(valorMin),
      fecha_calibracion: new Date(fecha).toISOString(),
      id_colmena: colmenaId,
      id_sensor: sensor.id,
      mac_raspberry: sessionStorage.getItem('mac_raspberry'),
    };

    onSave(calibracion);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h3 className="text-xl font-semibold mb-4">Calibrar Sensor: {sensor?.nombre}</h3>

        <label className="block mb-2">
          Factor de calibración
          <input
            type="number"
            step="0.01"
            value={factor}
            onChange={(e) => setFactor(e.target.value)}
            className="w-full border rounded p-2"
          />
        </label>

        <label className="block mb-2">
          Offset de calibración
          <input
            type="number"
            step="0.01"
            value={offset}
            onChange={(e) => setOffset(e.target.value)}
            className="w-full border rounded p-2"
          />
        </label>

        <label className="block mb-2">
          Valor máximo
          <input
            type="number"
            step="0.01"
            value={valorMax}
            onChange={(e) => setValorMax(e.target.value)}
            className="w-full border rounded p-2"
          />
        </label>

        <label className="block mb-2">
          Valor mínimo
          <input
            type="number"
            step="0.01"
            value={valorMin}
            onChange={(e) => setValorMin(e.target.value)}
            className="w-full border rounded p-2"
          />
        </label>

        <label className="block mb-4">
          Fecha calibración
          <input
            type="datetime-local"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full border rounded p-2"
          />
        </label>

        <div className="flex justify-end space-x-2">
          <Button onClick={onClose} variant="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Guardar Calibración</Button>
        </div>
      </div>
    </div>
  );
};

export default ModalCalibracion;
