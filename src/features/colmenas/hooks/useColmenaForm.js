import { useState } from 'react';

export const useColmenaForm = () => {
  const [colmenaId, setColmenaId] = useState('');
  const [nombreColmena, setNombreColmena] = useState('');
  const [areaUbicacion, setAreaUbicacion] = useState('');
  const [tipoColmena, setTipoColmena] = useState('');
  const [sensores, setSensores] = useState({
    temperatura: false,
    humedad: false,
    sonido: false,
    peso: false,
  });

  const handleSensorChange = (e) => {
    setSensores({
      ...sensores,
      [e.target.name]: e.target.checked,
    });
  };

  const resetForm = () => {
    setColmenaId('');
    setNombreColmena('');
    setAreaUbicacion('');
    setTipoColmena('');
    setSensores({
      temperatura: false,
      humedad: false,
      sonido: false,
      peso: false,
    });
  };

  return {
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
    resetForm,
  };
};
