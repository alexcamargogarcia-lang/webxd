const axios = require('axios');

const discordUrl = process.env.DISCORD_URL;
const webhookToken = process.env.WEBHOOK_TOKEN;

// Validación de seguridad
if (!discordUrl || !webhookToken) {
    console.error("❌ ERROR: Faltan variables de entorno.");
    console.log("DISCORD_URL:", discordUrl ? "Configurada ✅" : "VACÍA ❌");
    console.log("WEBHOOK_TOKEN:", webhookToken ? "Configurada ✅" : "VACÍA ❌");
    process.exit(1);
}

// Limpiamos las variables por si tienen espacios o barras de más
const cleanUrl = discordUrl.trim().replace(/\/$/, "");
const cleanToken = webhookToken.trim().replace(/^\//, "");

const fullWebhookUrl = `${cleanUrl}/${cleanToken}`;

async function sendToDiscord() {
    console.log("🚀 Enviando datos a Discord...");
    try {
        await axios.post(fullWebhookUrl, {
            content: "¡Conexión establecida! El script de Railway está funcionando. 🚀",
            username: "Shxdow System"
        });
        console.log("✅ ¡Mensaje enviado con éxito!");
    } catch (error) {
        console.error("❌ Error al enviar:");
        if (error.response) {
            console.log("Código:", error.response.status);
            console.log("Motivo:", error.response.data.message);
        } else {
            console.log(error.message);
        }
    }
}

sendToDiscord();

// Esto evita que Railway cierre el proceso inmediatamente
setInterval(() => {
    console.log("Script activo y esperando...");
}, 300000); // Log cada 5 minutos
