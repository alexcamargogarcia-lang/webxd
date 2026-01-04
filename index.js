const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const MI_TOKEN = process.env.WEBHOOK_TOKEN || "Shxdow_security_v1"; 
const DISCORD_URL = process.env.DISCORD_URL; 

// 1. Cambiamos a /create-url para que coincida con tu Lua
app.post('/create-url', async (req, res) => {
    // 2. Buscamos el token dentro del cuerpo (body) porque así lo manda tu Lua
    const tokenRecibido = req.body.token;

    if (tokenRecibido !== MI_TOKEN) {
        console.log("Intento de acceso fallido: Token incorrecto");
        return res.status(403).send("Acceso denegado");
    }

    try {
        // 3. Formateamos lo que se envía a Discord
        await axios.post(DISCORD_URL, {
            content: `**Nuevo Log recibido**\n**Categoría:** ${req.body.category}\n**User Binary:** ${req.body.username_binary}`,
            username: "Protector de Webhook"
        });
        res.status(200).send("Enviado a Discord");
    } catch (err) {
        console.error("Error en Discord:", err.message);
        res.status(500).send("Error al enviar a Discord");
    }
});

// Ruta extra para que no veas error en el navegador
app.get('/', (req, res) => {
    res.send('Servidor Backend Activo ✅');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor listo en puerto ${PORT}`));
