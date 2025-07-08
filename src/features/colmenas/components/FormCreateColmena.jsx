import React, { useState } from 'react';
import Button from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';

const FormCreateColmena = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      colmenaId,
      nombreColmena,
      areaUbicacion,
      tipoColmena,
      sensores,
    });
    alert('Formulario enviado');
  };

  const handleCancel = () => {
    console.log('Formulario cancelado');
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

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative p-8 min-h-screen bg-[#0C3F72] rounded-lg shadow-2xl w-full max-w-6xl">
        <h1 className="text-white text-4xl font-bold mb-2">¡NUEVA COLMENA!</h1>
        <p className="text-white text-lg mb-8">
          Llena los siguientes datos para comenzar a trabajar con ella.
        </p>

        <form onSubmit={handleSubmit} className="relative pb-28"> {/* padding para los botones flotantes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Input
            labelClassName="text-white text-lg capitalize flex-grow"
              label="Colmena"
              name="colmenaId"
              value={colmenaId}
              onChange={(e) => setColmenaId(e.target.value)}
              placeholder="1"
              readOnly
            />
            <Input
            labelClassName="text-white text-lg capitalize flex-grow"
              label="Nombre de la colmena"
              name="nombreColmena"
              value={nombreColmena}
              onChange={(e) => setNombreColmena(e.target.value)}
            />
            <Input
            labelClassName="text-white text-lg capitalize flex-grow"
              label="Área o ubicación"
              name="areaUbicacion"
              value={areaUbicacion}
              onChange={(e) => setAreaUbicacion(e.target.value)}
              placeholder="Escribir"
            />
            <Input
            labelClassName="text-white text-lg capitalize flex-grow"
  label="Tipo de colmena"
  name="tipoColmena"
  type="select"
  value={tipoColmena}
  onChange={(e) => setTipoColmena(e.target.value)}
  options={[
    { value: 'Langstroth', label: 'Langstroth' },
    { value: 'Dadant', label: 'Dadant' },
    { value: 'Top Bar', label: 'Top Bar' },
  ]}
/>

          </div>

          {/* Sensores */}
<div className="mb-8">
  <p className="text-white text-lg font-semibold mb-4">Sensores:</p>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {['temperatura', 'humedad', 'sonido', 'peso'].map((sensor) => (
      <Input
        key={sensor}
        type="checkbox"
        name={sensor}
        checked={sensores[sensor]}
        onChange={handleSensorChange}
        placeholder={`${sensor}: ${
          sensor === 'temperatura'
            ? '°C'
            : sensor === 'humedad'
            ? '%'
            : sensor === 'sonido'
            ? 'MHz'
            : 'Kg'
        }`}
        containerClassName="flex items-start p-3 rounded-md border-2 border-white "
        inputClassName="mr-3"
        labelClassName="text-white text-lg capitalize flex-grow"
      />
    ))}
  </div>
</div>
<div className="absolute bottom-0 right-0 flex gap-4 p-4">
    <Button type="button" onClick={handleCancel} variant="secondary">
      Cancelar
    </Button>
    <Button type="submit" onClick={handleSubmit} variant="secondary">
      Guardar
    </Button>
  </div>  
  

        </form>

      </div>
    </div>
  );
};

export default FormCreateColmena;
