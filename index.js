const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Estos nombres deben ser IGUALES a los que pongas en Railway
const MI_TOKEN = process.env.WEBHOOK_TOKEN; 
const DISCORD_URL = process.env.DISCORD_URL; 

app.post('/webhook', async (req, res) => {
    const auth = req.headers['authorization'];

    // Si el token no es igual al que pusimos en Railway, bloqueamos
    if (auth !== `Bearer ${MI_TOKEN}`) {
        return res.status(403).send("Acceso denegado");
    }

    try {
        // Aquí enviamos a Discord lo que recibimos
        await axios.post(DISCORD_URL, {
            content: req.body.mensaje || "Mensaje recibido",
            username: "Protector de Webhook"
        });
        res.status(200).send("Enviado a Discord");
    } catch (err) {
        res.status(500).send("Error al enviar a Discord");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor listo"));