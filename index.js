const axios = require('axios');

const discordUrl = process.env.DISCORD_URL;
const webhookToken = process.env.WEBHOOK_TOKEN;

// Unimos la URL correctamente
const finalWebhookUrl = discordUrl.endsWith('/') 
    ? `${discordUrl}${webhookToken}` 
    : `${discordUrl}/${webhookToken}`;

async function startBot() {
    console.log("🚀 Enviando mensaje limpio a Discord...");

    try {
        // ENVIAMOS SOLO EL CONTENIDO. 
        // No agregues campos como "webhook_service" porque causan el Error 400.
        await axios.post(finalWebhookUrl, {
            content: "✅ **Shxdow Security Online**\nConexión exitosa desde Railway sin errores de parámetros."
        });

        console.log("✅ ¡MENSAJE ENVIADO CON ÉXITO!");
    } catch (error) {
        console.error("❌ Error en el envío:");
        if (error.response) {
            console.log("Código:", error.response.status);
            console.log("Detalle:", JSON.stringify(error.response.data));
        } else {
            console.log("Error:", error.message);
        }
    }
}

startBot();

// Mantener vivo el proceso
setInterval(() => {
    console.log("Script Shxdow activo...");
}, 60000);
