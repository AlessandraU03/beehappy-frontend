import React, { useState } from 'react';
import Button from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createColmena } from '../services/create_colmenas';
import { useColmenaForm } from '../hooks/useColmenaForm';
import { useDeleteColmena } from '../hooks/useDeleteColmena';
import ModalConfirmacion from '../../../shared/components/ModalConfirmacion';
import { updateColmena } from '../services/update_colmena';
import { getColmenaById } from '../services/get_colmena_byID';

const StepDatosColmena = ({ onColmenaCreada }) => {
  const navigate = useNavigate();
  const { deleteColmena } = useDeleteColmena();
  const [modalVisible, setModalVisible] = useState(false);
  
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
    modoEdicion,
  setModoEdicion,
  } = useColmenaForm();
  const formState = {
  colmenaId,
  setColmenaId,
  nombreColmena,
  setNombreColmena,
  areaUbicacion,
  setAreaUbicacion,
  tipoColmena,
  setTipoColmena,

  handleSensorChange,
  modoEdicion,
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const id_usuario = sessionStorage.getItem('user_id');
  if (!id_usuario) return alert('No se ha encontrado el ID del usuario.');

  const data = {
    identificador: colmenaId,
    nombre: nombreColmena,
    area_ubicacion: areaUbicacion,
    tipo_colmena: tipoColmena || 'Langstroth',
    mac_raspberry: mac,
    estado: 'activo',
    id_usuario: Number(id_usuario),
  };

  try {
    if (formState.modoEdicion) {
      const colmenaIdExistente = sessionStorage.getItem('id_colmena');
      if (!colmenaIdExistente) return alert('No se encontró ID de colmena para editar.');

      await updateColmena(Number(colmenaIdExistente), data);
      alert('✅ Colmena actualizada correctamente');
      onColmenaCreada(Number(colmenaIdExistente));
    } else {
      const response = await createColmena(data);
      if (response?.data?.id) {
        sessionStorage.setItem('id_colmena', response.data.id);
        onColmenaCreada(response.data.id);
      } else {
        alert('No se recibió ID de colmena después de crearla.');
      }
    }
  } catch (error) {
    console.error('Error al guardar la colmena:', error);
    alert('Ocurrió un error al guardar la colmena.');
  }
};


  const handleCancelar = async () => {
  const colmenaId = sessionStorage.getItem('id_colmena');
  const modoEdicion = sessionStorage.getItem('modoEdicion') === 'true'; // O usa un estado si lo tienes en contexto

  if (colmenaId && !modoEdicion) {
    try {
      await deleteColmena(Number(colmenaId));
    } catch (err) {
      console.error('Error al cancelar creación:', err);
      alert('Error al cancelar la creación.');
    }
  }

  resetForm();
  sessionStorage.removeItem('paso');
  navigate('/colmenas');
};


useEffect(() => {
  const fetchColmena = async () => {
    if (!modoEdicion) return;

    const colmenaIdExistente = sessionStorage.getItem('id_colmena');
    if (!colmenaIdExistente) return;

    try {
      const data = await getColmenaById(Number(colmenaIdExistente));

      setColmenaId(data.identificador || '');
      setNombreColmena(data.nombre || '');
      setAreaUbicacion(data.area_ubicacion || '');
      setTipoColmena(data.tipo_colmena || 'Langstroth');
      setMac(data.mac_raspberry || '');
    } catch (error) {
      console.error('❌ Error al cargar datos de colmena:', error);
      alert('Ocurrió un error al cargar la colmena para editar.');
    }
  };

  fetchColmena();
}, [modoEdicion]);


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative p-6 sm:p-8 bg-[#0C3F72] rounded-lg shadow-2xl w-full max-w-6xl">
        <h1 className="text-white text-4xl font-bold mb-2">¡NUEVA COLMENA!</h1>
        <p className="text-white text-lg mb-8">
          Llena los siguientes datos para comenzar a trabajar con ella.
        </p>

        <form onSubmit={handleSubmit} className="relative pb-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            {/* ... inputs como ya los tienes ... */}
            <Input
              label="Identificador de la colmena"
              name="identificador"
              value={colmenaId}
              onChange={(e) => setColmenaId(e.target.value)}
              placeholder="COL-001"
              labelClassName="text-white text-lg"
            />
            <Input
              label="Nombre de la colmena"
              name="nombreColmena"
              value={nombreColmena}
              onChange={(e) => setNombreColmena(e.target.value)}
              placeholder="Colmena Central"
              labelClassName="text-white text-lg"
            />
            <Input
              label="Área o ubicación"
              name="areaUbicacion"
              value={areaUbicacion}
              onChange={(e) => setAreaUbicacion(e.target.value)}
              placeholder="Zona Norte"
              labelClassName="text-white text-lg"
            />
            <Input
              label="MAC de la Raspberry"
              name="mac"
              value={mac}
              onChange={(e) => setMac(e.target.value)}
              placeholder="00:00:00:00:00:00"
              labelClassName="text-white text-lg"
            />
            <Input
              label="Tipo de colmena"
              name="tipoColmena"
              type="select"
              value={tipoColmena}
              onChange={(e) => setTipoColmena(e.target.value)}
              options={[
                { value: 'Langstroth', label: 'Langstroth' },
                { value: 'Warre', label: 'Warre' },
                { value: 'Top-Bar', label: 'Top-Bar' },
              ]}
              labelClassName="text-white text-lg"
            />
          </div>

          <div className="absolute bottom-0 right-0 flex flex-col gap-4 p-4 w-full sm:w-auto sm:flex-row sm:justify-end sm:bottom-4 sm:right-4">
            
            <Button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setModalVisible(true)}
            >
              Cancelar creación
            </Button>
            <Button type="submit" variant="secondary">
  {formState.modoEdicion ? 'Actualizar y continuar' : 'Guardar y continuar'}
</Button>

          </div>
        </form>
      </div>

      {/* Modal de confirmación */}
      <ModalConfirmacion
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleCancelar}
        mensaje="¿Estás seguro que deseas cancelar la creación de la colmena? Se eliminarán todos los datos ingresados."
      />
    </div>
  );
};

export default StepDatosColmena;
