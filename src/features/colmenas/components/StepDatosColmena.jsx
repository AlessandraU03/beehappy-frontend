import React from 'react';
import Button from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { useNavigate } from 'react-router-dom';
import { createColmena } from '../services/create_colmenas';
import { useColmenaForm } from '../hooks/useColmenaForm';

const StepDatosColmena = ({ onColmenaCreada }) => {
  const navigate = useNavigate();

  const {
    colmenaId,
    setColmenaId,
    nombreColmena,
    setNombreColmena,
    areaUbicacion,
    setAreaUbicacion,
    tipoColmena,
    setTipoColmena,
    mac,
    setMac,
    handleSensorChange,
    resetForm,
  } = useColmenaForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id_usuario = sessionStorage.getItem('user_id');
    if (!id_usuario) {
      alert('No se ha encontrado el ID del usuario en la sesión.');
      return;
    }

    try {
      const data = {
        identificador: colmenaId,
        nombre: nombreColmena,
        area_ubicacion: areaUbicacion,
        tipo_colmena: tipoColmena || 'Langstroth',
        mac_raspberry: mac,
        estado: 'activo',
        id_usuario: Number(id_usuario),
      };

     const response = await createColmena(data);
console.log('Respuesta del backend al crear colmena:', response);

if (response && response.data && response.data.id) {
  const nuevaId = response.data.id;
  sessionStorage.setItem('id_colmena', nuevaId);

  onColmenaCreada(nuevaId);
} else {
  alert('No se recibió ID de colmena después de crearla.');
}
;
    } catch (error) {
      console.error('Error al crear la colmena:', error);
      alert('Ocurrió un error al crear la colmena. Intenta nuevamente.');
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative p-8 min-h-screen bg-[#0C3F72] rounded-lg shadow-2xl w-full max-w-6xl">
        <h1 className="text-white text-4xl font-bold mb-2">¡NUEVA COLMENA!</h1>
        <p className="text-white text-lg mb-8">
          Llena los siguientes datos para comenzar a trabajar con ella.
        </p>

        <form onSubmit={handleSubmit} className="relative pb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Input
              label="Identificador de la colmena"
              name="identificador"
              value={colmenaId}
              onChange={(e) => setColmenaId(e.target.value)}
              labelClassName="text-white text-lg capitalize flex-grow"
            />
            <Input
              label="Nombre de la colmena"
              name="nombreColmena"
              value={nombreColmena}
              onChange={(e) => setNombreColmena(e.target.value)}
              labelClassName="text-white text-lg capitalize flex-grow"
            />
            <Input
              label="Área o ubicación"
              name="areaUbicacion"
              value={areaUbicacion}
              onChange={(e) => setAreaUbicacion(e.target.value)}
              labelClassName="text-white text-lg capitalize flex-grow"
            />
            <Input
              label="MAC de la Raspberry"
              name="mac"
              value={mac}
              onChange={(e) => setMac(e.target.value)}
              placeholder="00:00:00:00:00:00"
              labelClassName="text-white text-lg capitalize flex-grow"
            />
            <Input
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
              labelClassName="text-white text-lg capitalize flex-grow"
            />
          </div>

          <div className="absolute bottom-0 right-0 flex flex-col gap-4 p-4 w-full sm:w-auto sm:flex-row sm:justify-end">
            <Button type="submit" variant="secondary">
              Guardar y continuar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepDatosColmena;
