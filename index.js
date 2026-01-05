const axios = require('axios');

// Extraemos las variables que configuraste en Railway
const discordUrl = process.env.DISCORD_URL;
const webhookToken = process.env.WEBHOOK_TOKEN;

// Unimos ambos para formar la URL completa de la Webhook
const fullWebhookUrl = `${discordUrl}${webhookToken}`;

async function sendTestMessage() {
    try {
        const response = await axios.post(fullWebhookUrl, {
            content: "✅ **Shxdow Security Online**\nEl script se ha desplegado correctamente en Railway.",
            username: "Shxdow System",
            avatar_url: "https://i.imgur.com/4M34hi2.png" // Puedes cambiar esto
        });

        if (response.status === 204) {
            console.log("¡Mensaje enviado a Discord con éxito!");
        }
    } catch (error) {
        console.error("Error al enviar el mensaje:", error.response ? error.response.data : error.message);
    }
}

// Ejecutar la función
sendTestMessage();

// Mantener el proceso vivo (opcional, para que Railway no lo mate rápido)
setInterval(() => {
    console.log("Script activo...");
}, 60000);
