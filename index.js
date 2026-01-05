const axios = require('axios');

// 1. Obtenemos las variables de Railway
const baseUrl = process.env.DISCORD_URL;
const token = process.env.WEBHOOK_TOKEN;

// 2. Construimos la URL correctamente (poniendo la barra en medio)
const finalWebhookUrl = `${baseUrl.trim().replace(/\/$/, '')}/${token.trim().replace(/^\//, '')}`;

async function enviarMensaje() {
    console.log("🚀 Enviando mensaje limpio a Discord...");
    
    try {
        // IMPORTANTE: Enviamos ÚNICAMENTE el campo 'content'.
        // Esto evita el error de "webhook_service" que ves en tus logs.
        await axios.post(finalWebhookUrl, {
            content: "✅ **Shxdow Security Online**\nConexión establecida exitosamente desde Railway."
        });

        console.log("✅ ¡MENSAJE ENVIADO CON ÉXITO!");
    } catch (error) {
        console.error("❌ Error en el envío:");
        if (error.response) {
            console.log("Código:", error.response.status);
            console.log("Detalle de Discord:", JSON.stringify(error.response.data));
        } else {
            console.log("Error de red:", error.message);
        }
    }
}

// Ejecutar al iniciar
enviarMensaje();

// Mantener el proceso activo para evitar errores de Railway (SIGTERM)
setInterval(() => {
    console.log("🛰️ Script Shxdow activo...");
}, 60000);
