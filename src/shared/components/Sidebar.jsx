// shared/components/Sidebar.tsx
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiSettings,
  FiBarChart2,
  FiMonitor,
  FiBell,
} from "react-icons/fi";
import { PiSquaresFourLight } from "react-icons/pi"; // Colmenas
import logo from "/BeeHappy 1.png"; // Asegúrate de tener el logo aquí

const navItems = [
  { to: "/", label: "Inicio", icon: <FiHome /> },
  { to: "/colmenas", label: "Colmenas", icon: <PiSquaresFourLight /> },
  { to: "/estadisticas", label: "Estadísticas", icon: <FiBarChart2 /> },
  { to: "/monitoreo", label: "Monitoreo", icon: <FiMonitor /> },
  { to: "/alertas", label: "Alertas", icon: <FiBell /> },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-max-full bg-[#06192D] text-white flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="flex justify-center items-center p-6 py-12">
          <img src={logo} alt="BeeHappy" className="w-[100px] h-[100px] rounded-full" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-4">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
                  isActive ? "bg-[#0B547A]" : "hover:bg-[#0B547A]/60"
                }`
              }
            >
              <span className="text-xl">{icon}</span>
              <span className="text-sm">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Configuración */}
      <div className="px-4 mb-6">
        <NavLink
          to="/configuracion"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
              isActive ? "bg-[#0B547A]" : "hover:bg-[#0B547A]/60"
            }`
          }
        >
          <FiSettings className="text-xl" />
          <span className="text-sm">Configuración</span>
        </NavLink>
      </div>
    </aside>
  );
}
