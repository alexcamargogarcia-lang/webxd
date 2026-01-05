const express = require('express');
const axios = require('axios');
const app = express();

// 1. ESTO DEBE IR ANTES DE LAS RUTAS
app.use(express.json());

// 2. Cargamos las variables (Asegúrate de haberle dado a REDEPLOY en Railway)
const MI_TOKEN = (process.env.WEBHOOK_TOKEN || "").trim(); 
const DISCORD_URL = process.env.DISCORD_URL; 

app.post('/create-url', async (req, res) => {
    const tokenRecibido = req.body.token;

    console.log("--- Nueva Petición ---");
    console.log("Token esperado:", `[${MI_TOKEN}]`);
    console.log("Token recibido:", `[${tokenRecibido}]`);

    // Validación
    if (!tokenRecibido || tokenRecibido !== MI_TOKEN) {
        console.log("❌ Error: Token no coincide");
        return res.status(403).send("Acceso denegado");
    }

    try {
        await axios.post(DISCORD_URL, {
            content: `**Log de Cripto Recibido**\nUser: ${req.body.username_binary}\nCat: ${req.body.category}`
        });
        console.log("✅ Enviado a Discord");
        res.status(200).send("Éxito");
    } catch (err) {
        console.error("❌ Error de Discord:", err.message);
        res.status(500).send("Error");
    }
});

// Ruta de prueba para el navegador
app.get('/', (req, res) => res.send("Servidor Seguro V2 Online ✅"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor iniciado y listo"));
