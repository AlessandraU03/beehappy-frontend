// services/updateEstadoColmena.js
import axios from 'axios';

export const updateEstadoColmena = async (id_colmena, nuevoEstado) => {
  const token = sessionStorage.getItem('token'); // O donde tengas almacenado el token

  const response = await axios.put(
    `http://44.196.168.136:8080/api/v1/colmena/${id_colmena}/estado`,
    { estado: nuevoEstado },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};
