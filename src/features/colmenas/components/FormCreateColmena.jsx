import React, { useEffect } from 'react';
import Button from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { useColmenaForm } from '../hooks/useColmenaForm';
import { createColmena } from '../services/Create_colmenas';
import { updateColmena } from '../services/update_colmena';
import { getColmenaById } from '../services/get_colmena_byID';

const FormCreateColmena = ({ isEdit = false, initialData = {}, onSubmit }) => {
  const navigate = useNavigate();
  const { hiveId } = useParams();

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
    resetForm,
  } = useColmenaForm();

  useEffect(() => {
    const fetchData = async () => {
      if (!isEdit) return;

      try {
        const data = await getColmenaById(hiveId);
        if (!data) return;

        setColmenaId(data.identificador || '');
        setNombreColmena(data.nombre || '');
        setAreaUbicacion(data.area_ubicacion || '');
        setTipoColmena(data.tipo_colmena || '');
        setSensores(data.sensores || {
          temperatura: false,
          humedad: false,
          sonido: false,
          peso: false,
        });
      } catch (error) {
        console.error('Error al cargar datos de colmena:', error);
      }
    };

    fetchData();
  }, [isEdit, hiveId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const colmenaData = {
      identificador: colmenaId || 'TEMP-ID',
      nombre: nombreColmena,
      area_ubicacion: areaUbicacion,
      tipo_colmena: tipoColmena,
      estado: 'activo',
      sensores,
    };

    try {
      if (isEdit && hiveId) {
        await updateColmena(hiveId, colmenaData);
        alert('Colmena actualizada correctamente');
        navigate(`/colmenas/${hiveId}`);
      } else {
        await createColmena(colmenaData);
        alert('Colmena creada correctamente');
        navigate('/colmenas');
      }

      resetForm();
      onSubmit?.();
    } catch (error) {
      console.error('Error al guardar colmena:', error);
      alert('Hubo un error al guardar la colmena.');
    }
  };

  const handleCancel = () => {
    resetForm();
    onSubmit?.();
    navigate('/colmenas');
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative p-8 min-h-screen bg-[#0C3F72] rounded-lg shadow-2xl w-full max-w-6xl">
        <h1 className="text-white text-4xl font-bold mb-2">
          {isEdit ? 'EDITAR COLMENA' : '¡NUEVA COLMENA!'}
        </h1>
        <p className="text-white text-lg mb-8">
          {isEdit
            ? 'Modifica los datos necesarios de la colmena.'
            : 'Llena los siguientes datos para comenzar a trabajar con ella.'}
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
                  containerClassName="flex items-start p-3 rounded-md border-2 border-white"
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
            <Button type="submit" variant="secondary">
              {isEdit ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCreateColmena;
