let socket = null;
let listener = null;

const isDev = process.env.NODE_ENV === 'development';

// Función para imprimir logs de forma controlada
const log = {
  debug: (...args) => isDev && console.debug('[🐛 DEBUG]', ...args),
  info: (...args) => isDev && console.info('[ℹ️ INFO]', ...args),
  warn: (...args) => isDev && console.warn('[⚠️ WARN]', ...args),

};

// Conectar al WebSocket
export const connectToHiveWS = (mac_raspberry) => {
  if (socket) {
    socket.close();
  }

  const wsUrl = `ws://3.224.227.15:8080/ws?account=${mac_raspberry}`;
  socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    log.info(`WebSocket conectado para Hive ${mac_raspberry}`);
    log.debug(`URL: ${wsUrl}`);
  };

  socket.onerror = (err) => {
    log.error(`Error en WebSocket para Hive ${mac_raspberry}:`, err);
  };

  socket.onclose = (event) => {
    log.warn(`WebSocket cerrado para Hive ${mac_raspberry}. Motivo:`, event.reason || 'Sin especificar');
  };
};

// Suscribirse a actualizaciones y procesar sensores
export const subscribeToHiveUpdates = (callback) => {
  listener = callback;

  if (socket) {
    socket.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        const { sender, content } = data;

        log.debug(`[WebSocket] Datos recibidos de ${sender}:`, content);

        // Normalizar y recorrer los sensores
        for (const key in content) {
          if (content.hasOwnProperty(key)) {
            const nombre_sensor = key.trim(); // conservar mayúsculas si es necesario
            const valorStr = content[key].trim();
            const valor = parseFloat(valorStr);

            if (!isNaN(valor)) {
              const payload = {
                mac_raspberry: sender,
                nombre_sensor,
                valor
              };

              try {
                const response = await fetch('http://44.194.210.138:8081/api/v1/tiempo_real', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(payload)
                });

                if (response.ok) {
                  log.info(`✅ POST enviado:`, payload);
                } else {
                  const errorText = await response.text();
                  log.warn(`❌ Error en POST (${response.status}):`, errorText);
                }
              } catch (postError) {
                log.error("❗ Error al enviar POST:", postError);
              }
            } else {
              log.warn(`⚠️ Valor inválido para ${nombre_sensor}:`, valorStr);
            }
          }
        }

        // Callback opcional
        if (listener) {
          listener(content);
        }

      } catch (err) {
        log.error("❌ Error al procesar mensaje WebSocket:", err);
      }
    };
  } else {
    log.warn("⚠️ WebSocket no está conectado.");
  }
};


// Desconectar WebSocket
export const disconnectFromHiveWS = () => {
  if (socket) {
    socket.close();
    socket = null;
    log.info("🔌 WebSocket desconectado");
  }
  listener = null;
};
