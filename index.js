const https = require('https');

// Variables de Railway
const base = process.env.DISCORD_URL;
const token = process.env.WEBHOOK_TOKEN;

/**
 * Esta es la función que usará tu script para mandar la info
 * @param {string} datos - La información que capture tu script
 */
function enviarReporte(datos) {
    // Construcción limpia de la URL
    const fullUrl = `${base.trim().replace(/\/$/, '')}/${token.trim().replace(/^\//, '')}`;
    const url = new URL(fullUrl);

    const body = JSON.stringify({
        username: "Shxdow Security Bot",
        content: `📦 **Nuevo dato recibido del script:**\n\`\`\`text\n${datos}\n\`\`\``
    });

    const options = {
        hostname: url.hostname,
        path: url.pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body)
        }
    };

    const req = https.request(options);
    req.on('error', (e) => console.error("❌ Error enviando datos:", e.message));
    req.write(body);
    req.end();
}

// --- EJEMPLO DE CÓMO TU SCRIPT DARÁ LA INFORMACIÓN ---

// Supongamos que aquí va tu lógica de captura...
console.log("Esperando información del script...");

// Cuando el script obtiene algo, lo mandas así:
let infoCapturada = "IP: 192.168.1.1 | Pais: Mexico | Navegador: Chrome"; // Esto lo generaría tu script
enviarReporte(infoCapturada);

// Mantener vivo el proceso en Railway
setInterval(() => {}, 60000);
