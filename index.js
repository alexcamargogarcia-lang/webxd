const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const MI_TOKEN = process.env.WEBHOOK_TOKEN; 
const DISCORD_URL = process.env.DISCORD_URL; 

app.post('/create-url', async (req, res) => {
    const tokenRecibido = req.body.token;

    // Log para ver qué llega exactamente
    console.log(`Token esperado: [${MI_TOKEN}] | Recibido: [${tokenRecibido}]`);

    if (!tokenRecibido || tokenRecibido !== MI_TOKEN) {
        return res.status(403).send("Token incorrecto");
    }

    try {
        // Enviar solo texto plano para asegurar que pase
        await axios.post(DISCORD_URL, {
            content: `🔔 **Nuevo Log**\nUsuario: ${req.body.username_binary || "Sin nombre"}\nCategoría: ${req.body.category || "Miranda"}`
        });
        
        console.log("✅ Enviado a Discord con éxito");
        res.status(200).send("OK");
    } catch (err) {
        // Esto nos dirá el error REAL en los logs de Railway
        console.error("❌ Error de Discord:", err.response ? err.response.data : err.message);
        res.status(500).send("Error en Discord");
    }
});

app.get('/', (req, res) => res.send("Servidor V2 funcionando"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Sistema listo"));
