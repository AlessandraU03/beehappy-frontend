import { FaPlus } from 'react-icons/fa';
import ColmenasResumen from '../components/ColmenasResumen';

function Colmenas() {
  return (
    <div className="relative p-4 sm:p-6">
      {/* Botón en esquina superior derecha, con ajustes para móvil */}
      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10">
        <button
          onClick={() => window.location.href = '/formulario-colmena'}
          className="flex items-center gap-2 bg-[#FBB03B] text-[#1C2A39] font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow hover:brightness-110 transition-all whitespace-nowrap"
        >
          {/* Ícono dentro de caja redondeada */}
          <div className="border-2 border-[#1C2A39] rounded-md p-1 flex items-center justify-center">
            <FaPlus className="text-[#1C2A39] text-xs sm:text-sm" />
          </div>
          <span className="text-xs sm:text-sm">Agregar nueva colmena</span>
        </button>
      </div>

      <ColmenasResumen />
    </div>
  );
}

export default Colmenas;
