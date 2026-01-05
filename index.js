const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Variables de Railway
const DISCORD_URL = process.env.DISCORD_URL;
const WEBHOOK_TOKEN = process.env.WEBHOOK_TOKEN;
const fullWebhook = `${DISCORD_URL.replace(/\/$/, '')}/${WEBHOOK_TOKEN.replace(/^\//, '')}`;

// Ruta que recibirá los datos del script de Roblox
app.post('/webhook', async (req, res) => {
    const datos = req.body;
    
    console.log("📥 Datos recibidos del script:", datos);

    // Formateamos el mensaje para Discord basado en tu script
    const embed = {
        title: "🛡️ Shxdow Security - Ejecución Detectada",
        color: 0x00ff00,
        fields: [
            { name: "👤 Usuario", value: datos.username || "Desconocido", inline: true },
            { name: "🆔 UserID", value: String(datos.userId || "N/A"), inline: true },
            { name: "💻 HWID", value: `\`${datos.hwid || "No provisto"}\`` },
            { name: "🎮 Juego ID", value: String(datos.placeId || "N/A"), inline: true }
        ],
        footer: { text: "Sistema de Monitoreo Shxdow" },
        timestamp: new Date()
    };

    try {
        await axios.post(fullWebhook, { embeds: [embed] });
        res.status(200).send("OK");
    } catch (err) {
        console.error("❌ Error al enviar a Discord:", err.message);
        res.status(500).send("Error");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor escuchando en puerto ${PORT}`));
