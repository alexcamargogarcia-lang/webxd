const axios = require('axios');

// Extraer variables de Railway
const discordUrl = process.env.DISCORD_URL;
const webhookToken = process.env.WEBHOOK_TOKEN;

// Función para construir la URL correctamente
// Si la URL no tiene /, se la ponemos.
const finalWebhookUrl = discordUrl.endsWith('/') 
    ? `${discordUrl}${webhookToken}` 
    : `${discordUrl}/${webhookToken}`;

async function startBot() {
    console.log("🔗 URL Generada:", finalWebhookUrl.substring(0, 45) + "..."); // Log de seguridad
    console.log("🚀 Enviando mensaje a Discord...");

    try {
        const response = await axios.post(finalWebhookUrl, {
            content: "✅ **Shxdow Security Conectado**\nEl script está corriendo en Railway sin errores de URL.",
            username: "Shxdow System"
        });

        if (response.status === 204 || response.status === 200) {
            console.log("✅ ¡MENSAJE ENVIADO CON ÉXITO!");
        }
    } catch (error) {
        console.error("❌ Error en el envío:");
        if (error.response) {
            // Aquí verás el error real de Discord
            console.log("Código de error:", error.response.status);
            console.log("Detalle:", JSON.stringify(error.response.data));
        } else {
            console.log("Error de conexión:", error.message);
        }
    }
}

// Ejecutar al arrancar
startBot();

// Mantener el proceso vivo para evitar que Railway lo detenga (SIGTERM)
setInterval(() => {
    console.log("Keep-alive: Script Shxdow activo...");
}, 60000);
