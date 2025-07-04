import { FaPlus } from 'react-icons/fa';
import ColmenasResumen from '../components/ColmenasResumen';

function Colmenas() {
  return (
    <div className="relative p-6">
      {/* Botón en esquina superior derecha */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={() => window.location.href = '/formulario-colmena'}
          className="flex items-center gap-2 bg-[#FBB03B] text-[#1C2A39] font-bold px-4 py-2 rounded-lg shadow hover:brightness-110 transition-all"
        >
          {/* Ícono dentro de caja redondeada */}
          <div className="border-2 border-[#1C2A39] rounded-md p-1 flex items-center justify-center">
            <FaPlus className="text-[#1C2A39] text-sm" />
          </div>
          Agregar nueva colmena
        </button>
      </div>

      <ColmenasResumen />
    </div>
  );
}

export default Colmenas;
