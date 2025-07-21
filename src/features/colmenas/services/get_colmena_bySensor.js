// services/get_colmena_con_sensores.js
export async function getColmenaConSensores(idColmena) {
  const token = sessionStorage.getItem('auth_token'); // o de donde tengas el token

  const res = await fetch(`http://44.196.168.136:8080/api/v1/colmena/${idColmena}/sensores`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`Error al obtener colmena con sensores: ${res.statusText}`);

  const data = await res.json();
  return data; // { colmena: {...}, sensores: [...] }
}
