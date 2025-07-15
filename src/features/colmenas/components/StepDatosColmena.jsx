import React from 'react';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';
import { createColmena } from '../services/create_colmenas';

const StepDatosColmena = ({ formState, onColmenaCreada }) => {
  const {
    colmenaId,
    setColmenaId,
    nombreColmena,
    setNombreColmena,
    areaUbicacion,
    setAreaUbicacion,
    tipoColmena,
    setTipoColmena,
  } = formState;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombreColmena || !colmenaId) return alert('Completa los campos');

    try {
      const nueva = await createColmena({
        identificador: colmenaId,
        nombre: nombreColmena,
        area_ubicacion: areaUbicacion,
        tipo_colmena: tipoColmena || 'Langstroth',
        estado: 'activo',
      });

      setColmenaId(nueva.id); // guarda ID recibido
      onColmenaCreada();
    } catch (error) {
      alert('Error al crear colmena');
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">1. Datos de la colmena</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="identificador" label="Identificador" value={colmenaId} onChange={(e) => setColmenaId(e.target.value)} />
        <Input name="nombre" label="Nombre" value={nombreColmena} onChange={(e) => setNombreColmena(e.target.value)} />
        <Input name="area_ubicacion" label="Ubicación" value={areaUbicacion} onChange={(e) => setAreaUbicacion(e.target.value)} />
        <Input
          name="tipo_colmena"
          label="Tipo de Colmena"
          type="select"
          options={[
            { label: 'Langstroth', value: 'Langstroth' },
            { label: 'Dadant', value: 'Dadant' },
            { label: 'Top Bar', value: 'Top Bar' },
          ]}
          value={tipoColmena}
          onChange={(e) => setTipoColmena(e.target.value)}
        />
        <Button type="submit">Crear Colmena</Button>
      </form>
    </>
  );
};

export default StepDatosColmena;
