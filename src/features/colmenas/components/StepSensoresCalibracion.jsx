import React, { useState, useEffect } from 'react';
import Button from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { useTiposSensores } from '../../sensores/hooks/useSensores';
import ModalCalibracion from '../../sensores/components/ModalCalibracion';
import { getColmenaSensores } from '../services/get_colmena_sensores';
import { createColmenaSensor } from '../../sensores/services/create_sensores';
import { deleteColmenaSensor } from '../../sensores/services/delete_colmena_sensor';
import { createCalibracion } from '../../sensores/services/calibracion_sensores';
import { updateCalibracion } from '../../sensores/services/update_calibracion';
import { getCalibracionesByColmena } from '../../sensores/services/get_calibracion_sensores';

const StepSensoresCalibracion = ({ formState, onFinish }) => {
  const { sensores, setSensores, handleSensorChange } = formState;
  const { tiposSensores, loading, error } = useTiposSensores();

  const [sensoresAsignados, setSensoresAsignados] = useState([]);
  const [sensorCalibrar, setSensorCalibrar] = useState(null);
  const [calibrando, setCalibrando] = useState(false);
  const [calibracionesExistentes, setCalibracionesExistentes] = useState({});
  const colmenaId = sessionStorage.getItem('id_colmena');

  // Función para cargar sensores asignados y retornar lista
  const cargarSensoresAsignados = async () => {
    try {
      const todos = await getColmenaSensores();
      const filtrados = todos.filter(s => s.id_colmena === Number(colmenaId));

      const nuevosSensores = {};
      filtrados.forEach(sensor => {
        nuevosSensores[sensor.nombre_sensor] = true;
      });

      setSensores(nuevosSensores);

      const asignadosMapeados = filtrados.map(s => ({
        id: s.id_sensor,
        nombre: s.nombre_sensor,
        idRelacion: s.id,
      }));

      setSensoresAsignados(asignadosMapeados);

      return asignadosMapeados; // Retorna para usar inmediatamente
    } catch (e) {
      console.error('Error obteniendo sensores asignados:', e);
      return [];
    }
  };

  useEffect(() => {
    if (colmenaId) {
      cargarSensoresAsignados();
    }
  }, [colmenaId]);

  // Carga calibraciones por colmenaId
  useEffect(() => {
    if (colmenaId) {
      getCalibracionesByColmena(colmenaId).then(res => {
        const porSensor = {};
        res.calibraciones.forEach(cal => {
          porSensor[cal.id_sensor] = cal;
        });

        console.log('📦 Calibraciones obtenidas de la API:', res.calibraciones);
        console.log('🔍 Mapeo por id_sensor:', porSensor);

        setCalibracionesExistentes(porSensor);
      }).catch(err => {
        console.error('❌ Error cargando calibraciones:', err);
      });
    } else {
      console.warn('⚠️ colmenaId no está definido');
    }
  }, [colmenaId]);

  const handleGuardarCalibracion = async data => {
    try {
      if (data.id) {
        await updateCalibracion(data.id, data);
      } else {
        await createCalibracion(data);
      }
      alert('Calibración guardada');
      setCalibrando(false);
      setSensorCalibrar(null);

      // Recargar calibraciones para actualizar datos mostrados
      if (colmenaId) {
        const res = await getCalibracionesByColmena(colmenaId);
        const porSensor = {};
        res.calibraciones.forEach(cal => {
          porSensor[cal.id_sensor] = cal;
        });
        setCalibracionesExistentes(porSensor);
      }
    } catch (e) {
      console.error('Error guardando calibración:', e);
      alert('Error guardando calibración');
    }
  };

  const handleCheckboxChange = async (e, sensor) => {
    const checked = e.target.checked;

    // Actualiza checkbox local
    handleSensorChange(e);

    if (checked) {
      try {
        console.log('✅ Asociando sensor:', sensor.nombre);

        await createColmenaSensor({
          id_colmena: Number(colmenaId),
          nombre_sensor: sensor.nombre,
          estado: 'activo',
        });

        // Carga lista actualizada y la usa de inmediato
        const sensoresActualizados = await cargarSensoresAsignados();

        const sensorAsignado = sensoresActualizados.find(s => s.nombre === sensor.nombre);
        console.log('🔧 Sensor asignado:', sensorAsignado);
        console.log('🧪 Buscando calibración para id_sensor:', sensorAsignado?.id);
        console.log('📊 Calibración encontrada:', calibracionesExistentes[sensorAsignado?.id]);

        setSensorCalibrar({
          id: sensorAsignado?.id || null,
          nombre: sensor.nombre,
        });

        console.log('🧩 Abriendo modal para sensor ID:', sensorAsignado?.id);
        console.log('🎯 Calibración seleccionada:', calibracionesExistentes[sensorAsignado?.id]);

        setCalibrando(true);
      } catch (err) {
        console.error('❌ Error al asociar sensor a colmena:', err);
        alert('Error al asociar el sensor. Revisa si ya está asignado.');
        setSensores(prev => ({ ...prev, [sensor.nombre]: false }));
      }
    } else {
      try {
        const sensorAsignado = sensoresAsignados.find(s => s.nombre === sensor.nombre);

        if (!sensorAsignado || !sensorAsignado.idRelacion) {
          console.warn('⚠️ No se encontró relación para eliminar');
          return;
        }

        console.log('🗑 Eliminando relación con ID:', sensorAsignado.idRelacion);

        await deleteColmenaSensor(sensorAsignado.idRelacion);

        await cargarSensoresAsignados();
      } catch (err) {
        console.error('❌ Error al eliminar relación colmena-sensor:', err);
        alert('Error al eliminar relación del sensor');
        setSensores(prev => ({ ...prev, [sensor.nombre]: true }));
      }
    }
  };

  if (loading) return <p className="text-white">Cargando tipos de sensores...</p>;
  if (error) return <p className="text-red-500">Error cargando sensores</p>;

  return (
    <>
      <h2 className="text-2xl text-white font-bold mb-4">Paso 2: Asociar sensores</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {tiposSensores.map(sensor => (
          <Input
            key={sensor.id}
            type="checkbox"
            name={sensor.nombre}
            checked={!!sensores[sensor.nombre]}
            onChange={e => handleCheckboxChange(e, sensor)}
            containerClassName="text-lg"
            label={sensor.nombre.charAt(0).toUpperCase() + sensor.nombre.slice(1)}
          />
        ))}
      </div>

      {sensoresAsignados.length > 0 && (
        <div className="mt-6 bg-white/10 p-4 rounded-lg text-white border border-white/20">
          <h3 className="text-lg font-semibold mb-2">Sensores asignados:</h3>
          <ul className="list-disc list-inside space-y-1">
            {sensoresAsignados.map(sensor => (
              <li key={sensor.id}>
                {sensor.nombre.charAt(0).toUpperCase() + sensor.nombre.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button onClick={onFinish} className="w-full sm:w-auto mt-4">
        Finalizar y guardar
      </Button>

      {calibrando && sensorCalibrar && (
        <ModalCalibracion
          isOpen={calibrando}
          onClose={() => {
            setCalibrando(false);
            setSensorCalibrar(null);
          }}
          sensor={sensorCalibrar}
          colmenaId={colmenaId}
          calibracionInicial={calibracionesExistentes[sensorCalibrar?.id]}
          onSave={handleGuardarCalibracion}
        />
      )}
    </>
  );
};

export default StepSensoresCalibracion;
