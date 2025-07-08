// src/features/alertas/components/AlertaCard.jsx
import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { AlertCircle } from 'lucide-react';

export default function AlertaCard({
  numeroColmena,
  variable,
  valorActual,
  valorCorrecto,
  fechaHora,
  checked,
  onCheckedChange,
  variant = 'default',
}) {
  const fechaFormateada = format(new Date(fechaHora), "dd 'de' MMMM 'del' yyyy – hh:mm aaa", {
    locale: es,
  });

  if (variant === 'compact') {
    return (
      <div className="bg-yellow-400 text-[#062343] rounded-md p-4 shadow-md space-y-2 relative">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-medium">
              Variable afectada: <strong>{variable}</strong>
            </p>
            <p className="text-lg font-medium">
              Valor actual: <strong>{valorActual}</strong>
            </p>
            <p className="text-lg font-medium">
              Valor correcto: <strong>{valorCorrecto}</strong>
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#062343] text-white px-3 py-1 rounded-md text-sm font-semibold">
            <AlertCircle className="w-4 h-4" />
            Activa
          </div>
        </div>
        <div className="text-right text-sm font-semibold">{fechaFormateada}</div>
      </div>
    );
  }

  // Estilo por defecto
  return (
    <div className="flex items-stretch bg-[#0D3B66] rounded-md shadow-md overflow-hidden text-white">
      <div className="bg-[#062343] flex flex-col items-center justify-center px-6 py-4 min-w-[100px]">
        <span className="text-xl font-semibold">Colmena</span>
        <span className="text-4xl font-bold">{numeroColmena}</span>
      </div>

      <div className="flex-1 p-4">
        <p className="text-lg font-medium">
          Variable afectada: <span className="font-bold">{variable}</span>
        </p>
        <p className="text-lg font-medium">
          Valor actual: <span className="font-bold">{valorActual}</span>
        </p>
        <p className="text-lg font-medium">
          Valor correcto: <span className="font-bold">{valorCorrecto}</span>
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-yellow-400 font-semibold">{fechaFormateada}</span>
          <input
            type="checkbox"
            className="form-checkbox w-5 h-5 text-yellow-400"
            checked={checked}
            onChange={onCheckedChange}
          />
        </div>
      </div>
    </div>
  );
}
