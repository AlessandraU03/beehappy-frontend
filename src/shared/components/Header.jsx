import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
import { useAuth } from "../../app/providers/authProvider";

export const Header = ({ title, showBack = false }) => {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth(); // ⬅️ usa el logout del contexto

  const handleLogout = async () => {
    await logout();            // 1. Borra sesión y token
    navigate("/login");        // 2. Redirige al login
  };

  return (
    <header className="flex justify-between items-center border-b border-white/70 py-4 px-6 text-white ">
      <div className="flex items-center gap-4">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 hover:text-yellow-300"
          >
            <ArrowLeft size={20} />
            <span>Volver</span>
          </button>
        )}
        <h1 className="text-3xl font-poppins font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm">Bienvenido</p>
          <p className="font-bold">{usuario}</p>
        </div>
        <img
          src="/avatar.png"
          alt="User"
          className="w-10 h-10 rounded-full border border-white"
        />
        <button title="Cerrar sesión" onClick={handleLogout}>
          <LogOut className="hover:text-yellow-300" />
        </button>
      </div>
    </header>
  );
};
