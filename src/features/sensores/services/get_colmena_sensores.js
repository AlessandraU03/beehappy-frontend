export const getColmenaSensoresByColmena = async (idColmena) => {
  const res = await fetch('http://44.196.168.136:8080/api/v1/colmena-sensores/', {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Error al obtener sensores');
  }

  const data = await res.json();
  return data.filter((rel) => rel.id_colmena === idColmena);
};
