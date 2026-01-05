const https = require('https');

// Variables de Railway (Usa los nombres que tienes configurados)
const RUTA = process.env.DISCORD_URL;
const TOKEN = process.env.WEBHOOK_TOKEN;

/**
 * Función para enviar cualquier información a Discord
 * @param {string} mensaje - El contenido que quieres enviar
 */
function enviarADiscord(mensaje) {
    const urlCompleta = `${RUTA.replace(/\/$/, '')}/${TOKEN.replace(/^\//, '')}`;
    const url = new URL(urlCompleta);

    const data = JSON.stringify({
        content: mensaje,
        username: "Shxdow System Security"
    });

    const options = {
        hostname: url.hostname,
        path: url.pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            'User-Agent': 'NodeJS-Script'
        }
    };

    const req = https.request(options, (res) => {
        if (res.statusCode === 204) {
            console.log("✅ Información enviada correctamente.");
        }
    });

    req.on('error', (e) => console.error("❌ Error de envío:", e));
    req.write(data);
    req.end();
}

// --- AQUÍ EMPIEZA TU LÓGICA ---

// Ejemplo 1: Enviar una alerta de inicio
enviarADiscord("⚠️ **Nueva sesión detectada**\nEl script ha capturado nuevos datos.");

// Ejemplo 2: Supongamos que tu script captura una IP o un nombre
let datoCapturado = "Usuario_Admin_XYZ"; 
enviarADiscord(`👤 **Dato capturado:** ${datoCapturado}`);

// Mantener vivo el proceso en Railway
setInterval(() => {}, 60000);
