import React, { useState, useEffect } from 'react';
import Button from '../../../shared/components/Button';

function ModalCalibracion({ isOpen, onClose, sensor, colmenaId, calibracionInicial, onSave }) {
  const [factor, setFactor] = useState('');
  const [offset, setOffset] = useState('');
  const [valorMax, setValorMax] = useState('');
  const [valorMin, setValorMin] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    if (isOpen) {
      console.log('🪟 Modal abierto para sensor:', sensor);
      console.log('📐 calibracionInicial recibida:', calibracionInicial);

      if (calibracionInicial) {
        setFactor(calibracionInicial.factor_calibracion || '');
        setOffset(calibracionInicial.offset_calibracion || '');
        setValorMax(calibracionInicial.valor_maximo || '');
        setValorMin(calibracionInicial.valor_minimo || '');
        setFecha(calibracionInicial.fecha_calibracion ? new Date(calibracionInicial.fecha_calibracion).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16));
      } else {
        setFactor('');
        setOffset('');
        setValorMax('');
        setValorMin('');
        setFecha(new Date().toISOString().slice(0, 16));
      }
    }
  }, [isOpen, calibracionInicial, sensor]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!factor || !offset || !valorMax || !valorMin || !fecha) {
      alert('Por favor llena todos los campos');
      return;
    }

    const macRaw = sessionStorage.getItem('mac') || '';
    const macRaspberry = macRaw.replace(/(^")|("$)/g, '');

    const calibracion = {
      factor_calibracion: parseFloat(factor),
      offset_calibracion: parseFloat(offset),
      valor_maximo: parseFloat(valorMax),
      valor_minimo: parseFloat(valorMin),
      fecha_calibracion: new Date(fecha).toISOString(),
      id_colmena: Number(colmenaId),
      id_sensor: sensor.id,
      mac_raspberry: macRaspberry,
      ...(calibracionInicial?.id ? { id: calibracionInicial.id } : {}),
    };

    onSave(calibracion);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-96 max-h-[90vh] overflow-auto">
        <h3 className="text-xl font-semibold mb-4">Calibrar Sensor: {sensor?.nombre}</h3>

        

        <div className="space-y-3">
          <div>
            <label className="block font-medium">Factor calibración</label>
            <input
              type="number"
              step="any"
              value={factor}
              onChange={e => setFactor(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block font-medium">Offset calibración</label>
            <input
              type="number"
              step="any"
              value={offset}
              onChange={e => setOffset(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block font-medium">Valor máximo</label>
            <input
              type="number"
              step="any"
              value={valorMax}
              onChange={e => setValorMax(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block font-medium">Valor mínimo</label>
            <input
              type="number"
              step="any"
              value={valorMin}
              onChange={e => setValorMin(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block font-medium">Fecha de calibración</label>
            <input
              type="datetime-local"
              value={fecha}
              onChange={e => setFecha(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button onClick={onClose} className="bg-gray-400 hover:bg-gray-500">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModalCalibracion;
